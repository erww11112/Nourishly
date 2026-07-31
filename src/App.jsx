import { useState, useEffect, useRef } from "react";
import { LanguageProvider, useT, useLang, LANGUAGE_NAMES } from "./i18n";

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

// ── Design tokens: one deliberate scale for radius / shadow, used everywhere ─
// R.sm = icon badges & chips · R.md = buttons & inputs · R.lg = list/section
// cards · R.xl = hero/primary cards. Keeps every corner in the app on-scale
// instead of accidental one-off values.
const R = { sm: 12, md: 14, lg: 18, xl: 24 };
const SHADOW = {
  card: "0 4px 20px rgba(44,24,16,0.07)",
  raised: "0 14px 40px rgba(44,24,16,0.16)",
  button: "0 6px 20px rgba(204,112,68,0.35)",
};
const FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
// Subtle top-highlight sheen layered over a solid button color — same base
// color as before, just a soft gloss instead of completely flat.
const btnBg = (base=C.clay) => `linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%), ${base}`;

// ── Supabase REST ──────────────────────────────────────────────────────────
const sbH = (t) => ({ "Content-Type":"application/json","apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${t||SUPABASE_ANON_KEY}`,"Prefer":"return=representation" });
const sb = {
  signUp: async (e,p) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY},body:JSON.stringify({email:e,password:p})}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  signIn: async (e,p) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY},body:JSON.stringify({email:e,password:p})}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  refresh: async (refreshToken) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY},body:JSON.stringify({refresh_token:refreshToken})}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  updateUser: async (token,body) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/user`,{method:"PUT",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${token}`},body:JSON.stringify(body)}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  recover: async (e) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/recover`,{method:"POST",headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON_KEY},body:JSON.stringify({email:e})}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  getUser: async (token) => { const r = await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{"apikey":SUPABASE_ANON_KEY,"Authorization":`Bearer ${token}`}}); const d = await r.json(); return { ...d, __ok: r.ok, __status: r.status }; },
  from: async (table,t) => ({
    select: async (f="") => (await fetch(`${SUPABASE_URL}/rest/v1/${table}?${f}&order=created_at.desc`,{headers:sbH(t)})).json(),
    insert: async (d) => { const r=await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:sbH(t),body:JSON.stringify(d)}); const body=await r.json(); body.__ok=r.ok; body.__status=r.status; return body; },
    update: async (d,f) => { const r=await fetch(`${SUPABASE_URL}/rest/v1/${table}?${f}`,{method:"PATCH",headers:sbH(t),body:JSON.stringify(d)}); const body=await r.json(); body.__ok=r.ok; body.__status=r.status; return body; },
    upsert: async (d) => { const r=await fetch(`${SUPABASE_URL}/rest/v1/${table}`,{method:"POST",headers:{...sbH(t),"Prefer":"resolution=merge-duplicates,return=representation"},body:JSON.stringify(d)}); const body=await r.json(); body.__ok=r.ok; body.__status=r.status; return body; },
  }),
};

// Wraps any sb call: if the token is expired (JWT expired / 401), silently refreshes
// the session using the refresh_token and retries the same call once with the new token.
// This is what keeps a user logged in across long sessions without manual re-login.
async function withAutoRefresh(session, saveSessionFn, callFn) {
  const token = session?.access_token;
  let result = await callFn(token);
  const expired = result?.message === "JWT expired" || result?.code === "PGRST303" || result?.code === 401;
  if (expired && session?.refresh_token) {
    const refreshed = await sb.refresh(session.refresh_token);
    if (refreshed.__ok && refreshed.access_token) {
      const newSession = { ...session, ...refreshed };
      saveSessionFn(newSession);
      result = await callFn(refreshed.access_token);
    }
  }
  return result;
}

// ── Icons ──────────────────────────────────────────────────────────────────
function Icon({ name, size=22, active=false, color }) {
  const s = color||(active?C.clay:C.muted);
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:s, strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round" };
  switch(name) {
    case "home": return <svg {...p}><path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V11.5z" fill={active?s:"none"}/><path d="M9 21v-6h6v6" stroke={active?C.bg:s}/></svg>;
    case "calendar": return <svg {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5" fill={active?C.clayLight:"none"}/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><rect x="7" y="13" width="4" height="4" rx="0.5" fill={active?s:"none"}/></svg>;
    case "cart": return <svg {...p}><circle cx="9" cy="20" r="1.4" fill={s}/><circle cx="17" cy="20" r="1.4" fill={s}/><path d="M3 4h2l2.2 11.2a1.6 1.6 0 001.6 1.3h7.4a1.6 1.6 0 001.6-1.3L20 8H6"/></svg>;
    case "bookmark": return <svg {...p}><path d="M6 4h12a1 1 0 011 1v15l-7-4-7 4V5a1 1 0 011-1z" fill={active?s:"none"}/></svg>;
    case "users": return <svg {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3 2.7-5.4 6-5.4s6 2.4 6 5.4"/><path d="M14.5 15c2.6.3 4.5 2.3 4.5 5"/></svg>;
    case "user": return <svg {...p}><circle cx="12" cy="8" r="4" fill={active?C.clayLight:"none"}/><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>;
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
    "https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?w=800&q=80",
    "https://images.unsplash.com/photo-1602534923950-d2c7e6be0ca0?w=800&q=80",
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
    "https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8?w=800&q=80",
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
    "https://images.unsplash.com/photo-1494597706938-de2cd7341979?w=800&q=80",
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

// Meal-plan generations from 2026-08 onward carry an explicit English
// "category" tag from Claude (needed once meal names can be in any UI
// language). Prefer that tag; fall back to keyword-matching the name for
// plans saved before this field existed, or if Claude returns something
// outside the known category list.
function resolveMealCategory(meal) {
  const cat = meal?.category;
  if (cat && MEAL_IMAGES[cat]) return cat;
  return getMealCategory(meal?.name);
}

// Only the dish categories that ARE a single protein map here — dish-style
// categories (pasta, salad, curry, etc.) carry no reliable protein signal on
// their own, so the shopping list falls back to scanning the (English) name.
const CATEGORY_TO_PROTEIN = { chicken:"chicken", salmon:"salmon", fish:"fish", lamb:"lamb", pork:"pork", steak:"beef", eggs:"eggs" };

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = (hash << 5) - hash + str.charCodeAt(i); hash |= 0; }
  return Math.abs(hash);
}

function MealIcon({ meal, size=18, color="#fff" }) {
  const category = resolveMealCategory(meal);
  const p = { width:size, height:size, viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round" };
  switch (category) {
    case "salad": return <svg {...p}><path d="M3 12a9 9 0 0018 0"/><path d="M3 12h18M12 12V6"/></svg>;
    case "soup": return <svg {...p}><path d="M4 11h16l-1 6a2 2 0 01-2 2H7a2 2 0 01-2-2l-1-6z"/><path d="M9 11V8M15 11V8"/></svg>;
    case "fish": case "salmon": return <svg {...p}><path d="M3 12c3-4 9-6 13-3M16 9c3 0 5 1.5 5 3s-2 3-5 3c-4 3-10 1-13-3"/><circle cx="6.5" cy="11" r="0.7" fill={color}/></svg>;
    case "pizza": return <svg {...p}><path d="M12 3l9 16H3L12 3z"/><circle cx="11" cy="11" r="0.7" fill={color}/><circle cx="13.5" cy="14" r="0.7" fill={color}/></svg>;
    case "taco": return <svg {...p}><path d="M3 16c2-7 16-7 18 0"/><path d="M5 16h14"/></svg>;
    case "burger": return <svg {...p}><path d="M4 10h16M4 14h16M6 6h12a2 2 0 012 2H4a2 2 0 012-2zM5 18h14a2 2 0 002 2H3a2 2 0 002-2z"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8" strokeWidth="2" opacity="0.6"/></svg>;
  }
}

const NUTRITION_BY_CATEGORY = {
  salad:{ cal:320, protein:18, carbs:22, fat:14 },
  pasta:{ cal:560, protein:22, carbs:72, fat:16 },
  chicken:{ cal:420, protein:42, carbs:28, fat:14 },
  steak:{ cal:620, protein:48, carbs:12, fat:32 },
  fish:{ cal:380, protein:38, carbs:18, fat:16 },
  salmon:{ cal:380, protein:38, carbs:18, fat:16 },
  curry:{ cal:520, protein:28, carbs:48, fat:22 },
  soup:{ cal:360, protein:24, carbs:32, fat:14 },
  burger:{ cal:680, protein:38, carbs:52, fat:34 },
  pizza:{ cal:580, protein:26, carbs:64, fat:24 },
  taco:{ cal:540, protein:30, carbs:56, fat:20 },
  rice:{ cal:480, protein:18, carbs:68, fat:14 },
  default:{ cal:480, protein:28, carbs:45, fat:18 },
};
function NUTRITION(meal) {
  const category = resolveMealCategory(meal);
  return NUTRITION_BY_CATEGORY[category] || NUTRITION_BY_CATEGORY.default;
}

function useMealImage(meal) {
  const name = meal?.name;
  if (!name) return { url: MEAL_IMAGES.default[0], failed: false };
  const category = resolveMealCategory(meal);
  const variants = MEAL_IMAGES[category] || MEAL_IMAGES.default;
  const index = hashString(name) % variants.length;
  return { url: variants[index], failed: false };
}

// ── Assigns one image per meal for a whole week, guaranteeing no repeats ────
// within those 7 days. Prefers each meal's own category (starting from its
// hashed variant) but falls back to any unused image from the full pool once
// a category's variants are all taken — e.g. two chicken dishes in one week.
function assignWeekImages(days) {
  const result = {};
  if (!days?.length) return result;
  const usedUrls = new Set();
  const categoryOrder = Object.keys(MEAL_IMAGES);
  days.forEach(meal => {
    const name = meal?.name || "";
    const category = resolveMealCategory(meal);
    const variants = MEAL_IMAGES[category] || MEAL_IMAGES.default;
    const startIdx = hashString(name) % variants.length;
    let chosen = null;
    for (let i = 0; i < variants.length && !chosen; i++) {
      const candidate = variants[(startIdx + i) % variants.length];
      if (!usedUrls.has(candidate)) chosen = candidate;
    }
    if (!chosen) {
      outer: for (const cat of categoryOrder) {
        for (const url of MEAL_IMAGES[cat]) {
          if (!usedUrls.has(url)) { chosen = url; break outer; }
        }
      }
    }
    if (!chosen) chosen = variants[startIdx] || MEAL_IMAGES.default[0];
    usedUrls.add(chosen);
    result[meal?.day] = chosen;
  });
  return result;
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
  const t = useT();
  return (
    <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#5C2E1A 45%,${C.clay} 100%)`, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:FONT }}>
      <div style={{ animation:"splashPulse 1.6s ease-in-out infinite" }}>
        <Logo size={88} ring />
      </div>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:900, margin:"22px 0 6px", letterSpacing:"-0.5px" }}>{t("common.appName")}</h1>
      <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, margin:0 }}>{t("common.tagline")}</p>
      <style>{`@keyframes splashPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.07);opacity:0.88}}`}</style>
    </div>
  );
}

// ── Welcome slides (orange bg + wave into beige) ───────────────────────────
function WelcomeSlides({ onDone }) {
  const t = useT();
  const [slide, setSlide] = useState(0);
  const slides = [
    { icon:"clock", title:t("welcome.slide1Title"), body:t("welcome.slide1Body") },
    { icon:"heart", title:t("welcome.slide2Title"), body:t("welcome.slide2Body") },
  ];
  const s = slides[slide];
  const headerColor = C.clay;
  const bodyColor = C.bg;

  return (
    <div style={{ background:bodyColor, minHeight:"100vh", fontFamily:FONT, display:"flex", flexDirection:"column" }}>
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
        <button onClick={()=>slide<slides.length-1?setSlide(s=>s+1):onDone()} className="btn-press" style={{ width:"100%", padding:"16px 0", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:SHADOW.button, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {slide<slides.length-1?t("welcome.continue"):t("welcome.begin")}
          <Icon name="chevronRight" size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
}

// ── Language picker (first onboarding step, new signups only) ───────────────
// Sets the active app language immediately on tap, then hands off — every
// screen after this (including the meal-generation prompt) uses it from here.
function ChooseLanguage({ onComplete }) {
  const t = useT();
  const { lang, setLang, availableLangs } = useLang();
  const labelKeys = { en:"profile.languageEnglish", pt:"profile.languagePortuguese", es:"profile.languageSpanish", zh:"profile.languageChinese", fr:"profile.languageFrench" };
  const choose = code => { setLang(code); onComplete(); };

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT, display:"flex", flexDirection:"column" }}>
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#7A3018 40%,${C.clay} 100%)`, padding:"48px 28px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0, marginBottom:0 }}>
        <Logo size={52} ring />
        <div style={{ marginTop:28, marginBottom:0 }}>
          <h2 style={{ color:"#fff", fontSize:24, fontWeight:800, margin:"0 0 10px", lineHeight:1.3, letterSpacing:"-0.4px" }}>{t("chooseLanguage.title")}</h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:14, margin:0, lineHeight:1.5 }}>{t("chooseLanguage.subtitle")}</p>
        </div>
        <InlineWave bgColor={C.bg} />
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", gap:12, padding:"0 28px 36px" }}>
        {availableLangs.map(code=>(
          <button key={code} onClick={()=>choose(code)} className="btn-press" style={{ width:"100%", padding:"18px 0", background:lang===code?btnBg():C.card, color:lang===code?"#fff":C.walnut, border:`1.5px solid ${lang===code?"transparent":C.border}`, borderRadius:R.md, fontSize:16, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:lang===code?SHADOW.button:"none", transition:"all 0.15s" }}>
            {t(labelKeys[code])}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Onboarding questions (orange header + wave + fade transitions) ──────────
function Onboarding({ onComplete }) {
  const t = useT();
  const questions = [
    { key:"familySize", icon:"users", title:t("onboarding.familySizeTitle"), sub:t("onboarding.familySizeSub"), placeholder:t("common.fields.familySizePlaceholder"), type:"number" },
    { key:"allergies", icon:"leaf", title:t("onboarding.allergiesTitle"), sub:t("onboarding.allergiesSub"), placeholder:t("common.fields.allergiesPlaceholder"), type:"text" },
    { key:"cookTime", icon:"clock", title:t("onboarding.cookTimeTitle"), sub:t("onboarding.cookTimeSub"), placeholder:t("common.fields.cookTimePlaceholder"), type:"text" },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ familySize:"", allergies:"", cookTime:"" });
  const q = questions[step];

  const next = () => { if (step<questions.length-1) setStep(s=>s+1); else onComplete(answers); };
  const back = () => setStep(s=>Math.max(0,s-1));

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT, display:"flex", flexDirection:"column" }}>
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

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <button onClick={next} className="btn-press" style={{ width:"100%", padding:"16px 0", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:SHADOW.button, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {step===questions.length-1?t("onboarding.almostThere"):t("onboarding.continue")}
            <Icon name="chevronRight" size={18} color="#fff" />
          </button>
          {step>0&&<button onClick={back} className="btn-press" style={{ width:"100%", padding:"12px 0", background:"none", color:C.muted, border:`1.5px solid ${C.border}`, borderRadius:R.md, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{t("onboarding.back")}</button>}
        </div>
      </div>
    </div>
  );
}

function NChip({ label, value, color }) {
  return (
    <div style={{ flex:1, background:C.bg, borderRadius:R.sm, padding:"11px 8px", textAlign:"center", border:`1px solid ${C.border}` }}>
      <p style={{ fontSize:15, fontWeight:800, color:color||C.walnut, margin:"0 0 2px" }}>{value}</p>
      <p style={{ fontSize:10, color:C.muted, margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</p>
    </div>
  );
}

// ── Meal card ──────────────────────────────────────────────────────────────
function MealCard({ meal, onSwap, onMarkTried, triedMeals=[], isPaid=false, imageUrl }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const { url: fallbackUrl, failed } = useMealImage(meal);
  const url = imageUrl || fallbackUrl;
  const n = NUTRITION(meal);
  const tried = triedMeals.includes(meal?.day);

  return (
    <div style={{ borderRadius:R.xl, overflow:"hidden", marginBottom:18, background:C.card, border:`1px solid ${C.border}`, boxShadow:open?SHADOW.raised:SHADOW.card, transition:"box-shadow 0.3s ease" }}>
      <div style={{ position:"relative", height:open?220:145, overflow:"hidden", cursor:"pointer", transition:"height 0.35s cubic-bezier(0.4,0,0.2,1)" }} onClick={()=>setOpen(o=>!o)}>
        {url&&!failed
          ?<img src={url} alt={meal?.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          :<div style={{ width:"100%", height:"100%", background:`linear-gradient(135deg,${C.clayLight},${C.sageLight})` }}/>
        }
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(44,24,16,0.84) 0%,rgba(44,24,16,0.18) 55%,transparent 100%)" }}/>
        {/* Icon badge always visible over photo */}
        <div style={{ position:"absolute", top:12, left:12, width:34, height:34, borderRadius:R.sm, background:"rgba(255,255,255,0.2)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <MealIcon meal={meal} size={17} color="#fff" />
        </div>
        <div style={{ position:"absolute", top:10, right:12, display:"flex", gap:6 }}>
          {tried&&<div className="check-pop" style={{ background:C.sage, borderRadius:R.sm, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="check" size={14} color="#fff"/></div>}
          <button onClick={e=>{e.stopPropagation();onSwap&&onSwap(meal);}} className="btn-press" style={{ background:"rgba(255,255,255,0.2)", backdropFilter:"blur(6px)", border:"none", borderRadius:R.sm, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <Icon name="refresh" size={15} color="#fff"/>
          </button>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 18px" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.14)", borderRadius:6, padding:"2px 8px", marginBottom:6 }}>
            <span style={{ color:"#fff", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em" }}>{meal?.day}</span>
          </div>
          <p style={{ color:"#fff", fontWeight:800, fontSize:17, margin:"0 0 4px", lineHeight:1.2 }}>{meal?.name}</p>
          <div style={{ display:"flex", gap:12 }}>
            {meal?.prepTime&&<span style={{ display:"flex", alignItems:"center", gap:4, color:"rgba(255,255,255,0.85)", fontSize:12 }}><Icon name="clock" size={12} color="rgba(255,255,255,0.85)"/>{meal.prepTime}</span>}
            <span style={{ display:"flex", alignItems:"center", gap:4, color:"rgba(255,255,255,0.85)", fontSize:12 }}><Icon name="flame" size={12} color="rgba(255,255,255,0.85)"/>{n.cal} cal</span>
          </div>
        </div>
      </div>
      {/* Expand/collapse: grid-rows trick animates height smoothly without
          knowing the content's actual height in advance; opacity fades in sync. */}
      <div style={{ display:"grid", gridTemplateRows:open?"1fr":"0fr", transition:"grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ overflow:"hidden" }}>
          <div style={{ padding:"20px 20px 24px", opacity:open?1:0, transition:`opacity 0.3s ease ${open?"0.1s":"0s"}` }}>
            {meal?.description&&<p style={{ fontSize:14, color:C.muted, margin:"0 0 18px", lineHeight:1.65, fontStyle:"italic" }}>"{meal.description}"</p>}
            <div style={{ display:"flex", gap:8, marginBottom:22 }}>
              <NChip label={t("plan.calLabel")} value={n.cal} color={C.clay}/>
              {isPaid ? (
                <>
                  <NChip label={t("plan.proteinLabel")} value={`${n.protein}g`} color={C.sage}/>
                  <NChip label={t("plan.carbsLabel")} value={`${n.carbs}g`} color={C.clayMid}/>
                  <NChip label={t("plan.fatLabel")} value={`${n.fat}g`} color={C.muted}/>
                </>
              ) : (
                <div style={{ flex:3, background:C.clayLight, borderRadius:R.sm, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  <Icon name="checkCircle" size={13} color={C.clay}/>
                  <span style={{ fontSize:11, color:C.clay, fontWeight:700 }}>{t("plan.plusFeatureChip")}</span>
                </div>
              )}
            </div>
            <p style={{ fontSize:11, fontWeight:800, color:C.clay, margin:"0 0 16px", textTransform:"uppercase", letterSpacing:"0.1em" }}>{t("mealCard.howToMakeIt")}</p>
            {meal?.steps?.map((step,i)=>(
              <div key={i} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:i===0?C.clay:C.clayLight, color:i===0?"#fff":C.clay, fontSize:12, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{i+1}</div>
                <p style={{ fontSize:14, color:C.walnut, margin:0, lineHeight:1.65 }}>{step}</p>
              </div>
            ))}
            {!tried&&<button onClick={()=>onMarkTried&&onMarkTried(meal?.day)} className="btn-press" style={{ width:"100%", padding:"12px 0", marginTop:10, background:C.sageLight, color:C.sage, border:`1.5px solid #B8CDB4`, borderRadius:R.md, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Icon name="checkCircle" size={16} color={C.sage}/>{t("mealCard.markAsCooked")}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shopping list ──────────────────────────────────────────────────────────
function ShoppingList({ days }) {
  const t = useT();
  // Internal category keys stay in English/stable; only the displayed label
  // (c.label) is localized, so lookups like cats.proteins keep working.
  const cats = {
    proteins:{label:t("shoppingList.categories.proteins"),items:[],icon:"flame"},
    vegHerbs:{label:t("shoppingList.categories.vegHerbs"),items:[],icon:"leaf"},
    grainsPasta:{label:t("shoppingList.categories.grainsPasta"),items:[],icon:"list"},
    dairy:{label:t("shoppingList.categories.dairy"),items:[],icon:"checkCircle"},
    pantry:{label:t("shoppingList.categories.pantry"),items:t("shoppingList.pantryDefaults"),icon:"cart"},
  };
  // Detection keywords stay in English — they're matched against meal names.
  // For plans where the AI wrote the name in another UI language, this scan
  // simply won't hit anything; the category-tag hint below covers protein
  // detection in that case (veg/grain/dairy have no such tag, so those stay
  // best-effort for non-English plans).
  const prot=["chicken","beef","salmon","fish","lamb","pork","shrimp","tuna","turkey","tofu"];
  const veg=["tomato","spinach","pepper","broccoli","carrot","onion","garlic","lettuce","mushroom","lemon","basil","parsley","ginger"];
  const gr=["pasta","rice","noodle","bread","tortilla","quinoa","couscous","lentil","bean"];
  const da=["cheese","butter","milk","cream","yogurt","parmesan","mozzarella"];
  const label=keyword=>t(`shoppingList.ingredients.${keyword}`);
  days?.forEach(m=>{
    const n=m.name.toLowerCase();
    prot.forEach(p=>{if(n.includes(p)&&!cats.proteins.items.includes(label(p)))cats.proteins.items.push(label(p));});
    veg.forEach(v=>{if(n.includes(v)&&!cats.vegHerbs.items.includes(label(v)))cats.vegHerbs.items.push(label(v));});
    gr.forEach(g=>{if(n.includes(g)&&!cats.grainsPasta.items.includes(label(g)))cats.grainsPasta.items.push(label(g));});
    da.forEach(d=>{if(n.includes(d)&&!cats.dairy.items.includes(label(d)))cats.dairy.items.push(label(d));});
    const catProtein=CATEGORY_TO_PROTEIN[resolveMealCategory(m)];
    if(catProtein&&!cats.proteins.items.includes(label(catProtein)))cats.proteins.items.push(label(catProtein));
  });
  if(!cats.proteins.items.length)cats.proteins.items=days?.slice(0,3).map(d=>d.name.split(" ")[0])||[label("chicken")];
  if(!cats.vegHerbs.items.length)cats.vegHerbs.items=t("shoppingList.vegDefaults");
  if(!cats.grainsPasta.items.length)cats.grainsPasta.items=t("shoppingList.grainDefaults");
  if(!cats.dairy.items.length)cats.dairy.items=t("shoppingList.dairyDefaults");

  const [checked,setChecked]=useState({});
  const toggle=key=>setChecked(p=>({...p,[key]:!p[key]}));
  const total=Object.values(cats).flatMap(c=>c.items).length;
  const done=Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div style={{ background:C.card, borderRadius:R.lg, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"18px 20px", marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
          <p style={{ fontWeight:700, fontSize:14, color:C.walnut, margin:0 }}>{t("shoppingList.progress")}</p>
          <span style={{ fontSize:13, color:C.clay, fontWeight:700 }}>{done}/{total}</span>
        </div>
        <div style={{ background:C.border, borderRadius:4, height:6, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${total>0?(done/total)*100:0}%`, background:C.clay, borderRadius:4, transition:"width 0.3s" }}/>
        </div>
      </div>
      {Object.entries(cats).filter(([,c])=>c.items.length>0).map(([cat,c])=>(
        <div key={cat} style={{ background:C.card, borderRadius:R.lg, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"16px 20px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <Icon name={c.icon} size={15} color={C.clay}/>
            <p style={{ fontSize:13, fontWeight:800, color:C.walnut, margin:0 }}>{c.label}</p>
          </div>
          {c.items.map((item,i)=>{
            const key=cat+item;
            return (
              <div key={i} onClick={()=>toggle(key)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 2px", borderTop:i>0?`1px solid ${C.border}`:"none", cursor:"pointer" }}>
                <div style={{ width:22, height:22, borderRadius:7, border:`2px solid ${checked[key]?C.clay:C.border}`, background:checked[key]?C.clay:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                  {checked[key]&&<Icon name="check" size={12} color="#fff"/>}
                </div>
                <p style={{ fontSize:14, color:checked[key]?C.muted:C.walnut, margin:0, textDecoration:checked[key]?"line-through":"none", transition:"all 0.15s" }}>{item}</p>
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ background:C.sageLight, border:`1px solid #B8CDB4`, borderRadius:R.md, padding:"14px 18px", display:"flex", gap:10 }}>
        <Icon name="alert" size={15} color={C.sage}/>
        <p style={{ fontSize:12, color:C.sage, margin:0, lineHeight:1.5 }}><strong>{t("shoppingList.tipTitle")}</strong><br/>{t("shoppingList.tipBody")}</p>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Nourishly() {
  return (
    <LanguageProvider>
      <NourishlyApp />
    </LanguageProvider>
  );
}

function NourishlyApp() {
  const t = useT();
  const { lang, setLang } = useLang();
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

  const [forgotForm, setForgotForm] = useState({ email:"" });
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const [resetSession, setResetSession] = useState(null);
  const [resetForm, setResetForm] = useState({ password:"", confirm:"" });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  useEffect(()=>{
    const hash=window.location.hash;
    if(hash&&hash.includes("type=recovery")&&hash.includes("access_token=")){
      const params=new URLSearchParams(hash.slice(1));
      const accessToken=params.get("access_token");
      const refreshToken=params.get("refresh_token");
      window.history.replaceState(null,"",window.location.pathname+window.location.search);
      if(accessToken){
        (async()=>{
          const u=await sb.getUser(accessToken);
          if(u.__ok){ setResetSession({ access_token:accessToken, refresh_token:refreshToken, user:u }); setScreen("resetPassword"); }
          else { setLang("en"); setScreen("slides"); }
        })();
        return;
      }
    }
    const splashTimer=setTimeout(()=>{
      if(session?.access_token){ setScreen("app"); loadProfile(session,session.user.id); }
      else { setLang("en"); setScreen("slides"); }
    },1100);
    return ()=>clearTimeout(splashTimer);
  },[]);

  const saveSession=s=>{ setSession(s); try{ localStorage.setItem("nourishly_session",JSON.stringify(s)); }catch{} };

  const loadProfile=async(sess,userId)=>{
    try{
      const p=await withAutoRefresh(sess, saveSession, async(tok)=>(await sb.from("profiles",tok)).select(`id=eq.${userId}&limit=1`));
      console.log("[nourishly] loadProfile fetched", { userId, isArray:Array.isArray(p), row:Array.isArray(p)?p[0]:p, subscription_status:Array.isArray(p)&&p[0]?p[0].subscription_status:undefined });
      if(Array.isArray(p)&&p[0]){ setProfile(p[0]); if(p[0].family_size) setForm({ familySize:p[0].family_size, allergies:p[0].allergies||"", cookTime:p[0].cook_time||"" }); if(p[0].language) setLang(p[0].language); }
      const pl=await withAutoRefresh(sess, saveSession, async(tok)=>(await sb.from("meal_plans",tok)).select(`user_id=eq.${userId}&limit=10`));
      if(Array.isArray(pl)){ setSavedPlans(pl); if(pl.length>0 && !mealPlan){ setMealPlan({days:pl[0].days}); setTriedMeals([]); } }
    }catch{}
  };

  const handleOnboardingComplete=answers=>{ setForm(answers); setScreen("auth"); };

  const handleAuth=async()=>{
    if(!authForm.email||!authForm.password){ setError(t("auth.fillAllFields")); return; }
    if(authMode==="signup"&&!authForm.name){ setError(t("auth.enterName")); return; }
    setAuthLoading(true); setError("");
    try{
      let data;
      if(authMode==="signup"){
        data=await sb.signUp(authForm.email,authForm.password);
        if(!data.__ok||data.error||data.error_description) throw new Error(data.error_description||data.error?.message||data.msg||t("auth.signupFailed"));
        if(data.access_token&&data.user?.id){
          saveSession(data);
          const profileResult=await(await sb.from("profiles",data.access_token)).upsert({ id:data.user.id, name:authForm.name, email:authForm.email, subscription_status:"free", generations_used_this_month:0, streak_weeks:0, family_size:form.familySize?parseInt(form.familySize):null, allergies:form.allergies, cook_time:form.cookTime });
          if(!profileResult.__ok) throw new Error(profileResult.message||t("auth.profileCreateFailed"));
          setProfile({ name:authForm.name, email:authForm.email, streak_weeks:0 });
          setScreen("app");
          if(form.familySize&&form.cookTime) handleGenerate(form, data);
        } else { setError(t("auth.confirmEmail")); setAuthMode("login"); }
      } else {
        data=await sb.signIn(authForm.email,authForm.password);
        if(!data.__ok||data.error||data.error_description) throw new Error(data.error_description||data.error?.message||data.msg||t("auth.invalidCredentials"));
        if(!data.access_token||!data.user?.id) throw new Error(t("auth.invalidCredentials"));
        saveSession(data); setScreen("app"); loadProfile(data,data.user.id);
      }
    }catch(e){ setError(e.message||t("auth.somethingWrong")); }
    finally{ setAuthLoading(false); }
  };

  const handleForgotPassword=async()=>{
    if(!forgotForm.email){ setForgotError(t("forgotPassword.enterEmail")); return; }
    setForgotLoading(true); setForgotError("");
    try{
      const data=await sb.recover(forgotForm.email);
      if(!data.__ok||data.error||data.error_description) throw new Error(data.error_description||data.error?.message||data.msg||t("forgotPassword.sendFailed"));
      setForgotSent(true);
    }catch(e){ setForgotError(e.message||t("auth.somethingWrong")); }
    finally{ setForgotLoading(false); }
  };

  const handleSetNewPassword=async()=>{
    setResetError("");
    if(!resetForm.password||!resetForm.confirm){ setResetError(t("resetPassword.fillBothFields")); return; }
    if(resetForm.password.length<6){ setResetError(t("resetPassword.tooShort")); return; }
    if(resetForm.password!==resetForm.confirm){ setResetError(t("resetPassword.noMatch")); return; }
    setResetLoading(true);
    try{
      const result=await sb.updateUser(resetSession.access_token,{ password:resetForm.password });
      if(!result.__ok||result.error||result.error_description) throw new Error(result.msg||result.error_description||result.error?.message||t("resetPassword.updateFailed"));
      const newSession={ access_token:resetSession.access_token, refresh_token:resetSession.refresh_token, user:result };
      saveSession(newSession);
      setScreen("app");
      loadProfile(newSession,newSession.user.id);
    }catch(e){ setResetError(e.message||t("auth.somethingWrong")); }
    finally{ setResetLoading(false); }
  };

  const handleGenerate=async(overrideForm, overrideSession)=>{
    const f=overrideForm||form;
    if(!f.familySize||!f.cookTime){ setError(t("home.fillFamilyCookTime")); return; }
    const isPaid = profile?.subscription_status === "active";
    const usedThisMonth = profile?.generations_used_this_month || 0;
    if(!isPaid && usedThisMonth >= 2){ setError(t("home.freeLimitReached")); return; }
    setError(""); setLoading(true);
    const sess=overrideSession||session;
    const token=sess?.access_token; const userId=sess?.user?.id;
    const userName=profile?.name||sess?.user?.email?.split("@")[0]||"your family";
    console.log("[nourishly] handleGenerate start", { hasToken:!!token, userId, usedOverrideSession:!!overrideSession });
    if(token&&userId){ try{ const r=await(await sb.from("profiles",token)).update({ family_size:parseInt(f.familySize), allergies:f.allergies, cook_time:f.cookTime },`id=eq.${userId}`); if(!r.__ok) console.error("[nourishly] failed to update profile family_size/allergies/cook_time", r); }catch(e){ console.error("[nourishly] error updating profile family_size/allergies/cook_time", e); } }
    const recentMealNames=Array.from(new Set(savedPlans.flatMap(p=>(p.days||[]).map(d=>d.name)).filter(Boolean))).slice(0,25);
    const varietySeed=Math.random().toString(36).slice(2,8);
    const languageName=LANGUAGE_NAMES[lang]||"English";
    const prompt=`You are a friendly expert meal planning assistant. Generate a Monday to Sunday dinner plan for ${userName}'s family of ${f.familySize}. Allergies: ${f.allergies||"none"}. Cook time: ${f.cookTime}.\nLanguage (strict): write every "day", "name", "description", "prepTime", and "steps" value in natural, native-sounding ${languageName} — never machine-translated, this is the family's chosen app language. The "day" value must be that weekday's name written in ${languageName} (Monday through Sunday, in order, translated).\nVariety rules (strict): each of the 7 days must use a different main protein (e.g. chicken, beef, pork, fish, seafood, lamb, tofu/vegetarian, eggs) and a different dish/cuisine style — never repeat the same protein or dish type twice in the same week.\nProtein-mix quota (strict, unless it conflicts with the allergies listed above): out of the 7 days, include AT LEAST 1-2 fish or seafood dishes, AT LEAST 1 vegetarian dish (no meat, poultry, or fish), and NO MORE THAN 3-4 days total where the main protein is chicken, beef, pork, or lamb combined. Do not make the week meat-dominated — fish/seafood and vegetarian meals must have real representation, not just one token day.${recentMealNames.length?` Also avoid repeating any of these meals from this family's recent weeks: ${recentMealNames.join(", ")}.`:""} Randomization seed ${varietySeed} — use it to pick a fresh, different combination of meals than you might otherwise default to.\nCategory tag (strict, ALWAYS in English regardless of the language above — this is an internal app tag, never shown to the user): for every day also include a "category" field, a single lowercase English word chosen from EXACTLY this list — pasta, chicken, salad, salmon, curry, taco, burger, soup, rice, noodles, steak, pizza, fish, lamb, pork, sandwich, eggs, default — picking whichever best matches that day's dominant protein or dish style. Never translate this field and never use a word outside this list.\nReturn ONLY valid JSON, no markdown, with exactly 7 entries covering Monday through Sunday in order, each shaped like this example (translate the field values, not the JSON keys):\n{"days":[{"day":"<weekday in ${languageName}>","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"],"category":"chicken"}]}`;
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
      if(token&&userId){ try{ const weekOf=new Date().toISOString().split("T")[0]; const saved=await withAutoRefresh(sess, saveSession, async(tok)=>(await sb.from("meal_plans",tok)).insert({ user_id:userId, days:parsed.days, week_of:weekOf })); if(Array.isArray(saved)&&saved[0]){ setSavedPlans(prev=>[saved[0],...prev.slice(0,9)]); const newCount=(profile?.generations_used_this_month||0)+1; console.log("[nourishly] about to update generations_used_this_month", { userId, currentProfileCount:profile?.generations_used_this_month, newCount }); const updResult=await withAutoRefresh(sess, saveSession, async(tok)=>(await sb.from("profiles",tok)).update({ generations_used_this_month:newCount },`id=eq.${userId}`)); console.log("[nourishly] profiles update response", updResult); if(Array.isArray(updResult)&&updResult[0]){ setProfile(prev=>prev?{...prev, generations_used_this_month:newCount}:prev); } else { setError(t("home.planSavedButUpdateFailed")); } } else { setError(t("home.planNotSaved")); } }catch(e){ setError(t("home.planNotSavedError",{error:e.message})); } } else { console.log("[nourishly] skipped save — missing token or userId", { hasToken:!!token, userId }); }
      setTab("plan");
    }catch(e){ setError(t("home.genericError",{error:e.message})); }
    finally{ setLoading(false); }
  };

  const handleSwap=async meal=>{
    setSwappingMeal(meal?.day);
    try{
      const otherMealNames=(mealPlan?.days||[]).filter(d=>d.day!==meal?.day).map(d=>d.name).filter(Boolean);
      const avoidNames=Array.from(new Set([meal?.name, ...otherMealNames].filter(Boolean)));
      const languageName=LANGUAGE_NAMES[lang]||"English";
      const prompt=`Suggest ONE alternative dinner meal for a family of ${form.familySize||4} with ${form.allergies||"no"} allergies that takes about ${form.cookTime||"30 minutes"} to cook. It must use a different main protein and dish style than the rest of this week's plan, and must not match any of these meals already used this week: ${avoidNames.join(", ")}.\nWrite the "name", "description", "prepTime", and "steps" values in natural, native-sounding ${languageName}.\nAlso include a "category" field — a single lowercase English word chosen from EXACTLY this list: pasta, chicken, salad, salmon, curry, taco, burger, soup, rice, noodles, steak, pizza, fish, lamb, pork, sandwich, eggs, default — matching the dish's dominant protein or style. Never translate this field.\nReturn ONLY JSON: {"day":"${meal?.day}","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"],"category":"chicken"}`;
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

  const handleLogout=()=>{ saveSession(null); setProfile(null); setMealPlan(null); setSavedPlans([]); setTriedMeals([]); setTab("home"); setLang("en"); setScreen("slides"); };

  // ── Language: always persisted locally; best-effort synced to `profiles`
  // for logged-in users so it follows them across devices. Wrapped so a
  // missing `language` column on `profiles` can't break the language switch.
  const handleChangeLanguage=async(code)=>{
    setLang(code);
    const token=session?.access_token; const userId=session?.user?.id;
    if(token&&userId){ try{ await(await sb.from("profiles",token)).update({ language:code },`id=eq.${userId}`); }catch{} }
  };

  const [managingSubscription, setManagingSubscription] = useState(false);
  const handleManageSubscription = async () => {
    if (!profile?.stripe_customer_id) return;
    setManagingSubscription(true);
    try {
      const res = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeCustomerId: profile.stripe_customer_id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || t("profile.portalOpenFailed"));
    } catch (e) {
      setError(t("profile.portalOpenFailedError",{error:e.message}));
    } finally {
      setManagingSubscription(false);
    }
  };

  const [upgrading, setUpgrading] = useState(false);
  const handleUpgrade = async () => {
    if (!session?.user?.id || !session?.user?.email) return;
    setUpgrading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, userEmail: session.user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || t("profile.checkoutFailed"));
    } catch (e) {
      setError(t("profile.checkoutFailedError",{error:e.message}));
    } finally {
      setUpgrading(false);
    }
  };

  // ── Profile: edit preferences (family size / allergies / cook time) ──────
  // Persists straight to `profiles` — does NOT trigger a new plan generation.
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);
  const handleSavePreferences = async () => {
    const token = session?.access_token; const userId = session?.user?.id;
    if (!token || !userId) return;
    setSavingPrefs(true); setPrefsSaved(false); setError("");
    try {
      const updates = { family_size: form.familySize ? parseInt(form.familySize) : null, allergies: form.allergies, cook_time: form.cookTime };
      const result = await withAutoRefresh(session, saveSession, async (tok) => (await sb.from("profiles", tok)).update(updates, `id=eq.${userId}`));
      if (!result.__ok) throw new Error(result.message || t("profile.savePrefsFailed"));
      setProfile(prev => prev ? { ...prev, ...updates } : prev);
      setPrefsSaved(true);
    } catch (e) {
      setError(e.message || t("profile.savePrefsFailed"));
    } finally {
      setSavingPrefs(false);
    }
  };

  // ── Profile: change password ───────────────────────────────────────────────
  // Re-verifies the current password via sign-in before calling Supabase's
  // user-update endpoint, checking __ok on both calls rather than assuming success.
  const [pwForm, setPwForm] = useState({ current:"", next:"", confirm:"" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState("");
  const [pwError, setPwError] = useState("");
  const handleChangePassword = async () => {
    setPwError(""); setPwMessage("");
    if (!pwForm.current || !pwForm.next || !pwForm.confirm) { setPwError(t("auth.fillAllFields")); return; }
    if (pwForm.next.length < 6) { setPwError(t("profile.newPasswordTooShort")); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError(t("profile.newPasswordNoMatch")); return; }
    const email = profile?.email || session?.user?.email;
    if (!email) { setPwError(t("profile.noAccountEmail")); return; }
    setPwLoading(true);
    try {
      const verify = await sb.signIn(email, pwForm.current);
      if (!verify.__ok || verify.error || verify.error_description) throw new Error(t("profile.currentPasswordWrong"));
      const token = verify.access_token || session?.access_token;
      const result = await sb.updateUser(token, { password: pwForm.next });
      if (!result.__ok || result.error || result.error_description) throw new Error(result.msg || result.error_description || result.error?.message || t("profile.passwordUpdateFailed"));
      setPwMessage(t("profile.passwordUpdated"));
      setPwForm({ current:"", next:"", confirm:"" });
    } catch (e) {
      setPwError(e.message || t("profile.passwordUpdateFailed"));
    } finally {
      setPwLoading(false);
    }
  };

  const totalN=mealPlan?.days?.reduce((a,m)=>{ const n=NUTRITION(m); return { cal:a.cal+n.cal, protein:a.protein+n.protein, carbs:a.carbs+n.carbs, fat:a.fat+n.fat }; },{ cal:0,protein:0,carbs:0,fat:0 });
  const weekImages=assignWeekImages(mealPlan?.days);

  const inp={ width:"100%", boxSizing:"border-box", padding:"13px 15px", borderRadius:R.md, border:`1.5px solid ${C.border}`, fontSize:14, color:C.walnut, background:C.bg, outline:"none", fontFamily:"inherit", transition:"border-color 0.15s ease" };
  const lbl={ display:"block", fontWeight:700, fontSize:11, color:C.walnut, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.07em" };
  const tabs=[{ id:"home",label:t("nav.home"),icon:"home" },{ id:"plan",label:t("nav.thisWeek"),icon:"calendar" },{ id:"shopping",label:t("nav.shopping"),icon:"cart" },{ id:"saved",label:t("nav.saved"),icon:"bookmark" },{ id:"profile",label:t("nav.profile"),icon:"user" }];
  const prefFields=[
    { label:t("common.fields.familySize"), name:"familySize", placeholder:t("common.fields.familySizePlaceholder"), type:"number" },
    { label:t("common.fields.allergies"), name:"allergies", placeholder:t("common.fields.allergiesPlaceholder"), type:"text" },
    { label:t("common.fields.cookTime"), name:"cookTime", placeholder:t("common.fields.cookTimePlaceholder"), type:"text" },
  ];
  const dateLocale=lang==="pt"?"pt-PT":"en-GB";

  if(screen==="splash") return <Splash/>;
  if(screen==="slides") return <WelcomeSlides onDone={()=>setScreen("chooseLanguage")}/>;
  if(screen==="chooseLanguage") return <ChooseLanguage onComplete={()=>setScreen("onboarding")}/>;
  if(screen==="onboarding") return <Onboarding onComplete={handleOnboardingComplete}/>;

  if(screen==="auth"||screen==="welcome") return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT }}>
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#7A3018 45%,${C.clay} 100%)`, padding:"48px 24px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0, marginBottom:0, backgroundColor:C.clay }}>
        <Logo size={60} ring/>
        <h1 style={{ color:"#fff", fontSize:26, fontWeight:900, margin:"16px 0 6px", letterSpacing:"-0.5px" }}>{t("common.appName")}</h1>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, margin:"0 0 0" }}>{t("common.tagline")}</p>
        <InlineWave bgColor={C.bg} />
      </div>
      <div style={{ maxWidth:420, margin:"0 auto", padding:"0 20px 48px" }}>
        {form.familySize&&(
          <div style={{ background:C.clayLight, borderRadius:R.md, padding:"12px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
            <Icon name="checkCircle" size={16} active color={C.clay}/>
            <p style={{ fontSize:12, color:C.clay, margin:0, fontWeight:600 }}>{t("auth.prefsSavedBanner")}</p>
          </div>
        )}
        <div style={{ background:C.card, borderRadius:R.xl, padding:"28px 22px", border:`1px solid ${C.border}`, boxShadow:SHADOW.raised }}>
          {authMode==="forgot" ? (
            <>
              <p style={{ fontWeight:800, fontSize:16, color:C.walnut, margin:"0 0 4px" }}>{t("forgotPassword.title")}</p>
              <p style={{ fontSize:13, color:C.muted, margin:"0 0 20px" }}>{t("forgotPassword.subtitle")}</p>
              {forgotSent ? (
                <div style={{ background:C.sageLight, border:"1px solid #B8CDB4", borderRadius:R.md, padding:"14px 16px", marginBottom:18, display:"flex", gap:8 }}>
                  <Icon name="checkCircle" size={15} active color={C.sage}/>
                  <p style={{ color:C.sage, fontSize:13, margin:0, lineHeight:1.5 }}>{t("forgotPassword.sentMessage")}</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom:20 }}><label style={lbl}>{t("auth.email")}</label><input type="email" placeholder={t("auth.emailPlaceholder")} value={forgotForm.email} onChange={e=>setForgotForm({ email:e.target.value })} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
                  {forgotError&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:R.md, padding:"10px 14px", marginBottom:18, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{forgotError}</p></div>}
                  <button onClick={handleForgotPassword} disabled={forgotLoading} className="btn-press" style={{ width:"100%", padding:"16px 0", background:btnBg(forgotLoading?C.muted:C.clay), color:"#fff", border:"none", borderRadius:R.md, fontSize:15, fontWeight:800, cursor:forgotLoading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:forgotLoading?"none":SHADOW.button, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {forgotLoading?t("forgotPassword.sending"):t("forgotPassword.sendLink")}
                  </button>
                </>
              )}
              <button onClick={()=>{ setAuthMode("login"); setForgotError(""); setForgotSent(false); }} className="btn-press" style={{ width:"100%", padding:"12px 0", marginTop:14, background:"none", color:C.muted, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit" }}>{t("forgotPassword.backToSignIn")}</button>
            </>
          ) : (
            <>
              <div style={{ display:"flex", background:C.bg, borderRadius:R.md, padding:4, marginBottom:24 }}>
                {[["signup",t("auth.createAccount")],["login",t("auth.signIn")]].map(([mode,label])=>(
                  <button key={mode} onClick={()=>{ setAuthMode(mode); setError(""); }} className="btn-press" style={{ flex:1, padding:"9px 0", borderRadius:R.sm, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", background:authMode===mode?C.card:"transparent", color:authMode===mode?C.walnut:C.muted, boxShadow:authMode===mode?"0 2px 8px rgba(44,24,16,0.1)":"none", transition:"all 0.15s" }}>{label}</button>
                ))}
              </div>
              {authMode==="signup"&&<div style={{ marginBottom:16 }}><label style={lbl}>{t("auth.yourName")}</label><input type="text" placeholder={t("auth.yourNamePlaceholder")} value={authForm.name} onChange={e=>setAuthForm(f=>({...f,name:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>}
              <div style={{ marginBottom:16 }}><label style={lbl}>{t("auth.email")}</label><input type="email" placeholder={t("auth.emailPlaceholder")} value={authForm.email} onChange={e=>setAuthForm(f=>({...f,email:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
              <div style={{ marginBottom:authMode==="login"?10:24 }}><label style={lbl}>{t("auth.password")}</label><input type="password" placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm(f=>({...f,password:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
              {authMode==="login"&&<div style={{ textAlign:"right", marginBottom:14 }}><button onClick={()=>{ setAuthMode("forgot"); setError(""); setForgotSent(false); setForgotError(""); setForgotForm({ email:authForm.email||"" }); }} className="btn-press" style={{ background:"none", border:"none", cursor:"pointer", color:C.clay, fontSize:12.5, fontWeight:700, fontFamily:"inherit", padding:0 }}>{t("auth.forgotPassword")}</button></div>}
              {error&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:R.md, padding:"10px 14px", marginBottom:18, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{error}</p></div>}
              <button onClick={handleAuth} disabled={authLoading} className="btn-press" style={{ width:"100%", padding:"16px 0", background:btnBg(authLoading?C.muted:C.clay), color:"#fff", border:"none", borderRadius:R.md, fontSize:15, fontWeight:800, cursor:authLoading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:authLoading?"none":SHADOW.button, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {authLoading?t("auth.pleaseWait"):authMode==="signup"?t("auth.startPlanning"):t("auth.welcomeBack")}
              </button>
              <p style={{ textAlign:"center", color:C.muted, fontSize:12, margin:"14px 0 0" }}>{t("auth.privacyFooter")}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if(screen==="resetPassword") return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT }}>
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#7A3018 45%,${C.clay} 100%)`, padding:"48px 24px 0", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:0, marginBottom:0, backgroundColor:C.clay }}>
        <Logo size={60} ring/>
        <h1 style={{ color:"#fff", fontSize:26, fontWeight:900, margin:"16px 0 6px", letterSpacing:"-0.5px" }}>{t("common.appName")}</h1>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, margin:"0 0 0" }}>{t("resetPassword.headerSubtitle")}</p>
        <InlineWave bgColor={C.bg} />
      </div>
      <div style={{ maxWidth:420, margin:"0 auto", padding:"0 20px 48px" }}>
        <div style={{ background:C.card, borderRadius:R.xl, padding:"28px 22px", border:`1px solid ${C.border}`, boxShadow:SHADOW.raised }}>
          <p style={{ fontWeight:800, fontSize:16, color:C.walnut, margin:"0 0 20px" }}>{t("resetPassword.cardTitle")}</p>
          <div style={{ marginBottom:16 }}><label style={lbl}>{t("resetPassword.newPassword")}</label><input type="password" placeholder="••••••••" value={resetForm.password} onChange={e=>setResetForm(f=>({...f,password:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
          <div style={{ marginBottom:24 }}><label style={lbl}>{t("resetPassword.confirmNewPassword")}</label><input type="password" placeholder="••••••••" value={resetForm.confirm} onChange={e=>setResetForm(f=>({...f,confirm:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/></div>
          {resetError&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:R.md, padding:"10px 14px", marginBottom:18, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{resetError}</p></div>}
          <button onClick={handleSetNewPassword} disabled={resetLoading} className="btn-press" style={{ width:"100%", padding:"16px 0", background:btnBg(resetLoading?C.muted:C.clay), color:"#fff", border:"none", borderRadius:R.md, fontSize:15, fontWeight:800, cursor:resetLoading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:resetLoading?"none":SHADOW.button, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {resetLoading?t("resetPassword.pleaseWait"):t("resetPassword.submit")}
          </button>
        </div>
      </div>
    </div>
  );

  // ── Main app ──
  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:FONT }}>
      <div style={{ background:C.clay, padding:"18px 20px 0" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Logo size={36}/>
            <div>
              <h1 style={{ color:"#fff", margin:0, fontSize:18, fontWeight:900 }}>{t("common.appName")}</h1>
              <p style={{ color:"rgba(255,255,255,0.5)", margin:0, fontSize:11 }}>{t("nav.greeting",{name:profile?.name?.split(" ")[0]||t("nav.greetingFallback")})}</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {profile?.streak_weeks>0&&<div style={{ background:"rgba(255,255,255,0.12)", borderRadius:R.sm, padding:"5px 10px", display:"flex", alignItems:"center", gap:5 }}><Icon name="flame" size={13} color="#FFB088"/><span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>{profile.streak_weeks}w</span></div>}
            <button onClick={handleLogout} className="btn-press" style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:R.sm, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="logout" size={15} color="rgba(255,255,255,0.7)"/></button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:560, margin:"0 auto", padding:"18px 16px 96px", boxSizing:"border-box" }}>
        <Fade id={tab}>

        {/* HOME */}
        {tab==="home"&&(
          <div>
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"26px 22px", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
                <div style={{ width:40, height:40, borderRadius:R.sm, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="calendar" size={20} color={C.clay}/></div>
                <div>
                  <p style={{ fontWeight:900, fontSize:18, color:C.walnut, margin:0, letterSpacing:"-0.3px" }}>{t("home.cardTitle")}</p>
                  <p style={{ fontSize:12, color:C.muted, margin:0 }}>{t("home.cardSubtitle")}</p>
                </div>
              </div>
              {prefFields.map(field=>(
                <div key={field.name} style={{ marginBottom:16 }}>
                  <label style={lbl}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={e=>setForm(f=>({...f,[field.name]:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/>
                </div>
              ))}
              {error&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:R.md, padding:"10px 14px", marginBottom:16, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{error}</p></div>}
              <button onClick={()=>handleGenerate()} disabled={loading} className="btn-press" style={{ width:"100%", padding:"16px 0", background:btnBg(loading?C.muted:C.clay), color:"#fff", border:"none", borderRadius:R.md, fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:loading?"none":SHADOW.button, transition:"background 0.2s ease, box-shadow 0.2s ease", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                {loading?<><Icon name="refresh" size={16} color="#fff"/>{t("home.building")}</>:<>{t("home.buildButton")}<Icon name="chevronRight" size={16} color="#fff"/></>}
              </button>
            </div>
            {savedPlans.length>0&&(
              <div>
                <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 12px" }}>{t("home.recentPlans")}</p>
                {savedPlans.slice(0,3).map((plan,i)=>(
                  <div key={i} onClick={()=>{ setMealPlan({days:plan.days}); setTriedMeals([]); setTab("plan"); }} className="btn-press" style={{ background:C.card, borderRadius:R.lg, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"16px 18px", marginBottom:12, display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:38, height:38, borderRadius:R.sm, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="calendar" size={17} color={C.clay}/></div>
                      <div>
                        <p style={{ fontWeight:700, fontSize:14, color:C.walnut, margin:"0 0 2px" }}>{profile?.name?t("home.planOf",{name:profile.name}):t("home.yourPlanFallback")}</p>
                        <p style={{ fontSize:12, color:C.muted, margin:0 }}>{new Date(plan.created_at).toLocaleDateString(dateLocale,{ day:"numeric", month:"short", year:"numeric" })}</p>
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
              <div style={{ background:C.card, borderRadius:R.lg, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"18px 20px", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <Icon name="chart" size={14} color={C.muted}/>
                  <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:0 }}>{t("plan.nutritionTotals")}</p>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <NChip label={t("plan.calLabel")} value={totalN?.cal} color={C.clay}/>
                  {profile?.subscription_status==="active" ? (
                    <>
                      <NChip label={t("plan.proteinLabel")} value={`${totalN?.protein}g`} color={C.sage}/>
                      <NChip label={t("plan.carbsLabel")} value={`${totalN?.carbs}g`} color={C.clayMid}/>
                      <NChip label={t("plan.fatLabel")} value={`${totalN?.fat}g`} color={C.muted}/>
                    </>
                  ) : (
                    <div style={{ flex:3, background:C.clayLight, borderRadius:R.sm, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                      <Icon name="checkCircle" size={13} color={C.clay}/>
                      <span style={{ fontSize:11, color:C.clay, fontWeight:700 }}>{t("plan.plusFeatureChip")}</span>
                    </div>
                  )}
                </div>
              </div>
              {mealPlan.days?.map(meal=>(
                <div key={meal.day} style={{ position:"relative" }}>
                  {swappingMeal===meal.day&&<div style={{ position:"absolute", inset:0, background:"rgba(232,221,208,0.88)", borderRadius:R.xl, display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}><p style={{ color:C.clay, fontWeight:700, fontSize:14 }}>{t("plan.findingAlternative")}</p></div>}
                  <MealCard meal={meal} onSwap={handleSwap} onMarkTried={handleMarkTried} triedMeals={triedMeals} isPaid={profile?.subscription_status==="active"} imageUrl={weekImages[meal.day]}/>
                </div>
              ))}
              <button onClick={()=>{ setMealPlan(null); setTab("home"); }} className="btn-press" style={{ width:"100%", padding:"14px 0", marginTop:10, background:"none", color:C.clay, border:`2px solid ${C.clay}`, borderRadius:R.md, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>{t("plan.generateNewPlan")}</button>
            </div>
          ):(
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"56px 28px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:R.lg, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}><Icon name="calendar" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>{t("plan.emptyTitle")}</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 22px" }}>{t("plan.emptySubtitle")}</p>
              <button onClick={()=>setTab("home")} className="btn-press" style={{ padding:"13px 28px", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:SHADOW.button }}>{t("plan.goToHome")}</button>
            </div>
          )
        )}

        {/* SHOPPING */}
        {tab==="shopping"&&(
          profile?.subscription_status!=="active" ? (
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"56px 28px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:R.lg, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}><Icon name="cart" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>{t("shopping.paywallTitle")}</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 22px" }}>{t("shopping.paywallSubtitle")}</p>
              <button onClick={handleUpgrade} disabled={upgrading} className="btn-press" style={{ padding:"13px 28px", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:14, fontWeight:800, cursor:upgrading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:SHADOW.button }}>
                {upgrading ? t("shopping.redirecting") : t("shopping.upgradeButton")}
              </button>
            </div>
          ) : mealPlan?<ShoppingList days={mealPlan.days}/>:(
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"56px 28px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:R.lg, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}><Icon name="cart" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>{t("shopping.emptyTitle")}</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 22px" }}>{t("shopping.emptySubtitle")}</p>
              <button onClick={()=>setTab("home")} className="btn-press" style={{ padding:"13px 28px", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:SHADOW.button }}>{t("shopping.buildPlan")}</button>
            </div>
          )
        )}

        {/* SAVED */}
        {tab==="saved"&&(
          savedPlans.length>0?(
            <div>
              <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 12px" }}>{savedPlans.length===1?t("saved.countOne",{count:savedPlans.length}):t("saved.countOther",{count:savedPlans.length})}</p>
              {savedPlans.map((plan,i)=>(
                <div key={i} style={{ background:C.card, borderRadius:R.lg, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"18px 20px", marginBottom:14 }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                    <div>
                      <p style={{ fontWeight:800, fontSize:15, color:C.walnut, margin:"0 0 3px" }}>{profile?.name?t("saved.mealPlanOf",{name:profile.name}):t("saved.yourMealPlanFallback")}</p>
                      <p style={{ fontSize:12, color:C.muted, margin:0 }}>{new Date(plan.created_at).toLocaleDateString(dateLocale,{ day:"numeric", month:"short", year:"numeric" })}</p>
                    </div>
                    <button onClick={()=>{ setMealPlan({days:plan.days}); setTriedMeals([]); setTab("plan"); }} className="btn-press" style={{ background:C.clayLight, color:C.clay, border:"none", borderRadius:R.sm, padding:"8px 14px", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4 }}>{t("saved.view")}<Icon name="chevronRight" size={13} color={C.clay}/></button>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {plan.days?.slice(0,5).map((d,j)=><span key={j} style={{ background:C.bg, color:C.muted, fontSize:11, padding:"3px 9px", borderRadius:20, border:`1px solid ${C.border}` }}>{d.name}</span>)}
                    {plan.days?.length>5&&<span style={{ color:C.muted, fontSize:11, padding:"3px 0" }}>{t("saved.moreCount",{count:plan.days.length-5})}</span>}
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"56px 28px", textAlign:"center" }}>
              <div style={{ width:64, height:64, borderRadius:R.lg, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}><Icon name="bookmark" size={28} color={C.clay}/></div>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>{t("saved.emptyTitle")}</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 22px" }}>{t("saved.emptySubtitle")}</p>
              <button onClick={()=>setTab("home")} className="btn-press" style={{ padding:"13px 28px", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", boxShadow:SHADOW.button }}>{t("saved.createFirst")}</button>
            </div>
          )
        )}

        {/* PROFILE */}
        {tab==="profile"&&(
          <div>

            {/* ── Account info (read-only, from profile/session state) ── */}
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"22px", marginBottom:20, display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:52, height:52, borderRadius:R.md, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon name="user" size={26} color={C.clay}/></div>
              <div>
                <p style={{ fontWeight:800, fontSize:16, color:C.walnut, margin:"0 0 3px" }}>{profile?.name||t("profile.accountFallback")}</p>
                <p style={{ fontSize:13, color:C.muted, margin:0 }}>{profile?.email||session?.user?.email||""}</p>
              </div>
            </div>

            {/* ── Subscription status (moved from Home) ── */}
            {profile?.subscription_status === "active" ? (
              <div style={{ background:C.clay, borderRadius:R.lg, boxShadow:SHADOW.card, padding:"16px 20px", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <Icon name="checkCircle" size={18} active color="#fff"/>
                  <p style={{ color:"#fff", fontSize:13, fontWeight:700, margin:0 }}>{t("profile.plusActive")}</p>
                </div>
                <button onClick={handleManageSubscription} disabled={managingSubscription} className="btn-press" style={{ width:"100%", padding:"10px 0", background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)", borderRadius:R.md, fontSize:12, fontWeight:700, cursor:managingSubscription?"not-allowed":"pointer", fontFamily:"inherit" }}>
                  {managingSubscription ? t("profile.redirecting") : t("profile.manageSubscription")}
                </button>
              </div>
            ) : (
              <div style={{ background:C.card, border:`1.5px solid ${C.border}`, borderRadius:R.lg, boxShadow:SHADOW.card, padding:"16px 20px", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:C.walnut, margin:0 }}>{t("profile.freePlan")}</p>
                  <p style={{ fontSize:12, color:C.muted, margin:0 }}>{t("profile.plansUsed",{used:profile?.generations_used_this_month||0})}</p>
                </div>
                <div style={{ background:C.bg, borderRadius:4, height:6, overflow:"hidden", marginBottom:14 }}>
                  <div style={{ height:"100%", width:`${Math.min(100,((profile?.generations_used_this_month||0)/2)*100)}%`, background:C.clay, borderRadius:4, transition:"width 0.3s" }}/>
                </div>
                <button onClick={handleUpgrade} disabled={upgrading} className="btn-press" style={{ width:"100%", padding:"13px 0", background:btnBg(), color:"#fff", border:"none", borderRadius:R.md, fontSize:13, fontWeight:800, cursor:upgrading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:SHADOW.button }}>
                  {upgrading ? t("profile.redirectingCheckout") : t("profile.upgradeButton")}
                </button>
              </div>
            )}

            {/* ── Language switcher ── */}
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"22px", marginBottom:20 }}>
              <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 18px" }}>{t("profile.language")}</p>
              <div style={{ display:"flex", background:C.bg, borderRadius:R.md, padding:4 }}>
                {[["en",t("profile.languageEnglish")],["pt",t("profile.languagePortuguese")],["es",t("profile.languageSpanish")],["zh",t("profile.languageChinese")],["fr",t("profile.languageFrench")]].map(([code,label])=>(
                  <button key={code} onClick={()=>handleChangeLanguage(code)} className="btn-press" style={{ flex:1, padding:"9px 0", borderRadius:R.sm, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", background:lang===code?C.card:"transparent", color:lang===code?C.walnut:C.muted, boxShadow:lang===code?"0 2px 8px rgba(44,24,16,0.1)":"none", transition:"all 0.15s" }}>{label}</button>
                ))}
              </div>
            </div>

            {/* ── Edit preferences: family size / allergies / cook time ──
                 Saves straight to `profiles`; does NOT generate a new plan. */}
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"22px", marginBottom:20 }}>
              <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 18px" }}>{t("profile.preferencesTitle")}</p>
              {prefFields.map(field=>(
                <div key={field.name} style={{ marginBottom:16 }}>
                  <label style={lbl}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={e=>{ setForm(f=>({...f,[field.name]:e.target.value})); setPrefsSaved(false); }} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/>
                </div>
              ))}
              <button onClick={handleSavePreferences} disabled={savingPrefs} className="btn-press" style={{ width:"100%", padding:"13px 0", background:btnBg(savingPrefs?C.muted:C.clay), color:"#fff", border:"none", borderRadius:R.md, fontSize:13, fontWeight:800, cursor:savingPrefs?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:savingPrefs?"none":SHADOW.button }}>
                {savingPrefs ? t("profile.saving") : prefsSaved ? t("profile.saved") : t("profile.save")}
              </button>
            </div>

            {/* ── Change password ──
                 Verifies the current password via sign-in, then calls Supabase's
                 auth/v1/user endpoint — both checked with the __ok pattern. */}
            <div style={{ background:C.card, borderRadius:R.xl, border:`1px solid ${C.border}`, boxShadow:SHADOW.card, padding:"22px", marginBottom:20 }}>
              <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 18px" }}>{t("profile.changePasswordTitle")}</p>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>{t("profile.currentPassword")}</label>
                <input type="password" placeholder="••••••••" value={pwForm.current} onChange={e=>setPwForm(f=>({...f,current:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>{t("resetPassword.newPassword")}</label>
                <input type="password" placeholder="••••••••" value={pwForm.next} onChange={e=>setPwForm(f=>({...f,next:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>{t("resetPassword.confirmNewPassword")}</label>
                <input type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e=>setPwForm(f=>({...f,confirm:e.target.value}))} style={inp} onFocus={e=>{e.target.style.borderColor=C.clay;}} onBlur={e=>{e.target.style.borderColor=C.border;}}/>
              </div>
              {pwError&&<div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:R.md, padding:"10px 14px", marginBottom:16, display:"flex", gap:8 }}><Icon name="alert" size={15} color="#DC2626"/><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>{pwError}</p></div>}
              {pwMessage&&<div style={{ background:C.sageLight, borderRadius:R.md, padding:"10px 14px", marginBottom:16, display:"flex", gap:8 }}><Icon name="checkCircle" size={15} active color={C.sage}/><p style={{ color:C.sage, fontSize:13, margin:0 }}>{pwMessage}</p></div>}
              <button onClick={handleChangePassword} disabled={pwLoading} className="btn-press" style={{ width:"100%", padding:"13px 0", background:btnBg(pwLoading?C.muted:C.clay), color:"#fff", border:"none", borderRadius:R.md, fontSize:13, fontWeight:800, cursor:pwLoading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:pwLoading?"none":SHADOW.button }}>
                {pwLoading ? t("profile.updating") : t("profile.updatePassword")}
              </button>
            </div>

            {/* ── Logout ── */}
            <button onClick={handleLogout} className="btn-press" style={{ width:"100%", padding:"14px 0", background:"none", color:C.walnut, border:`1.5px solid ${C.border}`, borderRadius:R.md, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <Icon name="logout" size={16} color={C.walnut}/>{t("profile.logout")}
            </button>
          </div>
        )}
        </Fade>
      </div>

      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:C.clay, borderTop:"1px solid rgba(255,255,255,0.15)", display:"flex", padding:"10px 0 14px", zIndex:100, boxShadow:"0 -4px 20px rgba(44,24,16,0.08)" }}>
        {tabs.map(navTab=>(
          <button key={navTab.id} onClick={()=>setTab(navTab.id)} className="btn-press" style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:"2px 0", fontFamily:"inherit" }}>
            <span style={{ display:"inline-flex", transition:"transform 0.2s cubic-bezier(0.4,0,0.2,1)", transform:tab===navTab.id?"scale(1.08) translateY(-1px)":"scale(1)" }}>
              <Icon name={navTab.icon} size={24} active={tab===navTab.id} color={tab===navTab.id?"#fff":"rgba(255,255,255,0.65)"}/>
            </span>
            <span style={{ fontSize:10, fontWeight:tab===navTab.id?800:500, color:tab===navTab.id?"#fff":"rgba(255,255,255,0.65)", transition:"color 0.2s ease, font-weight 0.2s ease" }}>{navTab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
