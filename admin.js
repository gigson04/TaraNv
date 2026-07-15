/* ============================================================
   ADMIN PANEL LOGIC (admin.html)
   Relies on shared.js being loaded first (config, data, utilities)
   ============================================================ */
let pendingImageData = null;
let pendingImageFile = null;
let nextId = 1000;      // local-only fallback id space when Supabase isn't configured
let nextReviewId = 1000;
let currentAdminTab = "listings";
let editingListingId = null;

document.addEventListener('DOMContentLoaded', async () => {
  if(!USE_SUPABASE){
    document.getElementById('no-supabase-banner').style.display = 'block';
    return;
  }
  // If already signed in from a previous visit, skip the gate
  const { data: { session } } = await supabaseClient.auth.getSession();
  if(session){
    showAdminPanel();
  }
});
// Handle sign-in form submission
async function checkAdmin(){
  const email = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-pass').value;
  const errorBox = document.getElementById('admin-error');
  errorBox.style.display = 'none';

  if(!USE_SUPABASE){
    errorBox.textContent = 'Supabase isn\'t connected yet, so real sign-in isn\'t available. See schema.sql to connect a database and create an admin user.';
    errorBox.style.display = 'block';
    return;
  }
  if(!email || !password){
    errorBox.textContent = 'Please enter both email and password.';
    errorBox.style.display = 'block';
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if(error){
    errorBox.textContent = 'Sign in failed: ' + error.message;
    errorBox.style.display = 'block';
    document.getElementById('admin-pass').value = '';
    return;
  }
  showAdminPanel();
}

function showAdminPanel(){
  document.getElementById('admin-gate').style.display='none';
  document.getElementById('admin-panel').classList.add('show');
  document.getElementById('logout-link').style.display = '';
  initAdminPanel();
}

async function adminSignOut(){
  if(USE_SUPABASE){
    await supabaseClient.auth.signOut();
  }
  location.reload();
}

async function initAdminPanel(){
  if(USE_SUPABASE){
    await loadListingsFromSupabase();
  }
  populateMuniSelect();
  renderAdminTable();
  renderModTab();
  updateStats();
}

/* ============================================================
   TABS
   ============================================================ */
function setAdminTab(tab){
  currentAdminTab = tab;
  document.getElementById('tab-listings').classList.toggle('active', tab==='listings');
  document.getElementById('tab-reviews').classList.toggle('active', tab==='reviews');
  document.getElementById('admin-listings-tab').style.display = tab==='listings' ? '' : 'none';
  document.getElementById('admin-reviews-tab').style.display = tab==='reviews' ? '' : 'none';
}

/* ============================================================
   LISTINGS TABLE
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
   REVIEW MODERATION
   ============================================================ */
function renderModTab(){
  const wrap = document.getElementById('mod-list');
  let pending = [];
  listings.forEach(l=>{
    l.reviews.forEach(r=>{
      if(r.status==='pending') pending.push({listing:l, review:r});
    });
  });
  if(pending.length===0){
    wrap.innerHTML = `<div class="empty-state"><h3>All caught up</h3><p>No reviews waiting for moderation.</p></div>`;
    return;
  }
  wrap.innerHTML = pending.map(p=>`
    <div class="mod-row">
      <div>
        <strong>${p.review.firstName} ${p.review.lastName}</strong> · <span class="stars">${"★".repeat(p.review.rating)}${"☆".repeat(5-p.review.rating)}</span>
        <div style="font-size:0.78rem;color:var(--river-500);margin-top:2px;">on ${p.listing.name}, ${p.listing.municipality}</div>
        <p class="mod-review-text">${p.review.text}</p>
      </div>
      <div class="row-actions">
        <button class="icon-btn" onclick="moderateReview(${p.listing.id},${p.review.id},'approved')">Approve</button>
        <button class="icon-btn danger" onclick="moderateReview(${p.listing.id},${p.review.id},'rejected')">Reject</button>
      </div>
    </div>
  `).join('');
}
async function moderateReview(listingId, reviewId, status){
  const l = listings.find(x=>x.id===listingId);
  const idx = l.reviews.findIndex(r=>r.id===reviewId);
  if(idx===-1) return;

  if(USE_SUPABASE){
    try{
      if(status==='rejected'){
        const { error } = await supabaseClient.from('reviews').delete().eq('id', reviewId);
        if(error) throw error;
      } else {
        const { error } = await supabaseClient.from('reviews').update({ status }).eq('id', reviewId);
        if(error) throw error;
      }
    }catch(err){
      console.error('Failed to update review in Supabase:', err);
      alert('Could not update this review on the server. The change is reflected locally only.');
    }
  }

  if(status==='rejected'){ l.reviews.splice(idx,1); }
  else { l.reviews[idx].status = status; }
  renderModTab();
  renderAdminTable();
  updateStats();
  showToast(status==='approved' ? 'Review approved and published' : 'Review rejected');
}

/* ============================================================
   ADD / EDIT / DELETE LISTING
   ============================================================ */
function populateMuniSelect(){
  const sel = document.getElementById('f-muni');
  sel.innerHTML = MUNICIPALITIES.map(m=>`<option value="${m}">${m}</option>`).join('');
}
function previewImage(e){
  const file = e.target.files[0];
  if(!file) return;
  pendingImageFile = file;
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
function openListingForm(id){
  editingListingId = id || null;
  document.getElementById('f-image').value = '';
  pendingImageFile = null;
  if(id){
    const l = listings.find(x=>x.id===id);
    document.getElementById('form-title').textContent = 'Edit listing';
    document.getElementById('form-title-eyebrow').textContent = 'Editing';
    document.getElementById('f-name').value = l.name;
    document.getElementById('f-muni').value = l.municipality;
    document.getElementById('f-cat').value = l.category;
    document.getElementById('f-mapslink').value = l.mapsLink;
    document.getElementById('f-contact').value = l.contact;
    document.getElementById('f-blurb').value = l.blurb;
    document.getElementById('f-desc').value = l.description;
    pendingImageData = l.image || null;
    renderImagePreview(pendingImageData);
  } else {
    document.getElementById('form-title').textContent = 'Add a listing';
    document.getElementById('form-title-eyebrow').textContent = 'New listing';
    ['f-name','f-mapslink','f-contact','f-blurb','f-desc'].forEach(id=>document.getElementById(id).value='');
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
async function uploadImageToStorage(file, listingNameHint){
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${listingNameHint.replace(/[^a-z0-9]/gi,'-').toLowerCase()}.${ext}`;
  const { error: uploadErr } = await supabaseClient.storage.from('listing-photos').upload(path, file);
  if(uploadErr) throw uploadErr;
  const { data } = supabaseClient.storage.from('listing-photos').getPublicUrl(path);
  return data.publicUrl;
}

async function saveListing(){
  const name = document.getElementById('f-name').value.trim();
  const municipality = document.getElementById('f-muni').value;
  const category = document.getElementById('f-cat').value;
  const mapsLink = document.getElementById('f-mapslink').value.trim();
  const contact = document.getElementById('f-contact').value.trim();
  const blurb = document.getElementById('f-blurb').value.trim();
  const description = document.getElementById('f-desc').value.trim();

  if(!name || !blurb || !mapsLink){
    alert('Please fill in at least the name, blurb, and Google Maps link.');
    return;
  }
  if(!/^https?:\/\//i.test(mapsLink)){
    alert('That doesn\'t look like a valid link. Paste the full Google Maps URL, starting with https://');
    return;
  }
  if(!USE_SUPABASE){
    alert('Supabase isn\'t connected yet, so this listing will only be visible here in the admin panel for this session — it will NOT show up on the public site. Connect Supabase (see schema.sql) to make this real.');
  }

  let imageUrl = pendingImageData; // base64 fallback for non-Supabase / demo mode

  if(USE_SUPABASE){
    try{
      if(pendingImageFile){
        imageUrl = await uploadImageToStorage(pendingImageFile, name);
      }
      if(editingListingId){
        const { error } = await supabaseClient.from('listings').update({
          name, municipality, category, maps_link: mapsLink, contact, blurb, description, image_url: imageUrl
        }).eq('id', editingListingId);
        if(error) throw error;
      } else {
        const { data, error } = await supabaseClient.from('listings').insert({
          name, municipality, category, maps_link: mapsLink, contact, blurb, description, image_url: imageUrl
        }).select().single();
        if(error) throw error;
        editingListingId = data.id;
        nextId = Math.max(nextId, data.id + 1);
      }
    }catch(err){
      console.error('Failed to save listing to Supabase:', err);
      alert('Could not save this listing to the server. It has been kept locally for this session only.');
    }
  }

  if(editingListingId && listings.some(x=>x.id===editingListingId)){
    const l = listings.find(x=>x.id===editingListingId);
    Object.assign(l, {name, municipality, category, mapsLink, contact, blurb, description, image:imageUrl});
    showToast('Listing updated');
  } else {
    const newId = editingListingId || nextId++;
    listings.push({id:newId, name, municipality, category, mapsLink, contact, blurb, description:description||blurb, image:imageUrl, reviews:[]});
    showToast('Listing added');
  }
  closeListingForm();
  renderAdminTable();
  updateStats();
}

async function deleteListing(id){
  if(!confirm('Delete this listing? This cannot be undone.')) return;

  if(USE_SUPABASE){
    try{
      const { error } = await supabaseClient.from('listings').delete().eq('id', id);
      if(error) throw error;
    }catch(err){
      console.error('Failed to delete listing from Supabase:', err);
      alert('Could not delete this listing from the server. It has been removed locally only.');
    }
  }

  listings = listings.filter(x=>x.id!==id);
  renderAdminTable();
  updateStats();
  showToast('Listing deleted');
}

/* ============================================================
   STATS
   ============================================================ */
function updateStats(){
  document.getElementById('stat-total').textContent = listings.length;
  const totalReviews = listings.reduce((s,l)=>s+l.reviews.filter(r=>r.status==='approved').length,0);
  const pending = listings.reduce((s,l)=>s+l.reviews.filter(r=>r.status==='pending').length,0);
  document.getElementById('stat-reviews').textContent = totalReviews;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('tab-pending-badge').textContent = pending;
}
