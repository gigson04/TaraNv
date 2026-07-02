/* ============================================================
   SUPABASE CONFIG
   ------------------------------------------------------------
   1. Create a free project at https://supabase.com
   2. Run supabase/schema.sql (provided separately) in the SQL Editor
   3. Go to Project Settings > API and paste your values below
   4. Reload the page — the app will now save everything for real
   ============================================================ */
const SUPABASE_URL = 'https://prpgukhyevelrfpnxbbh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6lS20jSGKaBVjI6k78SS9w_TpF6ZpSt';

let supabaseClient = null;
let USE_SUPABASE = false;

// Robust check for the CDN injection variations
const supabaseLib = window.supabase || (window.Supabase ? window.Supabase : null);

if (SUPABASE_URL && SUPABASE_URL !== 'YOUR_SUPABASE_URL' && supabaseLib) {
  supabaseClient = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  USE_SUPABASE = true;
}
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

// Demo/fallback data — used automatically when Supabase isn't configured yet
let listings = [
  {id:1, name:"Governor's Rapids", municipality:"Bayombong", category:"nature", mapsLink:"https://www.google.com/maps?q=16.4833,121.1500", contact:"0917-100-2001",
   blurb:"River rapids just outside the capital, popular for a quick afternoon dip.",
   description:"A stretch of the Magat River known for its clear rapids and rocky banks, a short ride from the town center. Locals come here to cool off in the afternoon, especially on weekends.",
   reviews:[{id:1, firstName:"Marla", lastName:"D.", rating:5, text:"Perfect stop after visiting the capitol. Water was cold and clean.", date:"2026-05-02", status:"approved"}]},
  {id:2, name:"Magat Dam Viewdeck", municipality:"Aritao", category:"nature", mapsLink:"https://www.google.com/maps?q=16.4230,121.2350", contact:"0918-233-4410",
   blurb:"Sweeping view of the province's biggest dam and reservoir.",
   description:"One of the largest dams in the Philippines, the Magat Dam offers a wide viewdeck overlooking the reservoir and the mountains beyond. Best visited early morning when the water is calm.",
   reviews:[]},
  {id:3, name:"Kayapa Vegetable Terraces", municipality:"Kayapa", category:"nature", mapsLink:"https://www.google.com/maps?q=16.3667,120.8667", contact:"0919-556-7781",
   blurb:"Cool highland terraces often called the 'Baguio of Nueva Vizcaya.'",
   description:"Kayapa sits at a higher elevation than most of the province, giving it a cooler climate ideal for vegetable farming. The rolling terraces are especially scenic at sunrise.",
   reviews:[{id:2, firstName:"Joseph", lastName:"T.", rating:4, text:"Bring a jacket, it actually gets cold here at night.", date:"2026-04-18", status:"approved"}]},
  {id:4, name:"Bintawan Ecopark", municipality:"Villaverde", category:"nature", mapsLink:"https://www.google.com/maps?q=16.6260,121.2600", contact:"0920-771-2290",
   blurb:"River-side ecopark with camping grounds along the Villaverde Trail.",
   description:"A quiet ecopark along the historic Villaverde Trail, used by trekkers heading toward the Cordillera. Good for camping, river swimming, and short hikes.",
   reviews:[]},
  {id:5, name:"Kasibu Gold Panning Site", municipality:"Kasibu", category:"nature", mapsLink:"https://www.google.com/maps?q=16.4460,121.2000", contact:"0921-884-0033",
   blurb:"Watch small-scale gold panning along the Dinauyan River.",
   description:"Kasibu is known for small-scale mining. Visitors can watch locals pan for gold along the riverbanks and learn about the town's mining livelihood.",
   reviews:[]},
  {id:6, name:"St. Dominic Cathedral", municipality:"Bayombong", category:"heritage", mapsLink:"https://www.google.com/maps?q=16.4850,121.1470", contact:"078-321-2001",
   blurb:"19th-century Spanish-era cathedral at the heart of the capital.",
   description:"The Diocesan Shrine and Parish of St. Dominic de Guzman is one of the oldest churches in the province, built during the Spanish colonial period and still active today.",
   reviews:[{id:3, firstName:"Anna", lastName:"R.", rating:5, text:"Beautiful old church, very well kept.", date:"2026-03-11", status:"approved"}]},
  {id:7, name:"Bone Museum of Kasibu", municipality:"Kasibu", category:"heritage", mapsLink:"https://www.google.com/maps?q=16.4500,121.2100", contact:"0922-441-9987",
   blurb:"Small local museum on the Ifugao and Bugkalot heritage of the town.",
   description:"A community-run museum showcasing the indigenous heritage of Kasibu's Bugkalot and migrant Ifugao residents, with tools, weavings, and old photographs.",
   reviews:[]},
  {id:8, name:"Dupax Ancestral Houses", municipality:"Dupax del Sur", category:"heritage", mapsLink:"https://www.google.com/maps?q=16.3167,121.0500", contact:"0923-118-2244",
   blurb:"Row of centuries-old ancestral houses in the old town center.",
   description:"Dupax del Sur retains several ancestral houses from the Spanish period, giving a glimpse into the province's early settlement history.",
   reviews:[]},
  {id:9, name:"Ibulao Bridge & Roadside Grill", municipality:"Bagabag", category:"food", mapsLink:"https://www.google.com/maps?q=16.6070,121.2210", contact:"0924-336-5510",
   blurb:"Roadside grill spot known for fresh tilapia and river shrimp.",
   description:"A cluster of roadside eateries near the Ibulao Bridge, popular with travelers heading toward Ifugao. Known for grilled tilapia and fresh river shrimp caught locally.",
   reviews:[{id:4, firstName:"Kevin", lastName:"S.", rating:4, text:"Cheap and filling, good rest stop.", date:"2026-05-20", status:"approved"}]},
  {id:10, name:"Solano Public Market Food Row", municipality:"Solano", category:"food", mapsLink:"https://www.google.com/maps?q=16.5333,121.1833", contact:"0925-771-0091",
   blurb:"Home of Nueva Vizcaya's famous longganisa and pancit Cabagan-style dishes.",
   description:"The go-to spot for local delicacies, especially the province's famous garlicky longganisa. Best visited early morning when everything is freshly cooked.",
   reviews:[]},
  {id:11, name:"Aritao Citrus Farm Café", municipality:"Aritao", category:"food", mapsLink:"https://www.google.com/maps?q=16.4167,121.0500", contact:"0926-902-3345",
   blurb:"Farm-to-table café using local calamansi and dayap citrus.",
   description:"A small farm café that serves dishes and drinks made from citrus grown on-site, part of the province's citrus belt.",
   reviews:[]},
  {id:12, name:"Balete Homestay", municipality:"Kayapa", category:"accommodation", mapsLink:"https://www.google.com/maps?q=16.3700,120.8700", contact:"0927-114-7782",
   blurb:"Family-run homestay with vegetable garden views, ₱600/night.",
   description:"A modest homestay run by a farming family in Kayapa. Rooms are simple but clean, and guests are welcome to help harvest vegetables in the mornings.",
   reviews:[{id:5, firstName:"Grace", lastName:"L.", rating:5, text:"Ate treated us like family. Would come back.", date:"2026-06-01", status:"approved"}]},
  {id:13, name:"Trailhead Inn Villaverde", municipality:"Villaverde", category:"accommodation", mapsLink:"https://www.google.com/maps?q=16.6300,121.2550", contact:"0928-556-9012",
   blurb:"Budget inn popular with hikers doing the Villaverde Trail.",
   description:"A no-frills inn catering to trekkers, offering early breakfast and trail info for those heading up toward the Cordillera range.",
   reviews:[]},
  {id:14, name:"Casa Vizcaya Pasalubong Center", municipality:"Solano", category:"pasalubong", mapsLink:"https://www.google.com/maps?q=16.5300,121.1900", contact:"0929-330-1123",
   blurb:"One-stop pasalubong shop for local citrus wine and dried mangoes.",
   description:"A well-stocked pasalubong center selling local products including citrus wine, dried fruit, woven bags, and native delicacies from across the province.",
   reviews:[{id:6, firstName:"Ferdie", lastName:"A.", rating:4, text:"Good variety, the citrus wine is a nice souvenir.", date:"2026-04-29", status:"approved"}]},
  {id:15, name:"Bambang Tupig House", municipality:"Bambang", category:"pasalubong", mapsLink:"https://www.google.com/maps?q=16.4667,121.1167", contact:"0930-771-4456",
   blurb:"Home of tupig — grilled rice cake wrapped in banana leaf.",
   description:"A small family business specializing in tupig, a local sticky rice delicacy grilled in banana leaves, sold fresh daily.",
   reviews:[]}
];

async function loadListingsFromSupabase(){
  if(!USE_SUPABASE || !supabaseClient) return;
  try{
    const { data: listingRows, error: listErr } = await supabaseClient.from('listings').select('*').order('id');
    if(listErr) throw listErr;
    const { data: reviewRows, error: revErr } = await supabaseClient.from('reviews').select('*').order('id');
    if(revErr) throw revErr;

    listings = listingRows.map(row => ({
      id: row.id,
      name: row.name,
      municipality: row.municipality,
      category: row.category,
      mapsLink: row.maps_link,
      contact: row.contact,
      blurb: row.blurb,
      description: row.description,
      image: row.image_url,
      reviews: reviewRows.filter(r => r.listing_id === row.id).map(r => ({
        id: r.id,
        firstName: r.first_name,
        lastName: r.last_name,
        rating: r.rating,
        text: r.review_text,
        date: (r.created_at || '').slice(0,10),
        status: r.status
      }))
    }));
    showToast('Loaded from Supabase');
  }catch(err){
    console.error('Supabase load failed, using demo data instead:', err);
    showToast('Supabase load failed — using demo data');
  }
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

function showToast(msg){
  const t = document.getElementById('toast');
  if (t) {
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), 2600);
  }
}