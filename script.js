/* ============================================================
   DATA
   ============================================================ */
const MUNICIPALITIES = ["Alfonso Castañeda","Ambaguio","Aritao","Bagabag","Bambang","Bayombong","Diadi","Dupax del Norte","Dupax del Sur","Kasibu","Kayapa","Quezon","Santa Fe","Solano","Villaverde"];

const CAT_META = {
  nature:{label:"Nature", icon:"⛰", cls:"cat-nature"},
  heritage:{label:"Heritage", icon:"🏛", cls:"cat-heritage"},
  food:{label:"Food", icon:"🍲", cls:"cat-food"},
  accommodation:{label:"Accommodation", icon:"🏠", cls:"cat-accommodation"},
  pasalubong:{label:"Pasalubong", icon:"🛍", cls:"cat-pasalubong"}
};

let listings = [
  {id:1, name:"Governor's Rapids", municipality:"Bayombong", category:"nature", lat:16.4833, lng:121.1500, contact:"0917-100-2001",
   blurb:"River rapids just outside the capital, popular for a quick afternoon dip.",
   description:"A stretch of the Magat River known for its clear rapids and rocky banks, a short ride from the town center. Locals come here to cool off in the afternoon, especially on weekends.",
   reviews:[{name:"Marla D.", rating:5, text:"Perfect stop after visiting the capitol. Water was cold and clean.", date:"2026-05-02", status:"approved"}]},
  {id:2, name:"Magat Dam Viewdeck", municipality:"Aritao", category:"nature", lat:16.4230, lng:121.2350, contact:"0918-233-4410",
   blurb:"Sweeping view of the province's biggest dam and reservoir.",
   description:"One of the largest dams in the Philippines, the Magat Dam offers a wide viewdeck overlooking the reservoir and the mountains beyond. Best visited early morning when the water is calm.",
   reviews:[]},
  {id:3, name:"Kayapa Vegetable Terraces", municipality:"Kayapa", category:"nature", lat:16.3667, lng:120.8667, contact:"0919-556-7781",
   blurb:"Cool highland terraces often called the 'Baguio of Nueva Vizcaya.'",
   description:"Kayapa sits at a higher elevation than most of the province, giving it a cooler climate ideal for vegetable farming. The rolling terraces are especially scenic at sunrise.",
   reviews:[{name:"Joseph T.", rating:4, text:"Bring a jacket, it actually gets cold here at night.", date:"2026-04-18", status:"approved"}]},
  {id:4, name:"Bintawan Ecopark", municipality:"Villaverde", category:"nature", lat:16.6260, lng:121.2600, contact:"0920-771-2290",
   blurb:"River-side ecopark with camping grounds along the Villaverde Trail.",
   description:"A quiet ecopark along the historic Villaverde Trail, used by trekkers heading toward the Cordillera. Good for camping, river swimming, and short hikes.",
   reviews:[]},
  {id:5, name:"Kasibu Gold Panning Site", municipality:"Kasibu", category:"nature", lat:16.4460, lng:121.2000, contact:"0921-884-0033",
   blurb:"Watch small-scale gold panning along the Dinauyan River.",
   description:"Kasibu is known for small-scale mining. Visitors can watch locals pan for gold along the riverbanks and learn about the town's mining livelihood.",
   reviews:[]},
  {id:6, name:"St. Dominic Cathedral", municipality:"Bayombong", category:"heritage", lat:16.4850, lng:121.1470, contact:"078-321-2001",
   blurb:"19th-century Spanish-era cathedral at the heart of the capital.",
   description:"The Diocesan Shrine and Parish of St. Dominic de Guzman is one of the oldest churches in the province, built during the Spanish colonial period and still active today.",
   reviews:[{name:"Anna R.", rating:5, text:"Beautiful old church, very well kept.", date:"2026-03-11", status:"approved"}]},
  {id:7, name:"Bone Museum of Kasibu", municipality:"Kasibu", category:"heritage", lat:16.4500, lng:121.2100, contact:"0922-441-9987",
   blurb:"Small local museum on the Ifugao and Bugkalot heritage of the town.",
   description:"A community-run museum showcasing the indigenous heritage of Kasibu's Bugkalot and migrant Ifugao residents, with tools, weavings, and old photographs.",
   reviews:[]},
  {id:8, name:"Dupax Ancestral Houses", municipality:"Dupax del Sur", category:"heritage", lat:16.3167, lng:121.0500, contact:"0923-118-2244",
   blurb:"Row of centuries-old ancestral houses in the old town center.",
   description:"Dupax del Sur retains several ancestral houses from the Spanish period, giving a glimpse into the province's early settlement history.",
   reviews:[]},
  {id:9, name:"Ibulao Bridge & Roadside Grill", municipality:"Bagabag", category:"food", lat:16.6070, lng:121.2210, contact:"0924-336-5510",
   blurb:"Roadside grill spot known for fresh tilapia and river shrimp.",
   description:"A cluster of roadside eateries near the Ibulao Bridge, popular with travelers heading toward Ifugao. Known for grilled tilapia and fresh river shrimp caught locally.",
   reviews:[{name:"Kevin S.", rating:4, text:"Cheap and filling, good rest stop.", date:"2026-05-20", status:"approved"}]},
  {id:10, name:"Solano Public Market Food Row", municipality:"Solano", category:"food", lat:16.5333, lng:121.1833, contact:"0925-771-0091",
   blurb:"Home of Nueva Vizcaya's famous longganisa and pancit Cabagan-style dishes.",
   description:"The go-to spot for local delicacies, especially the province's famous garlicky longganisa. Best visited early morning when everything is freshly cooked.",
   reviews:[]},
  {id:11, name:"Aritao Citrus Farm Café", municipality:"Aritao", category:"food", lat:16.4167, lng:121.0500, contact:"0926-902-3345",
   blurb:"Farm-to-table café using local calamansi and dayap citrus.",
   description:"A small farm café that serves dishes and drinks made from citrus grown on-site, part of the province's citrus belt.",
   reviews:[]},
  {id:12, name:"Balete Homestay", municipality:"Kayapa", category:"accommodation", lat:16.3700, lng:120.8700, contact:"0927-114-7782",
   blurb:"Family-run homestay with vegetable garden views, ₱600/night.",
   description:"A modest homestay run by a farming family in Kayapa. Rooms are simple but clean, and guests are welcome to help harvest vegetables in the mornings.",
   reviews:[{name:"Grace L.", rating:5, text:"Ate treated us like family. Would come back.", date:"2026-06-01", status:"approved"}]},
  {id:13, name:"Trailhead Inn Villaverde", municipality:"Villaverde", category:"accommodation", lat:16.6300, lng:121.2550, contact:"0928-556-9012",
   blurb:"Budget inn popular with hikers doing the Villaverde Trail.",
   description:"A no-frills inn catering to trekkers, offering early breakfast and trail info for those heading up toward the Cordillera range.",
   reviews:[]},
  {id:14, name:"Casa Vizcaya Pasalubong Center", municipality:"Solano", category:"pasalubong", lat:16.5300, lng:121.1900, contact:"0929-330-1123",
   blurb:"One-stop pasalubong shop for local citrus wine and dried mangoes.",
   description:"A well-stocked pasalubong center selling local products including citrus wine, dried fruit, woven bags, and native delicacies from across the province.",
   reviews:[{name:"Ferdie A.", rating:4, text:"Good variety, the citrus wine is a nice souvenir.", date:"2026-04-29", status:"approved"}]},
  {id:15, name:"Bambang Tupig House", municipality:"Bambang", category:"pasalubong", lat:16.4667, lng:121.1167, contact:"0930-771-4456",
   blurb:"Home of tupig — grilled rice cake wrapped in banana leaf.",
   description:"A small family business specializing in tupig, a local sticky rice delicacy grilled in banana leaves, sold fresh daily.",
   reviews:[]}
];

let pendingImageData = null;

function previewImage(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    pendingImageData = reader.result;
    renderImagePreview(pendingImageData);
  };
  reader.readAsDataURL(file);
}
function renderImagePreview(src){
  const wrap = document.getElementById('image-preview-wrap');
  wrap.innerHTML = src ? `<img src="${src}" alt="Preview">` : '';
}

let nextId = 16;
let currentCategory = "all";
let currentMuni = "all";
let currentSearch = "";
let currentAdminTab = "listings";
let editingListingId = null;
let map, markerLayer;

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderMuniStrip();
  populateMuniSelect();
  renderListings();
  initMap();
  renderAdminTable();
  updateStats();
});

/* ============================================================
   VIEW SWITCH
   ============================================================ */
function showView(view){
  document.getElementById('explore-view').style.display = view==='explore' ? 'block' : 'none';
  document.getElementById('admin-view').style.display = view==='admin' ? 'block' : 'none';
  document.getElementById('nav-explore').classList.toggle('active', view==='explore');
  if(view==='admin'){ window.scrollTo({top:0}); }
}
function scrollToMap(){
  showView('explore');
  document.getElementById('map').scrollIntoView({behavior:'smooth'});
}

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
document.addEventListener('keydown', e=>{
  if(e.target.id==='search-input') return;
});
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

function avgRating(l){
  const approved = l.reviews.filter(r=>r.status==='approved');
  if(approved.length===0) return 0;
  return approved.reduce((s,r)=>s+r.rating,0)/approved.length;
}
function starString(avg){
  if(avg===0) return "☆☆☆☆☆";
  const full = Math.round(avg);
  return "★".repeat(full) + "☆".repeat(5-full);
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
   MAP
   ============================================================ */
function initMap(){
  map = L.map('map', {scrollWheelZoom:false}).setView([16.48, 121.10], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'&copy; OpenStreetMap contributors',
    maxZoom:18
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  refreshMapMarkers();
}
function refreshMapMarkers(){
  if(!markerLayer) return;
  markerLayer.clearLayers();
  listings.forEach(l=>{
    const meta = CAT_META[l.category];
    const marker = L.circleMarker([l.lat, l.lng], {
      radius:8, color:'#173026', weight:2, fillColor:'#C68E17', fillOpacity:0.9
    }).addTo(markerLayer);
    marker.bindPopup(`<strong>${l.name}</strong><br><span style="font-size:12px;color:#5B5648;">${meta.label} · ${l.municipality}</span><br><a href="#" onclick="closeDetailIfOpen();openDetail(${l.id});return false;" style="font-size:12px;">View details →</a>`);
  });
}
function closeDetailIfOpen(){}

/* ============================================================
   DETAIL MODAL + REVIEWS
   ============================================================ */
let activeListingId = null;
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
        <div class="meta-item"><span class="eyebrow">Coordinates</span><span class="mono">${l.lat}, ${l.lng}</span></div>
      </div>

      <div class="reviews-block">
        <h4>Traveler reviews <span class="review-count">(${approved.length})</span></h4>
        <div id="reviews-list">
          ${approved.length===0 ? '<p style="color:var(--ink-600);font-size:0.87rem;margin-top:8px;">No reviews yet — be the first to share your experience.</p>' :
            approved.map(r=>`
            <div class="review-item">
              <div class="review-top">
                <span class="review-name">${r.name}</span>
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
          <input type="text" id="review-name" placeholder="Your name">
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
let selectedStars = 0;
function setStars(n){
  selectedStars = n;
  document.querySelectorAll('#star-input span').forEach(s=>{
    s.classList.toggle('on', parseInt(s.dataset.val) <= n);
  });
}
function submitReview(id){
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if(!name || !text || selectedStars===0){
    alert('Please add your name, a star rating, and a short review.');
    return;
  }
  const l = listings.find(x=>x.id===id);
  l.reviews.push({
    name, rating:selectedStars, text,
    date:new Date().toISOString().slice(0,10),
    status:'pending'
  });
  document.getElementById('review-msg').textContent = "Thanks! Your review is submitted and will appear once approved.";
  document.getElementById('review-msg').classList.add('show');
  document.getElementById('review-name').value='';
  document.getElementById('review-text').value='';
  selectedStars=0;
  document.querySelectorAll('#star-input span').forEach(s=>s.classList.remove('on'));
  updateStats();
  renderAdminTable();
  renderModTab();
}

/* ============================================================
   ADMIN — GATE
   ============================================================ */
function checkAdmin(){
  const val = document.getElementById('admin-pass').value;
  if(val === 'letsgo'){
    document.getElementById('admin-gate').style.display='none';
    document.getElementById('admin-panel').classList.add('show');
    renderAdminTable();
    renderModTab();
    updateStats();
  } else {
    document.getElementById('admin-pass').style.borderColor = 'var(--clay-500)';
    document.getElementById('admin-pass').value='';
    document.getElementById('admin-pass').placeholder='Incorrect code — try again';
  }
}

/* ============================================================
   ADMIN — TABS
   ============================================================ */
function setAdminTab(tab){
  currentAdminTab = tab;
  document.getElementById('tab-listings').classList.toggle('active', tab==='listings');
  document.getElementById('tab-reviews').classList.toggle('active', tab==='reviews');
  document.getElementById('admin-listings-tab').style.display = tab==='listings' ? '' : 'none';
  document.getElementById('admin-reviews-tab').style.display = tab==='reviews' ? '' : 'none';
}

/* ============================================================
   ADMIN — LISTINGS TABLE
   ============================================================ */
function renderAdminTable(){
  const body = document.getElementById('admin-table-body');
  body.innerHTML = listings.map(l=>{
    const meta = CAT_META[l.category];
    const avg = avgRating(l);
    const approvedCount = l.reviews.filter(r=>r.status==='approved').length;
    return `
    <tr>
      <td class="thumb-cell">${l.image ? `<img src="${l.image}" alt="${l.name}">` : `<div class="thumb-placeholder">${meta.icon}</div>`}</td>
      <td><strong>${l.name}</strong></td>
      <td>${l.municipality}</td>
      <td><span class="tag-pill ${meta.cls}">${meta.label}</span></td>
      <td>${avg? avg.toFixed(1)+' ★' : '—'}</td>
      <td>${approvedCount}</td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" onclick="openListingForm(${l.id})">Edit</button>
          <button class="icon-btn danger" onclick="deleteListing(${l.id})">Delete</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

/* ============================================================
   ADMIN — REVIEW MODERATION
   ============================================================ */
function renderModTab(){
  const wrap = document.getElementById('mod-list');
  let pending = [];
  listings.forEach(l=>{
    l.reviews.forEach((r,idx)=>{
      if(r.status==='pending') pending.push({listing:l, review:r, idx});
    });
  });
  if(pending.length===0){
    wrap.innerHTML = `<div class="empty-state"><h3>All caught up</h3><p>No reviews waiting for moderation.</p></div>`;
    return;
  }
  wrap.innerHTML = pending.map(p=>`
    <div class="mod-row">
      <div>
        <strong>${p.review.name}</strong> · <span class="stars">${"★".repeat(p.review.rating)}${"☆".repeat(5-p.review.rating)}</span>
        <div style="font-size:0.78rem;color:var(--river-500);margin-top:2px;">on ${p.listing.name}, ${p.listing.municipality}</div>
        <p class="mod-review-text">${p.review.text}</p>
      </div>
      <div class="row-actions">
        <button class="icon-btn" onclick="moderateReview(${p.listing.id},${p.idx},'approved')">Approve</button>
        <button class="icon-btn danger" onclick="moderateReview(${p.listing.id},${p.idx},'rejected')">Reject</button>
      </div>
    </div>
  `).join('');
}
function moderateReview(listingId, idx, status){
  const l = listings.find(x=>x.id===listingId);
  if(status==='rejected'){ l.reviews.splice(idx,1); }
  else { l.reviews[idx].status = status; }
  renderModTab();
  renderAdminTable();
  renderListings();
  updateStats();
  showToast(status==='approved' ? 'Review approved and published' : 'Review rejected');
}

/* ============================================================
   ADMIN — ADD / EDIT / DELETE LISTING
   ============================================================ */
function populateMuniSelect(){
  const sel = document.getElementById('f-muni');
  sel.innerHTML = MUNICIPALITIES.map(m=>`<option value="${m}">${m}</option>`).join('');
}
function openListingForm(id){
  editingListingId = id || null;
  document.getElementById('f-image').value = '';
  if(id){
    const l = listings.find(x=>x.id===id);
    document.getElementById('form-title').textContent = 'Edit listing';
    document.getElementById('form-title-eyebrow').textContent = 'Editing';
    document.getElementById('f-name').value = l.name;
    document.getElementById('f-muni').value = l.municipality;
    document.getElementById('f-cat').value = l.category;
    document.getElementById('f-lat').value = l.lat;
    document.getElementById('f-lng').value = l.lng;
    document.getElementById('f-contact').value = l.contact;
    document.getElementById('f-blurb').value = l.blurb;
    document.getElementById('f-desc').value = l.description;
    pendingImageData = l.image || null;
    renderImagePreview(pendingImageData);
  } else {
    document.getElementById('form-title').textContent = 'Add a listing';
    document.getElementById('form-title-eyebrow').textContent = 'New listing';
    ['f-name','f-lat','f-lng','f-contact','f-blurb','f-desc'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('f-muni').value = MUNICIPALITIES[0];
    document.getElementById('f-cat').value = 'nature';
    pendingImageData = null;
    renderImagePreview(null);
  }
  document.getElementById('form-overlay').classList.add('show');
}
function closeListingForm(){
  document.getElementById('form-overlay').classList.remove('show');
}
function saveListing(){
  const name = document.getElementById('f-name').value.trim();
  const municipality = document.getElementById('f-muni').value;
  const category = document.getElementById('f-cat').value;
  const lat = parseFloat(document.getElementById('f-lat').value);
  const lng = parseFloat(document.getElementById('f-lng').value);
  const contact = document.getElementById('f-contact').value.trim();
  const blurb = document.getElementById('f-blurb').value.trim();
  const description = document.getElementById('f-desc').value.trim();

  if(!name || !blurb || isNaN(lat) || isNaN(lng)){
    alert('Please fill in at least the name, blurb, and valid coordinates.');
    return;
  }

  if(editingListingId){
    const l = listings.find(x=>x.id===editingListingId);
    Object.assign(l, {name, municipality, category, lat, lng, contact, blurb, description, image:pendingImageData});
    showToast('Listing updated');
  } else {
    listings.push({id:nextId++, name, municipality, category, lat, lng, contact, blurb, description:description||blurb, image:pendingImageData, reviews:[]});
    showToast('Listing added');
  }
  closeListingForm();
  renderAdminTable();
  renderListings();
  refreshMapMarkers();
  updateStats();
}
function deleteListing(id){
  if(!confirm('Delete this listing? This cannot be undone.')) return;
  listings = listings.filter(x=>x.id!==id);
  renderAdminTable();
  renderListings();
  refreshMapMarkers();
  updateStats();
  showToast('Listing deleted');
}

/* ============================================================
   STATS + TOAST
   ============================================================ */
function updateStats(){
  document.getElementById('stat-total').textContent = listings.length;
  const totalReviews = listings.reduce((s,l)=>s+l.reviews.filter(r=>r.status==='approved').length,0);
  const pending = listings.reduce((s,l)=>s+l.reviews.filter(r=>r.status==='pending').length,0);
  document.getElementById('stat-reviews').textContent = totalReviews;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('tab-pending-badge').textContent = pending;
}
function showToast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2600);
}