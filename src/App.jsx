import { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://loaxiwaotfxmvyxpzdud.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXhpd2FvdGZ4bXZ5eHB6ZHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MzI2NzUsImV4cCI6MjA5ODEwODY3NX0.Eq3cjV7V1TfOkkFuCEhwZ9PBBRSBEDzhEGkkHeRqUa8";

const C = {
  bg: "#E8DDD0",
  card: "#EFE6D8",
  clay: "#CC7044",
  clayLight: "#F2DECC",
  clayMid: "#E8895A",
  walnut: "#2C1810",
  sage: "#4A6741",
  sageLight: "#E8F0E6",
  muted: "#8C7B6E",
  border: "#D9CBBA",
  white: "#EFE6D8",
};

// ── Supabase REST ──────────────────────────────────────────────────────────
const sbH = (t) => ({ "Content-Type":"application/json","apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${t||SUPABASE_ANON_KEY}`,"Prefer":"return=representation" });
const sb = {
  signUp: async (e,p) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY},body:JSON.stringify({email:e,password:p})}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  signIn: async (e,p) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY},body:JSON.stringify({email:e,password:p})}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  from: async (table,t) => ({
    select: async (f="") => (await fetch(`${SUPABASE_URL}/rest/v1/${table}?${f}&order=created_at.desc`,{headers:sbH(t)})).json(),
    insert: async (d) => (await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:sbH(t),body:JSON.stringify(d)})).json(),
    update: async (d,f) => (await fetch(`${SUPABASE_URL}/rest/v1/${table}?${f}`,{method:"PATCH",headers:sbH(t),body:JSON.stringify(d)})).json(),
    upsert: async (d) => (await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:{...sbH(t),"Prefer":"resolution=merge-duplicates,return=representation"},body:JSON.stringify(d)})).json(),
  }),
};

// ── Icons ──────────────────────────────────────────────────────────────────
function Icon({ name, size=22, active=false, color }) {
  const s = color||(active?C.clay:C.muted);
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:s, strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round" };
  switch(name) {
    case "home": return <svg {...p}><path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V11.5z" fill={active?s:"none"}/><path d="M9 21v-6h6v6" stroke={active?C.bg:s}/></svg>;
    case "calendar": return <svg {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5" fill={active?C.clayLight:"none"}/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><rect x="7" y="13" width="4" height="4" rx="0.5" fill={active?s:"none"}/></svg>;
    case "cart": return <svg {...p}><circle cx="9" cy="20" r="1.4" fill={s}/><circle cx="17" cy="20" r="1.4" fill={s}/><path d="M3 4h2l2.2 11.2a1.6 1.6 0 001.6 1.3h7.4a1.6 1.6 0 001.6-1.3L20 8H6"/></svg>;
    case "bookmark": return <svg {...p}><path d="M6 4h12a1 1 0 011 1v15l-7-4-7 4V5a1 1 0 011-1z" fill={active?s:"none"}/></svg>;
    case "users": return <svg {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3 2.7-5.4 6-5.4s6 2.4 6 5.4"/><path d="M14.5 15c2.6.3 4.5 2.3 4.5 5"/></svg>;
    case "leaf": return <svg {...p}><path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14z"/><path d="M5 19c2-4 5-7 9-9"/></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>;
    case "flame": return <svg {...p}><path d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-1.5-1-2.5-1-2.5.5 3-1.5 4-2.5 4a2.5 2.5 0 01-2.5-2.5c0-2 2-3 0-6z" fill={active?s:"none"}/></svg>;
    case "chart": return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20v-3"/></svg>;
    case "list": return <svg {...p}><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.3" fill={s}/><circle cx="4.5" cy="12" r="1.3" fill={s}/><circle cx="4.5" cy="18" r="1.3" fill={s}/></svg>;
    case "logout": return <svg {...p}><path d="M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h3"/><path d="M16 16l4-4-4-4M20 12H9"/></svg>;
    case "chevronRight": return <svg {...p}><path d="M9 5l7 7-7 7"/></svg>;
    case "refresh": return <svg {...p}><path d="M3 12a9 9 0 0115.5-6.3M21 12a9 9 0 01-15.5 6.3"/><path d="M16 3v5h-5M8 21v-5h5"/></svg>;
    case "check": return <svg {...p}><path d="M5 13l4 4 10-10"/></svg>;
    case "checkCircle": return <svg {...p}><circle cx="12" cy="12" r="9" fill={active?s:"none"}/><path d="M8 12l3 3 5-6" stroke={active?C.bg:s}/></svg>;
    case "alert": return <svg {...p}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>;
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "heart": return <svg {...p}><path d="M12 21s-8-5.5-8-11a5 5 0 0110 0 5 5 0 0110 0c0 5.5-8 11-8 11z" fill={active?s:"none"}/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

// ── Logo ───────────────────────────────────────────────────────────────────
function Logo({ size=40, ring }) {
  return (
    <div style={{ width:size, height:size, borderRadius:size*0.28, background:`linear-gradient(150deg,#E0916A,${C.clay})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:ring?`0 0 0 5px rgba(204,112,68,0.2)`:"none", flexShrink:0 }}>
      <svg width={size*0.62} height={size*0.62} viewBox="0 0 36 36" fill="none">
        {/* Full bowl body */}
        <path d="M5 16h26" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 16c0 8 3.5 13 11 13s11-5 11-13" stroke="rgba(255,255,255,0.95)" strokeWidth="2.2" strokeLinecap="round" fill="rgba(255,255,255,0.08)"/>
        {/* Bowl rim highlight */}
        <ellipse cx="18" cy="16" rx="13" ry="2.2" fill="rgba(255,255,255,0.15)"/>
        {/* Steam lines */}
        <path d="M12 11.5C11 9.5 12.5 8 12.5 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M18 10.5C17 8 18.5 6 18.5 6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M24 11.5C25 9.5 23.5 8 23.5 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ── Inline wave — lives INSIDE the orange header div, no seam possible ────
function InlineWave({ bgColor }) {
  return (
    <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
      style={{ display:"block", width:"100%", height:72, marginTop:24, flexShrink:0 }}>
      <path
        d="M0 0 C160 48 320 8 480 40 C680 80 880 4 1080 44 C1240 76 1360 32 1440 0 L1440 72 L0 72 Z"
        fill={bgColor}
      />
    </svg>
  );
}

// ── Meal helpers ───────────────────────────────────────────────────────────
// ── Static curated meal images — real hardcoded photo IDs, confirmed working ──
const MEAL_IMAGES = {
  pasta: [
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&q=80",
  ],
  chicken: [
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=800&q=80",
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=800&q=80",
  ],
  salad: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
  ],
  salmon: [
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  ],
  curry: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1604579278540-ba7c1b297250?w=800&q=80",
  ],
  taco: [
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
  ],
  burger: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  ],
  soup: [
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80",
  ],
  rice: [
    "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80",
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
  ],
  noodles: [
    "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800&q=80",
  ],
  steak: [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  ],
  pizza: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
  ],
  fish: [
    "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800&q=80",
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  ],
  lamb: [
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  ],
  pork: [
    "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  ],
  sandwich: [
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&q=80",
  ],
  eggs: [
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    "https://images.unsplash.com/photo-1607103058027-4c5c8e2b5c92?w=800&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  ],
};

function getMealCategory(n="") {
  const s = n.toLowerCase();
  if (s.includes("lasagna")||s.includes("lasagne")) return "pasta";
  if (s.includes("pasta")||s.includes("spaghetti")||s.includes("penne")||s.includes("fettuccine")||s.includes("carbonara")||s.includes("bolognese")||s.includes("macaroni")||s.includes("ravioli")||s.includes("gnocchi")) return "pasta";
  if (s.includes("salmon")) return "salmon";
  if (s.includes("chicken")||s.includes("poultry")) return "chicken";
  if (s.includes("salad")) return "salad";
  if (s.includes("soup")||s.includes("stew")||s.includes("chowder")||s.includes("broth")) return "soup";
  if (s.includes("cod")||s.includes("fish")||s.includes("halibut")||s.includes("tilapia")||s.includes("trout")||s.includes("tuna")) return "fish";
  if (s.includes("rice")||s.includes("risotto")||s.includes("paella")||s.includes("pilaf")) return "rice";
  if (s.includes("burger")) return "burger";
  if (s.includes("pizza")) return "pizza";
  if (s.includes("lamb")) return "lamb";
  if (s.includes("pork")||s.includes("bacon")||s.includes("ham")||s.includes("sausage")) return "pork";
  if (s.includes("sandwich")||s.includes("wrap")||s.includes("club")||s.includes("panini")||s.includes("sub ")) return "sandwich";
  if (s.includes("egg")||s.includes("omelette")||s.includes("frittata")||s.includes("quiche")) return "eggs";
  if (s.includes("steak")||s.includes("beef")||s.includes("meatball")||s.includes("brisket")||s.includes("mince")) return "steak";
  if (s.includes("taco")||s.includes("burrito")||s.includes("quesadilla")||s.includes("fajita")||s.includes("enchilada")) return "taco";
  if (s.includes("curry")||s.includes("masala")||s.includes("tikka")||s.includes("korma")) return "curry";
  if (s.includes("noodle")||s.includes("ramen")||s.includes("pad thai")||s.includes("chow mein")||s.includes("lo mein")||s.includes("stir fry")||s.includes("stir-fry")) return "noodles";
  if (s.includes("casserole")||s.includes("bake")||s.includes("gratin")) return "pasta";
  if (s.includes("vegetable")||s.includes("veggie")||s.includes("tofu")||s.includes("vegan")||s.includes("vegetarian")) return "salad";
  return "default";
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = (hash << 5) - hash + str.charCodeAt(i); hash |= 0; }
  return Math.abs(hash);
}

function MealIcon({ name="", size=18, color="#fff" }) {
  const n = name.toLowerCase();
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round" };
  if (n.includes("salad")) return <svg {...p}><path d="M3 12a9 9 0 0018 0"/><path d="M3 12h18M12 12V6"/></svg>;
  if (n.includes("soup")||n.includes("stew")) return <svg {...p}><path d="M4 11h16l-1 6a2 2 0 01-2 2H7a2 2 0 01-2-2l-1-6z"/><path d="M9 11V8M15 11V8"/></svg>;
  if (n.includes("fish")||n.includes("salmon")) return <svg {...p}><path d="M3 12c3-4 9-6 13-3M16 9c3 0 5 1.5 5 3s-2 3-5 3c-4 3-10 1-13-3"/><circle cx="6.5" cy="11" r="0.7" fill={color}/></svg>;
  if (n.includes("pizza")) return <svg {...p}><path d="M12 3l9 16H3L12 3z"/><circle cx="11" cy="11" r="0.7" fill={color}/><circle cx="13.5" cy="14" r="0.7" fill={color}/></svg>;
  if (n.includes("taco")||n.includes("burrito")) return <svg {...p}><path d="M3 16c2-7 16-7 18 0"/><path d="M5 16h14"/></svg>;
  if (n.includes("burger")) return <svg {...p}><path d="M4 10h16M4 14h16M6 6h12a2 2 0 012 2H4a2 2 0 012-2zM5 18h14a2 2 0 002 2H3a2 2 0 002-2z"/></svg>;
  return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8" strokeWidth="1.4" opacity="0.6"/></svg>;
}

const NUTRITION = (n="") => {
  const s = n.toLowerCase();
  if (s.includes("salad")) return { cal:320, protein:18, carbs:22, fat:14 };
  if (s.includes("pasta")) return { cal:560, protein:22, carbs:72, fat:16 };
  if (s.includes("chicken")) return { cal:420, protein:42, carbs:28, fat:14 };
  if (s.includes("steak")||s.includes("beef")) return { cal:620, protein:48, carbs:12, fat:32 };
  if (s.includes("fish")||s.includes("salmon")) return { cal:380, protein:38, carbs:18, fat:16 };
  if (s.includes("curry")) return { cal:520, protein:28, carbs:48, fat:22 };
  if (s.includes("soup")||s.includes("stew")) return { cal:360, protein:24, carbs:32, fat:14 };
  if (s.includes("burger")) return { cal:680, protein:38, carbs:52, fat:34 };
  if (s.includes("pizza")) return { cal:580, protein:26, carbs:64, fat:24 };
  if (s.includes("taco")||s.includes("burrito")) return { cal:540, protein:30, carbs:56, fat:20 };
  if (s.includes("rice")||s.includes("risotto")) return { cal:480, protein:18, carbs:68, fat:14 };
  return { cal:480, protein:28, carbs:45, fat:18 };
};

function useMealImage(name) {
  if (!name) return { url: MEAL_IMAGES.default[0], failed: false };
  const category = getMealCategory(name);
  const variants = MEAL_IMAGES[category] || MEAL_IMAGES.default;
  const index = hashString(name) % variants.length;
  return { url: variants[index], failed: false };
}

// ── Fade transition wrapper ────────────────────────────────────────────────
function Fade({ id, children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(false); const t = setTimeout(()=>setVisible(true),30); return ()=>clearTimeout(t); },[id]);
  return (
    <div style={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(12px)", transition:"opacity 0.35s ease, transform 0.35s ease" }}>
      {children}
    </div>
  );
}

// ── Splash ─────────────────────────────────────────────────────────────────
function Splash() {
  return (
    <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#5C2E1A 45%,${C.clay} 100%)`, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"system-ui,sans-serif" }}>
      <div style={{ animation:"splashPulse 1.6s ease-in-out infinite" }}>
        <Logo size={88} ring />
      </div>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:900, margin:"22px 0 6px", letterSpacing:"-0.5px" }}>Nourishly</h1>
      <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, margin:0 }}>Family meals, made easy</p>
      <style>{`@keyframes splashPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.07);opacity:0.88}}`}</style>
    </div>
  );
}

// ── Welcome slides (orange bg + wave into beige) ───────────────────────────
function WelcomeSlides({ onDone }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    { icon:"clock", title:"Tired of not knowing what to cook?", body:"The same five meals on repeat. The 6pm panic. The takeaway you didn't really want. Sound familiar?" },
    { icon:"heart", title:"More time with your kids. Less time wondering what's for dinner.", body:"A full week of home-cooked dinners, planned for your family in under a minute — so you can focus on what actually matters." },
  ];
  const s = slides[slide];
  const headerColor = C.clay;
  const bodyColor = C.bg;

  return (
    <div style={{ background:bodyColor, minHeight:"100vh", fontFamily:"system-ui,sans-serif", display:"flex", flexDirection:"column" }}>
      {/* Orange header */}
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#7A3018 40%,${C.clay} 100%)`, padding:"48px 28px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0, marginBottom:0 }}>
        <Logo size={52} ring />
        <Fade id={slide}>
          <div style={{ marginTop:28, marginBottom:0 }}>
            <div style={{ width:66, height:66, borderRadius:20, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
              <Icon name={s.icon} size={30} color="#fff" />
            </div>
            <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, margin:"0 0 12px", lineHeight:1.3, letterSpacing:"-0.4px", maxWidth:280 }}>{s.title}</h2>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14, margin:"0 0 0", lineHeight:1.65, maxWidth:260 }}>{s.body}</p>
          </div>
        </Fade>
        <InlineWave bgColor={bodyColor} />
      </div>

      {/* Beige body */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 28px 36px" }}>
        <div style={{ display:"flex", gap:7, justifyContent:"center", marginBottom:22 }}>
          {slides.map((_,i)=><div key={i} style={{ width:i===slide?24:7, height:7, borderRadius:4, background:i===slide?C.clay:C.border, transition:"all 0.25s" }}/>)}
        </div>
        <button onClick={()=>slide<slides.length-1?setSlide(s=>s+1):onDone()} style={{ width:"100%", padding:"16px 0", background:C.clay, color:"#fff", border:"none", borderRadius:14, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 6px 24px rgba(204,112,68,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {slide<slides.length-1?"Continue":"Let's begin"}
          <Icon name="chevronRight" size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
}

// ── Onboarding questions (orange header + wave + fade transitions) ──────────
function Onboarding({ onComplete }) {
  const questions = [
    { key:"familySize", icon:"users", title:"How many people are eating?", sub:"Including yourself and any children", placeholder:"e.g. 4", type:"number" },
    { key:"allergies", icon:"leaf", title:"Any allergies or dietary needs?", sub:"We'll work around them completely", placeholder:"e.g. no nuts — or leave blank", type:"text" },
    { key:"cookTime", icon:"clock", title:"How long to cook on a weeknight?", sub:"We'll match every recipe to this", placeholder:"e.g. 30 minutes", type:"text" },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ familySize:"", allergies:"", cookTime:"" });
  const q = questions[step];

  const next = () => { if (step<questions.length-1) setStep(s=>s+1); else onComplete(answers); };
  const back = () => setStep(s=>Math.max(0,s-1));

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,sans-serif", display:"flex", flexDirection:"column" }}>
      {/* Orange header */}
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#7A3018 40%,${C.clay} 100%)`, padding:"36px 28px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0, marginBottom:0, backgroundColor:C.clay }}>
        {/* Progress dots */}
        <div style={{ display:"flex", gap:6, marginBottom:28 }}>
          {questions.map((_,i)=><div key={i} style={{ width:i===step?22:7, height:7, borderRadius:4, background:i<=step?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.25)", transition:"all 0.25s" }}/>)}
        </div>
        <Fade id={step}>
          <div style={{ width:70, height:70, borderRadius:22, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
            <Icon name={q.icon} size={32} color="#fff" />
          </div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 8px", lineHeight:1.3, letterSpacing:"-0.4px", maxWidth:280 }}>{q.title}</h2>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:13, margin:"0 0 0", lineHeight:1.5 }}>{q.sub}</p>
        </Fade>
        <InlineWave bgColor={C.bg} />
      </div>

      {/* Beige body — input + buttons */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"24px 28px 36px" }}>
        <Fade id={step}>
          <input
            key={step}
            type={q.type} placeholder={q.placeholder} value={answers[q.key]}
            onChange={e=>setAnswers(a=>({...a,[q.key]:e.target.value}))}
            style={{ width:"100%", boxSizing:"border-box", padding:"16px 18px", borderRadius:14, border:`2px solid ${C.border}`, fontSize:16, color:C.walnut, background:"rgba(255,255,255,0.5)", outline:"none", fontFamily:"inherit", textAlign:"center", backdropFilter:"blur(4px)" }}
            onFocus={e=>{e.target.style.borderColor=C.clay;e.target.style.background="rgba(255,255,255,0.9)";}}
            onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background="rgba(255,255,255,0.5)";}}
            autoFocus
          />
        </Fade>

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <button onClick={next} style={{ width:"100%", padding:"16px 0", background:C.clay, color:"#fff", border:"none", borderRadius:14, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 6px 24px rgba(204,112,68,0.32)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {step===questions.length-1?"Almost there":"Continue"}
            <Icon name="chevronRight" size={18} color="#fff" />
          </button>
          {step>0&&<button onClick={back} style={{ width:"100%", padding:"12px 0", background:"none", color:C.muted, border:`1.5px solid ${C.border}`, borderRadius:14, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Back</button>}
        </div>
      </div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ icon, value, label, accent }) {
  return (
    <div style={{ flex:1, background:C.card, borderRadius:16, border:`1px solid ${C.border}`, padding:"14px 10px", textAlign:"center" }}>
      <div style={{ width:32, height:32, borderRadius:10, background:accent?C.clayLight:C.sageLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}>
        <Icon name={icon} size={16} color={accent?C.clay:C.sage} />
      </div>
      <p style={{ fontWeight:900, fontSize:18, color:C.walnut, margin:"0 0 2px" }}>{value}</p>
      <p style={{ fontSize:10, color:C.muted, margin:0, textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</p>
    </div>
  );
}

function NChip({ label, value, color }) {
  return (
    <div style={{ flex:1, background:C.bg, borderRadius:12, padding:"10px 6px", textAlign:"center", border:`1px solid ${C.border}` }}>
      <p style={{ fontSize:15, fontWeight:800, color:color||C.walnut, margin:"0 0 2px" }}>{value}</p>
      <p style={{ fontSize:10, color:C.muted, margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</p>
    </div>
  );
}

// ── Meal card ──────────────────────────────────────────────────────────────
function MealCard({ meal, onSwap, onMarkTried, triedMeals=[] }) {
  const [open, setOpen] = useState(false);
  const { url, failed } = useMealImage(meal?.name);
  const n = NUTRITION(meal?.name);
  const tried = triedMeals.includes(meal?.day);

  return (
    <div style={{ borderRadius:20, overflow:"hidden", marginBottom:14, background:C.card, border:`1px solid ${C.border}`, boxShadow:open?"0 12px 40px rgba(44,24,16,0.14)":"0 2px 8px rgba(44,24,16,0.06)", transition:"box-shadow 0.25s" }}>
      <div style={{ position:"relative", height:open?220:145, overflow:"hidden", cursor:"pointer" }} onClick={()=>setOpen(o=>!o)}>
        {url&&!failed
          ?<img src={url} alt={meal?.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          :<div style={{ width:"100%", height:"100%", background:`linear-gradient(135deg,${C.clayLight},${C.sageLight})` }}/>
        }
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(44,24,16,0.84) 0%,rgba(44,24,16,0.18) 55%,transparent 100%)" }}/>
        {/* Icon badge always visible over photo */}
        <div style={{ position:"absolute", top:12, left:12, width:34, height:34, borderRadius:11, background:"rgba(255,255,255,0.2)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <MealIcon name={meal?.name} size={17} color="#fff" />
        </div>
        <div style={{ position:"absolute", top:10, right:12, display:"flex", gap:6 }}>
          {tried&&<div style={{ background:C.sage, borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="check" size={14} color="#fff"/></div>}
          <button onClick={e=>{e.stopPropagation();onSwap&&onSwap(meal);}} style={{ background:"rgba(255,255,255,0.2)", backdropFilter:"blur(6px)", border:"none", borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <Icon name="refresh" size={15} color="#fff"/>
          </button>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 16px" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.14)", borderRadius:6, padding:"2px 8px", marginBottom:5 }}>
            <span style={{ color:"#fff", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em" }}>{meal?.day}</span>
          </div>
          <p style={{ color:"#fff", fontWeight:800, fontSize:17, margin:"0 0 4px", lineHeight:1.2 }}>{meal?.name}</p>
          <div style={{ display:"flex", gap:12 }}>
            {meal?.prepTime&&<span style={{ display:"flex", alignItems:"center", gap:4, color:"rgba(255,255,255,0.85)", fontSize:12 }}><Icon name="clock" size={12} color="rgba(255,255,255,0.85)"/>{meal.prepTime}</span>}
            <span style={{ display:"flex", alignItems:"center", gap:4, color:"rgba(255,255,255,0.85)", fontSize:12 }}><Icon name="flame" size={12} color="rgba(255,255,255,0.85)"/>{n.cal} cal</span>
          </div>
        </div>
      </div>
      {open&&(
        <div style={{ padding:"18px 18px 20px" }}>
          {meal?.description&&<p style={{ fontSize:14, color:C.muted, margin:"0 0 16px", lineHeight:1.65, fontStyle:"italic" }}>"{meal.description}"</p>}
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            <NChip label="Cal" value={n.cal} color={C.clay}/>
            <NChip label="Protein" value={`${n.protein}g`} color={C.sage}/>
            <NChip label="Carbs" value={`${n.carbs}g`} color={C.clayMid}/>
            <NChip label="Fat" value={`${n.fat}g`} color={C.muted}/>
          </div>
          <p style={{ fontSize:11, fontWeight:800, color:C.clay, margin:"0 0 14px", textTransform:"uppercase", letterSpacing:"0.1em" }}>How to make it</p>
          {meal?.steps?.map((step,i)=>(
            <div key={i} style={{ display:"flex", gap:12, marginBottom:13, alignItems:"flex-start" }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background:i===0?C.clay:C.clayLight, color:i===0?"#fff":C.clay, fontSize:12, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{i+1}</div>
              <p style={{ fontSize:14, color:C.walnut, margin:0, lineHeight:1.65 }}>{step}</p>
            </div>
          ))}
          {!tried&&<button onClick={()=>onMarkTried&&onMarkTried(meal?.day)} style={{ width:"100%", padding:"11px 0", marginTop:8, background:C.sageLight, color:C.sage, border:`1.5px solid #B8CDB4`, borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Icon name="checkCircle" size={16} color={C.sage}/>Mark as cooked</button>}
        </div>
      )}
    </div>
  );
}

// ── Shopping list ──────────────────────────────────────────────────────────
function ShoppingList({ days }) {
  const cats = { "Proteins":{items:[],icon:"flame"}, "Vegetables & Herbs":{items:[],icon:"leaf"}, "Grains & Pasta":{items:[],icon:"list"}, "Dairy":{items:[],icon:"checkCircle"}, "Pantry":{items:["Olive oil","Salt & pepper","Mixed herbs","Stock cubes"],icon:"cart"} };
  const prot=["chicken","beef","salmon","fish","lamb","pork","shrimp","tuna","turkey","tofu"];
  const veg=["tomato","spinach","pepper","broccoli","carrot","onion","garlic","lettuce","mushroom","lemon","basil","parsley","ginger"];
  const gr=["pasta","rice","noodle","bread","tortilla","quinoa","couscous","lentil","bean"];
  const da=["cheese","butter","milk","cream","yogurt","parmesan","mozzarella"];
  days?.forEach(m=>{
    const n=m.name.toLowerCase();
    prot.forEach(p=>{if(n.includes(p)&&!cats["Proteins"].items.some(i=>i.toLowerCase().includes(p)))cats["Proteins"].items.push(p.charAt(0).toUpperCase()+p.slice(1));});
    veg.forEach(v=>{if(n.includes(v)&&!cats["Vegetables & Herbs"].items.some(i=>i.toLowerCase().includes(v)))cats["Vegetables & Herbs"].items.push(v.charAt(0).toUpperCase()+v.slice(1));});
    gr.forEach(g=>{if(n.includes(g)&&!cats["Grains & Pasta"].items.some(i=>i.toLowerCase().includes(g)))cats["Grains & Pasta"].items.push(g.charAt(0).toUpperCase()+g.slice(1));});
    da.forEach(d=>{if(n.includes(d)&&!cats["Dairy"].items.some(i=>i.toLowerCase().includes(d)))cats["Dairy"].items.push(d.charAt(0).toUpperCase()+d.slice(1));});
  });
  if(!cats["Proteins"].items.length)cats["Proteins"].items=days?.slice(0,3).map(d=>d.name.split(" ")[0])||["Protein"];
  if(!cats["Vegetables & Herbs"].items.length)cats["Vegetables & Herbs"].items=["Mixed salad leaves","Cherry tomatoes","Fresh herbs","Garlic","Onions"];
  if(!cats["Grains & Pasta"].items.length)cats["Grains & Pasta"].items=["Rice","Pasta"];
  if(!cats["Dairy"].items.length)cats["Dairy"].items=["Butter","Parmesan"];

  const [checked,setChecked]=useState({});
  const toggle=key=>setChecked(p=>({...p,[key]:!p[key]}));
  const total=Object.values(cats).flatMap(c=>c.items).length;
  const done=Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <p style={{ fontWeight:700, fontSize:14, color:C.walnut, margin:0 }}>Shopping progress</p>
          <span style={{ fontSize:13, color:C.clay, fontWeight:700 }}>{done}/{total}</span>
        </div>
        <div style={{ background:C.border, borderRadius:4, height:6, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${total>0?(done/total)*100:0}%`, background:C.clay, borderRadius:4, transition:"width 0.3s" }}/>
        </div>
      </div>
      {Object.entries(cats).filter(([,c])=>c.items.length>0).map(([cat,c])=>(
        <div key={cat} style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, padding:"14px 18px", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <Icon name={c.icon} size={15} color={C.clay}/>
            <p style={{ fontSize:13, fontWeight:800, color:C.walnut, margin:0 }}>{cat}</p>
          </div>
          {c.items.map((item,i)=>{
            const key=cat+item;
            return (
              <div key={i} onClick={()=>toggle(key)} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0", borderTop:i>0?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
                <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${checked[key]?C.clay:C.border}`, background:checked[key]?C.clay:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                  {checked[key]&&<Icon name="check" size={12} color="#fff"/>}
                </div>
                <p style={{ fontSize:14, color:checked[key]?C.muted:C.walnut, margin:0, textDecoration:checked[key]?"line-through":"none", transition:"all 0.15s" }}>{item}</p>
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ background:C.sageLight, border:`1px solid #B8CDB4`, borderRadius:12, padding:"12px 16px", display:"flex", gap:10 }}>
        <Icon name="alert" size={15} color={C.sage}/>
        <p style={{ fontSize:12, color:C.sage, margin:0, lineHeight:1.5 }}><strong>Check your cupboards first</strong><br/>Salt, pepper, olive oil, garlic — you likely already have these.</p>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Nourishly() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [authMode, setAuthMode] = useState("signup");
  const [authForm, setAuthForm] = useState({ name:"", email:"", password:"" });
  const [session, setSession] = useState(()=>{ try{ return JSON.parse(localStorage.getItem("nourishly_session")||"null"); }catch{ return null; } });
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ familySize:"", allergies:"", cookTime:"" });
  const [mealPlan, setMealPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [triedMeals, setTriedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");
  const [swappingMeal, setSwappingMeal] = useState(null);

  useEffect(()=>{
    const t=setTimeout(()=>{
      if(session?.access_token){ setScreen("app"); loadProfile(session.access_token,session.user.id); }
      else setScreen("slides");
    },1100);
    return ()=>clearTimeout(t);
  },[]);

  const saveSession=s=>{ setSession(s); try{ localStorage.setItem("nourishly_session",JSON.stringify(s)); }catch{} };

  const loadProfile=async(token,userId)=>{
    try{
      const p=await(await sb.from("profiles",token)).select(`id=eq.${userId}&limit=1`);
      if(Array.isArray(p)&&p[0]){ setProfile(p[0]); if(p[0].family_size) setForm({ familySize:p[0].family_size, allergies:p[0].allergies||"", cookTime:p[0].cook_time||"" }); }
      const pl=await(await sb.from("meal_plans",token)).select(`user_id=eq.${userId}&limit=10`);
      if(Array.isArray(pl)) setSavedPlans(pl);
    }catch{}
  };

  const handleOnboardingComplete=answers=>{ setForm(answers); setScreen("auth"); };

  const handleAuth=async()=>{
    if(!authForm.email||!authForm.password){ setError("Please fill in all fields."); return; }
    if(authMode==="signup"&&!authForm.name){ setError("Please enter your name."); return; }
    setAuthLoading(true); setError("");
    try{
      let data;
      if(authMode==="signup"){
        data=await sb.signUp(authForm.email,authForm.password);
        if(!data.__ok||data.error||data.error_description) throw new Error(data.error_description||data.error?.message||data.msg||"Sign up failed");
        if(data.access_token&&data.user?.id){
          saveSession(data);
          await(await sb.from("profiles",data.access_token)).upsert({ id:data.user.id, name:authForm.name, email:authForm.email, subscription_status:"free", generations_used_this_month:0, streak_weeks:0, family_size:form.familySize?parseInt(form.familySize):null, allergies:form.allergies, cook_time:form.cookTime });
          setProfile({ name:authForm.name, email:authForm.email, streak_weeks:0 });
          setScreen("app");
          if(form.familySize&&form.cookTime) handleGenerate(form);
        } else { setError("Account created — check your email to confirm, then sign in."); setAuthMode("login"); }
      } else {
        data=await sb.signIn(authForm.email,authForm.password);
        if(!data.__ok||data.error||data.error_description) throw new Error(data.error_description||data.error?.message||data.msg||"Invalid email or password.");
        if(!data.access_token||!data.user?.id) throw new Error("Invalid email or password.");
        saveSession(data); setScreen("app"); loadProfile(data.access_token,data.user.id);
      }
    }catch(e){ setError(e.message||"Something went wrong."); }
    finally{ setAuthLoading(false); }
  };

  const handleGenerate=async(overrideForm)=>{
    const f=overrideForm||form;
    if(!f.familySize||!f.cookTime){ setError("Please fill in family size and cook time."); return; }
    setError(""); setLoading(true);
    const token=session?.access_token; const userId=session?.user?.id;
    const userName=profile?.name||session?.user?.email?.split("@")[0]||"your family";
    if(token&&userId){ try{ await(await sb.from("profiles",token)).update({ family_size:parseInt(f.familySize), allergies:f.allergies, cook_time:f.cookTime },`id=eq.${userId}`); }catch{} }
    const prompt=`You are a friendly expert meal planning assistant. Generate a Monday to Sunday dinner plan for ${userName}'s family of ${f.familySize}. Allergies: ${f.allergies||"none"}. Cook time: ${f.cookTime}. Return ONLY valid JSON, no markdown:\n{"days":[{"day":"Monday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Tuesday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Wednesday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Thursday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Friday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Saturday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Sunday","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]}]}`;
    try{
      const res=await fetch("/api/generate-meal-plan",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:4000, messages:[{ role:"user", content:prompt }] }) });
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const data=await res.json();
      const text=(data?.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
      const match=text.match(/\{[\s\S]*\}/);
      if(!match) throw new Error("No JSON found");
      let raw=match[0]; let parsed;
      try{ parsed=JSON.parse(raw); }catch{
        const opens=(raw.match(/\[/g)||[]).length-(raw.match(/\]/g)||[]).length;
        const braces=(raw.match(/\{/g)||[]).length-(raw.match(/\}/g)||[]).length;
        raw=raw.trimEnd().replace(/,\s*$/,"");
        for(let i=0;i<opens;i++) raw+="]"; for(let i=0;i<braces;i++) raw+="}";
        parsed=JSON.parse(raw);
      }
      if(!parsed.days?.length) throw new Error("No days found");
      setMealPlan(parsed); setTriedMeals([]);
      if(token&&userId){ try{ const weekOf=new Date().toISOString().split("T")[0]; const saved=await(await sb.from("meal_plans",token)).insert({ user_id:userId, days:parsed.days, week_of:weekOf }); if(Array.isArray(saved)&&saved[0]) setSavedPlans(prev=>[saved[0],...prev.slice(0,9)]); }catch{} }
      setTab("plan");
    }catch(e){ setError(`Something went wrong: ${e.message}`); }
    finally{ setLoading(false); }
  };

  const handleSwap=async meal=>{
    setSwappingMeal(meal?.day);
    try{
      const prompt=`Suggest ONE alternative dinner meal (not ${meal?.name}) for a family of ${form.familySize||4} with ${form.allergies||"no"} allergies that takes about ${form.cookTime||"30 minutes"} to cook. Return ONLY JSON: {"day":"${meal?.day}","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]}`;
      const res=await fetch("/api/generate-meal-plan",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:600, messages:[{ role:"user", content:prompt }] }) });
      const data=await res.json();
      const text=(data?.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
      const match=text.match(/\{[\s\S]*\}/);
      if(match){ const nm=JSON.parse(match[0]); setMealPlan(prev=>({...prev,days:prev.days.map(d=>d.day===meal?.day?nm:d)})); }
    }catch{} finally{ setSwappingMeal(null); }
  };

  const handleMarkTried=async day=>{
    const nt=[...triedMeals,day]; setTriedMeals(nt);
    const token=session?.access_token; const userId=session?.user?.id;
    if(token&&userId){ const meal=mealPlan?.days?.find(d=>d.day===day); try{ await(await sb.from("meals_tried",token)).insert({ user_id:userId, day, meal_name:meal?.name, rating:5 }); }catch{} }
  };

  const handleLogout=()=>{ saveSession(null); setProfile(null); setMealPlan(null); setSavedPlans([]); setTriedMeals([]); setTab("home"); setScreen("slides"); };

  const totalN=mealPlan?.days?.reduce((a,m)=>{ const n=NUTRITION(m.name); return { cal:a.cal+n.cal, protein:a.protein+n.protein, carbs:a.carbs+n.carbs, fat:a.fat+n.fat }; },{ cal:0,protein:0,carbs:0,fat:0 });

  const inp={ width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:11, border:`1.5px solid ${C.border}`, fontSize:14, color:C.walnut, background:C.bg, outline:"none", fontFamily:"inherit" };
  const lbl={ display:"block", fontWeight:700, fontSize:11, color:C.walnut, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.07em" };
  const tabs=[{ id:"home",label:"Home",icon:"home" },{ id:"plan",label:"This week",icon:"calendar" },{ id:"shopping",label:"Shopping",icon:"cart" },{ id:"saved",label:"Saved",icon:"bookmark" }];

  if(screen==="splash") return <Splash/>;
  if(screen==="slides") return <WelcomeSlides onDone={()=>setScreen("onboarding")}/>;
  if(screen==="onboarding") return <Onboarding onComplete={handleOnboardingComplete}/>;

  if(screen==="auth"||screen==="welcome") return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#7A3018 45%,${C.clay} 100%)`, padding:"48px 24px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0, marginBottom:0, backgroundColor:C.clay }}>
        <Logo size={60} ring/>
        <h1 style={{ color:"#fff", fontSize:26, fontWeight:900, margin:"16px 0 6px", letterSpacing:"-0.5px" }}>Nourishly</h1>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, margin:"0 0 0" }}>Family meals, made easy</p>
        <InlineWave bgColor={C.bg} />
      </div>
      <div style={{ maxWidth:420, margin:"0 auto", padding:"0 20px 48px" }}>
        {form.familySize&&(
          <div style={{ background:C.clayLight, borderRadius:12, padding:"10px 14px", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
            <Icon name="checkCircle" size={16} active color={C.clay}/>
            <p style={{ fontSize:12, color:C.clay, margin:0, fontWeight:600 }}>Your preferences are saved — just create your account</p>
          </div>
        )}
        <div style={{ background:C.card, borderRadius:24, padding:"24px 20px", border:`1px solid ${C.border}`, boxShadow:"0 12px 48px rgba(44,24,16,0.12)" }}>
          <div style={{ display:"flex", background:C.bg, borderRadius:12, padding:4, marginBottom:22 }}>
            {[["signup","Create account"],["login","Sign in"]].map(([mode,label])=>(
              <button key={mode} onClick={()=>{ setAuthMode(mode); setError(""); }} style={{ flex:1, padding:"9px 0", borderRadius:9, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", background:authMode===mode?C.card:"transparent", color:authMode===mode?C.walnut:C.muted, boxShadow:authMode===mode?"0 2px 8px rgba(44,24,16,0.1)":"none", transition:"all 0.15s" }}>{label}</button>
            ))}
          </div>
          {authMode==="signup"&&<div style={{ marginBottom:14 }}><label style={lbl}>Your name</label><input type="text" placeholder="e.g. Maria" value={authForm.name} onChange={e=>setAuthForm(f=>({...f,name:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>}
          <div style={{ marginBottom:14 }}><label style={lbl}>Email</label><input type="email" placeholder="you@email.com" value={authForm.email} onChange={e=>setAuthForm(f=>({...f,email:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
          <div style={{ marginBottom:22 }}><label style={lbl}>Password</label><input type="password" placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm(f=>({...f,password:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
          {error&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:16, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{error}</p></div>}
          <button onClick={handleAuth} disabled={authLoading} style={{ width:"100%", padding:"14px 0", background:authLoading?C.muted:C.clay, color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:800, cursor:authLoading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:"0 4px 16px rgba(204,112,68,0.38)" }}>
            {authLoading?"Please wait...":authMode==="signup"?"Start planning":"Welcome back"}
          </button>
          <p style={{ textAlign:"center", color:C.muted, fontSize:12, margin:"14px 0 0" }}>Your data stays private · No credit card needed</p>
        </div>
      </div>
    </div>
  );

  // ── Main app ──
  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <div style={{ background:`linear-gradient(135deg,${C.walnut} 0%,#5C2E1A 100%)`, padding:"18px 20px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Logo size={36}/>
            <div>
              <h1 style={{ color:"#fff", margin:0, fontSize:18, fontWeight:900 }}>Nourishly</h1>
              <p style={{ color:"rgba(255,255,255,0.5)", margin:0, fontSize:11 }}>Hey {profile?.name?.split(" ")[0]||"there"}</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {profile?.streak_weeks>0&&<div style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"5px 10px", display:"flex", alignItems:"center", gap:5 }}><Icon name="flame" size={13} color="#FFB088"/><span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>{profile.streak_weeks}w</span></div>}
            <button onClick={handleLogout} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="logout" size={15} color="rgba(255,255,255,0.7)"/></button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:560, margin:"0 auto", padding:"16px 16px 90px", boxSizing:"border-box" }}>

        {/* HOME */}
        {tab==="home"&&(
          <div>
            {savedPlans.length>0&&(
              <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                <StatCard icon="bookmark" value={savedPlans.length} label="Plans" accent/>
                <StatCard icon="calendar" value={savedPlans.length*7} label="Meals"/>
                <StatCard icon="users" value={form.familySize||"–"} label="Family"/>
              </div>
            )}
            <div style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, padding:"22px 20px", marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="calendar" size={20} color={C.clay}/></div>
                <div>
                  <p style={{ fontWeight:900, fontSize:18, color:C.walnut, margin:0, letterSpacing:"-0.3px" }}>Plan this week</p>
                  <p style={{ fontSize:12, color:C.muted, margin:0 }}>A fresh week of dinners, sorted</p>
                </div>
              </div>
              {[{label:"Family size",name:"familySize",placeholder:"e.g. 4",type:"number"},{label:"Allergies or restrictions",name:"allergies",placeholder:"e.g. no nuts — or leave blank",type:"text"},{label:"Weeknight cook time",name:"cookTime",placeholder:"e.g. 30 minutes",type:"text"}].map(field=>(
                <div key={field.name} style={{ marginBottom:14 }}>
                  <label style={lbl}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={e=>setForm(f=>({...f,[field.name]:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/>
                </div>
              ))}
              {error&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{error}</p></div>}
              <button onClick={()=>handleGenerate()} disabled={loading} style={{ width:"100%", padding:"14px 0", background:loading?C.muted:C.clay, color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:loading?"none":"0 4px 16px rgba(204,112,68,0.38)", transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                {loading?<><Icon name="refresh" size={16} color="#fff"/>Building your plan...</>:<>Build my meal plan<Icon name="chevronRight" size={16} color="#fff"/></>}
              </button>
            </div>
            {savedPlans.length>0&&(
              <div>
                <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 10px" }}>Recent plans</p>
                {savedPlans.slice(0,3).map((plan,i)=>(
                  <div key={i} onClick={()=>{ setMealPlan({days:plan.days}); setTriedMeals([]); setTab("plan"); }} style={{ background:C.card, borderRadius:14, border:`1px solid ${C.border}`, padding:"14px 16px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="calendar" size={17} color={C.clay}/></div>
                      <div>
                        <p style={{ fontWeight:700, fontSize:14, color:C.walnut, margin:"0 0 2px" }}>{profile?.name||"Your"}'s plan</p>
                        <p style={{ fontSize:12, color:C.muted, margin:0 }}>{new Date(plan.created_at).toLocaleDateString("en-GB",{ day:"numeric", month:"short", year:"numeric" })}</p>
                      </div>
                    </div>
                    <Icon name="chevronRight" size={18} color={C.clay}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PLAN */}
        {tab==="plan"&&(
          mealPlan?(
            <div>
              <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <Icon name="chart" size={14} color={C.muted}/>
                  <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:0 }}>Weekly nutrition totals</p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <NChip label="Cal" value={totalN?.cal} color={C.clay}/>
                  <NChip label="Protein" value={`${totalN?.protein}g`} color={C.sage}/>
                  <NChip label="Carbs" value={`${totalN?.carbs}g`} color={C.clayMid}/>
                  <NChip label="Fat" value={`${totalN?.fat}g`} color={C.muted}/>
                </div>
              </div>
              {mealPlan.days?.map(meal=>(
                <div key={meal.day} style={{ position:"relative" }}>
                  {swappingMeal===meal.day&&<div style={{ position:"absolute", inset:0, background:"rgba(232,221,208,0.88)", borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}><p style={{ color:C.clay, fontWeight:700, fontSize:14 }}>Finding alternative...</p></div>}
                  <MealCard meal={meal} onSwap={handleSwap} onMarkTried={handleMarkTried} triedMeals={triedMeals}/>
                </div>
              ))}
              <button onClick={()=>{ setMealPlan(null); setTab("home"); }} style={{ width:"100%", padding:"13px 0", marginTop:8, background:"none", color:C.clay, border:`2px solid ${C.clay}`, borderRadius:12, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Generate a new plan</button>
            </div>
          ):(
            <div style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, padding:"48px 24px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:18, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}><Icon name="calendar" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>No meal plan yet</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 20px" }}>Head to Home and build your first week of dinners.</p>
              <button onClick={()=>setTab("home")} style={{ padding:"12px 28px", background:C.clay, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Go to Home</button>
            </div>
          )
        )}

        {/* SHOPPING */}
        {tab==="shopping"&&(
          mealPlan?<ShoppingList days={mealPlan.days}/>:(
            <div style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, padding:"48px 24px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:18, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}><Icon name="cart" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>No shopping list yet</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 20px" }}>Generate a meal plan and your list appears here.</p>
              <button onClick={()=>setTab("home")} style={{ padding:"12px 28px", background:C.clay, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Build a plan</button>
            </div>
          )
        )}

        {/* SAVED */}
        {tab==="saved"&&(
          savedPlans.length>0?(
            <div>
              <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 12px" }}>{savedPlans.length} saved {savedPlans.length===1?"plan":"plans"}</p>
              {savedPlans.map((plan,i)=>(
                <div key={i} style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
                    <div>
                      <p style={{ fontWeight:800, fontSize:15, color:C.walnut, margin:"0 0 3px" }}>{profile?.name||"Your"}'s meal plan</p>
                      <p style={{ fontSize:12, color:C.muted, margin:0 }}>{new Date(plan.created_at).toLocaleDateString("en-GB",{ day:"numeric", month:"short", year:"numeric" })}</p>
                    </div>
                    <button onClick={()=>{ setMealPlan({days:plan.days}); setTriedMeals([]); setTab("plan"); }} style={{ background:C.clayLight, color:C.clay, border:"none", borderRadius:9, padding:"7px 14px", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>View<Icon name="chevronRight" size={13} color={C.clay}/></button>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {plan.days?.slice(0,5).map((d,j)=><span key={j} style={{ background:C.bg, color:C.muted, fontSize:11, padding:"3px 9px", borderRadius:20, border:`1px solid ${C.border}` }}>{d.name}</span>)}
                    {plan.days?.length>5&&<span style={{ color:C.muted, fontSize:11, padding:"3px 0" }}>+{plan.days.length-5} more</span>}
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div style={{ background:C.card, borderRadius:20, border:`1px solid ${C.border}`, padding:"48px 24px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:18, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}><Icon name="bookmark" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>No saved plans yet</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 20px" }}>Your plans save automatically every time you generate one.</p>
              <button onClick={()=>setTab("home")} style={{ padding:"12px 28px", background:C.clay, color:"#fff", border:"none", borderRadius:11, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Create first plan</button>
            </div>
          )
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:C.card, borderTop:`1px solid ${C.border}`, display:"flex", padding:"10px 0 14px", zIndex:100, boxShadow:"0 -4px 20px rgba(44,24,16,0.08)" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:"2px 0", fontFamily:"inherit" }}>
            <Icon name={t.icon} size={21} active={tab===t.id}/>
            <span style={{ fontSize:10, fontWeight:tab===t.id?800:500, color:tab===t.id?C.clay:C.muted }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
