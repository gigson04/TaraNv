/* ============================================================
   PUBLIC SITE LOGIC (index.html)
   Relies on shared.js being loaded first (config, data, utilities)
   ============================================================ */
let currentCategory = "all";
let currentMuni = "all";
let currentSearch = "";
let activeListingId = null;
let selectedStars = 0;
let nextReviewId = 1000; // local-only fallback id space when Supabase isn't configured

document.addEventListener('DOMContentLoaded', async () => {
  if(USE_SUPABASE){
    await loadListingsFromSupabase();
  }
  renderMuniStrip();
  renderListings();
});

/* ============================================================
   MUNICIPALITY STRIP
   ============================================================ */
function renderMuniStrip(){
  const strip = document.getElementById('muni-strip');
  let html = `<button class="strip-pill active" data-m="all" onclick="setMuni('all',this)">All municipalities</button>`;
  MUNICIPALITIES.forEach(m=>{
    html += `<button class="strip-pill" data-m="${m}" onclick="setMuni('${m}',this)">${m}</button>`;
  });
  strip.innerHTML = html;
}
function scrollMuniStrip(direction){
  document.getElementById('muni-strip').scrollBy({left: direction * 240, behavior:'smooth'});
}
function setMuni(m, el){
  currentMuni = m;
  document.querySelectorAll('.strip-pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}
function setCategory(c, el){
  currentCategory = c;
  document.querySelectorAll('#category-chips .chip').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}
function applyFilters(){
  currentSearch = document.getElementById('search-input').value.trim().toLowerCase();
  renderListings();
}
document.addEventListener('input', e=>{
  if(e.target.id==='search-input'){ currentSearch = e.target.value.trim().toLowerCase(); renderListings(); }
});

/* ============================================================
   RENDER LISTINGS
   ============================================================ */
function filteredListings(){
  return listings.filter(l=>{
    const catOk = currentCategory==='all' || l.category===currentCategory;
    const muniOk = currentMuni==='all' || l.municipality===currentMuni;
    const searchOk = !currentSearch || (l.name.toLowerCase().includes(currentSearch) || l.blurb.toLowerCase().includes(currentSearch) || l.municipality.toLowerCase().includes(currentSearch));
    return catOk && muniOk && searchOk;
  });
}

function renderListings(){
  const grid = document.getElementById('listings-grid');
  const items = filteredListings();
  document.getElementById('result-count').textContent = `${items.length} result${items.length!==1?'s':''}`;

  if(items.length===0){
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><h3>No listings match yet</h3><p>Try a different category, municipality, or search term.</p></div>`;
    return;
  }

  grid.innerHTML = items.map((l,i)=>{
    const meta = CAT_META[l.category];
    const avg = avgRating(l);
    const approvedCount = l.reviews.filter(r=>r.status==='approved').length;
    const photoStyle = l.image ? `style="background-image:url('${l.image}')"` : '';
    return `
    <div class="card" style="animation-delay:${(i%6)*0.05}s" onclick="openDetail(${l.id})">
      <div class="card-art ${l.image ? 'has-photo' : meta.cls}" ${photoStyle}>
        ${l.image ? '' : meta.icon}
        <span class="stamp">${meta.label}</span>
      </div>
      <div class="card-body">
        <div class="card-muni">${l.municipality}</div>
        <h3>${l.name}</h3>
        <p class="card-blurb">${l.blurb}</p>
        <div class="card-foot">
          <div>
            <span class="stars">${starString(avg)}</span>
            <span class="review-count">${approvedCount} review${approvedCount!==1?'s':''}</span>
          </div>
          <span class="arrow-link">View →</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ============================================================
   DETAIL MODAL + REVIEWS
   ============================================================ */
function openDetail(id){
  activeListingId = id;
  const l = listings.find(x=>x.id===id);
  const meta = CAT_META[l.category];
  const approved = l.reviews.filter(r=>r.status==='approved');
  const avg = avgRating(l);

  const modal = document.getElementById('detail-modal');
  const photoStyle = l.image ? `style="background-image:url('${l.image}')"` : '';
  modal.innerHTML = `
    <button class="modal-close" onclick="closeDetail()">✕</button>
    <div class="modal-hero ${l.image ? 'has-photo' : meta.cls}" ${photoStyle}>${l.image ? '' : meta.icon}</div>
    <div class="modal-content">
      <div class="card-muni">${l.municipality}</div>
      <h2>${l.name}</h2>
      <p class="modal-desc">${l.description}</p>
      <div class="modal-meta">
        <div class="meta-item"><span class="eyebrow">Category</span>${meta.label}</div>
        <div class="meta-item"><span class="eyebrow">Contact</span>${l.contact}</div>
        <div class="meta-item"><span class="eyebrow">Rating</span><span class="stars">${starString(avg)}</span> ${avg?avg.toFixed(1):'—'}</div>
      </div>

      <a class="btn-maps" href="${l.mapsLink}" target="_blank" rel="noopener">📍 Open in Google Maps</a>

      <div class="reviews-block">
        <h4>Traveler reviews <span class="review-count">(${approved.length})</span></h4>
        <div id="reviews-list">
          ${approved.length===0 ? '<p style="color:var(--ink-600);font-size:0.87rem;margin-top:8px;">No reviews yet — be the first to share your experience.</p>' :
            approved.map(r=>`
            <div class="review-item">
              <div class="review-top">
                <span class="review-name">${r.firstName} ${r.lastName}</span>
                <span class="review-date">${r.date}</span> 
              </div>
              <div class="stars" style="margin-top:3px;">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
              <p class="review-text">${r.text}</p>
            </div>`).join('')}
        </div>

        <div class="review-form">
          <div class="eyebrow" style="margin-bottom:8px;">Add your review</div>
          <div class="star-input" id="star-input">
            ${[1,2,3,4,5].map(n=>`<span data-val="${n}" onclick="setStars(${n})">★</span>`).join('')}
          </div>
          <div style="display:flex;gap:10px;">
            <input type="text" id="review-firstname" placeholder="First name" style="flex:1;">
            <input type="text" id="review-lastname" placeholder="Last name" style="flex:1;">
          </div>
          <textarea id="review-text" placeholder="Share what you liked, or what future visitors should know..."></textarea>
          <button class="btn-primary" onclick="submitReview(${l.id})">Submit review</button>
          <div class="form-msg" id="review-msg">Thanks! Your review is posted.</div>
        </div>
      </div>
    </div>
  `;
  selectedStars = 0;
  document.getElementById('detail-overlay').classList.add('show');
}
function closeDetail(){
  document.getElementById('detail-overlay').classList.remove('show');
}
function setStars(n){
  selectedStars = n;
  document.querySelectorAll('#star-input span').forEach(s=>{
    s.classList.toggle('on', parseInt(s.dataset.val) <= n);
  });
}
async function submitReview(id){
  const firstName = document.getElementById('review-firstname').value.trim();
  const lastName = document.getElementById('review-lastname').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if(!firstName || !lastName || !text || selectedStars===0){
    alert('Please add your first name, last name, a star rating, and a short review.');
    return;
  }
  const l = listings.find(x=>x.id===id);
  const newReview = {
    id: nextReviewId++,
    firstName, lastName, rating:selectedStars, text,
    date:new Date().toISOString().slice(0,10),
    status:'pending'
  };

  if(USE_SUPABASE){
    try{
      const { data, error } = await supabaseClient.from('reviews').insert({
        listing_id: id,
        first_name: firstName,
        last_name: lastName,
        rating: selectedStars,
        review_text: text,
        status: 'pending'
      }).select().single();
      if(error) throw error;
      newReview.id = data.id;
      newReview.date = (data.created_at || newReview.date).slice(0,10);
    }catch(err){
      console.error('Failed to save review to Supabase:', err);
      alert('Could not save your review to the server right now. It will only show in this browser for this session.');
    }
  }

  l.reviews.push(newReview);
  document.getElementById('review-msg').textContent = USE_SUPABASE
    ? "Thanks! Your review is submitted and will appear once the admin approves it."
    : "Thanks! Saved for this session only — connect Supabase so reviews persist and sync with the admin panel.";
  document.getElementById('review-msg').classList.add('show');
  document.getElementById('review-firstname').value='';
  document.getElementById('review-lastname').value='';
  document.getElementById('review-text').value='';
  selectedStars=0;
  document.querySelectorAll('#star-input span').forEach(s=>s.classList.remove('on'));
}