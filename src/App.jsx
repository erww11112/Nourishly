import { useState, useEffect } from "react";

const SUPABASE_URL = "https://loaxiwaotfxmvyxpzdud.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXhpd2FvdGZ4bXZ5eHB6ZHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MzI2NzUsImV4cCI6MjA5ODEwODY3NX0.Eq3cjV7V1TfOkkFuCEhwZ9PBBRSBEDzhEGkkHeRqUa8";

const C = {
  bg: "#FAF6F0", card: "#FFF8F0", clay: "#C4622D", clayLight: "#F5E6DC",
  clayMid: "#E8895A", walnut: "#2C1810", sage: "#4A6741", sageLight: "#E8F0E6",
  sageMid: "#7A9E74", muted: "#8C7B6E", border: "#EDE4D8", white: "#FFFFFF",
};

// ─── Supabase REST helpers ───────────────────────────────────────────────────
const sbHeaders = (token) => ({
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${token || SUPABASE_ANON_KEY}`,
  "Prefer": "return=representation",
});

const sb = {
  async signUp(email, password) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password }),
    });
    return r.json();
  },
  async signIn(email, password) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password }),
    });
    return r.json();
  },
  async getUser(token) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: sbHeaders(token),
    });
    return r.json();
  },
  async from(table, token) {
    return {
      async select(filter = "") {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}&order=created_at.desc`, {
          headers: sbHeaders(token),
        });
        return r.json();
      },
      async insert(data) {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: "POST",
          headers: sbHeaders(token),
          body: JSON.stringify(data),
        });
        return r.json();
      },
      async update(data, filter) {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
          method: "PATCH",
          headers: sbHeaders(token),
          body: JSON.stringify(data),
        });
        return r.json();
      },
      async upsert(data) {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: "POST",
          headers: { ...sbHeaders(token), "Prefer": "resolution=merge-duplicates,return=representation" },
          body: JSON.stringify(data),
        });
        return r.json();
      },
    };
  },
};

// ─── Meal helpers ────────────────────────────────────────────────────────────
const MEAL_QUERY = (name) => {
  if (!name) return "healthy dinner food";
  const n = name.toLowerCase();
  if (n.includes("pasta") || n.includes("spaghetti")) return "pasta dish food";
  if (n.includes("salmon")) return "salmon fillet plate";
  if (n.includes("chicken")) return "grilled chicken dinner";
  if (n.includes("salad")) return "fresh salad bowl";
  if (n.includes("soup") || n.includes("stew")) return "soup bowl warm food";
  if (n.includes("fish") || n.includes("cod")) return "fish dinner plate";
  if (n.includes("rice") || n.includes("risotto")) return "rice dish dinner";
  if (n.includes("burger")) return "gourmet burger meal";
  if (n.includes("pizza")) return "pizza food";
  if (n.includes("steak") || n.includes("beef")) return "steak dinner plate";
  if (n.includes("taco") || n.includes("burrito")) return "tacos mexican food";
  if (n.includes("curry") || n.includes("masala")) return "curry dinner bowl";
  if (n.includes("noodle") || n.includes("ramen")) return "noodles asian food";
  if (n.includes("lamb")) return "lamb dinner plate";
  if (n.includes("pork")) return "pork roast dinner";
  return name + " food dinner";
};

const EMOJI = (name) => {
  if (!name) return "🍽️";
  const n = name.toLowerCase();
  if (n.includes("pasta") || n.includes("spaghetti")) return "🍝";
  if (n.includes("chicken")) return "🍗";
  if (n.includes("salad")) return "🥗";
  if (n.includes("soup") || n.includes("stew")) return "🍲";
  if (n.includes("fish") || n.includes("salmon")) return "🐟";
  if (n.includes("rice") || n.includes("risotto")) return "🍚";
  if (n.includes("burger")) return "🍔";
  if (n.includes("pizza")) return "🍕";
  if (n.includes("steak") || n.includes("beef")) return "🥩";
  if (n.includes("taco") || n.includes("burrito")) return "🌮";
  if (n.includes("curry") || n.includes("masala")) return "🍛";
  if (n.includes("noodle") || n.includes("ramen")) return "🍜";
  if (n.includes("lamb") || n.includes("pork")) return "🍖";
  return "🍽️";
};

const NUTRITION = (name) => {
  if (!name) return { cal: 480, protein: 28, carbs: 45, fat: 18 };
  const n = name.toLowerCase();
  if (n.includes("salad")) return { cal: 320, protein: 18, carbs: 22, fat: 14 };
  if (n.includes("pasta")) return { cal: 560, protein: 22, carbs: 72, fat: 16 };
  if (n.includes("chicken")) return { cal: 420, protein: 42, carbs: 28, fat: 14 };
  if (n.includes("steak") || n.includes("beef")) return { cal: 620, protein: 48, carbs: 12, fat: 32 };
  if (n.includes("fish") || n.includes("salmon")) return { cal: 380, protein: 38, carbs: 18, fat: 16 };
  if (n.includes("curry")) return { cal: 520, protein: 28, carbs: 48, fat: 22 };
  if (n.includes("soup") || n.includes("stew")) return { cal: 360, protein: 24, carbs: 32, fat: 14 };
  if (n.includes("burger")) return { cal: 680, protein: 38, carbs: 52, fat: 34 };
  if (n.includes("pizza")) return { cal: 580, protein: 26, carbs: 64, fat: 24 };
  if (n.includes("taco") || n.includes("burrito")) return { cal: 540, protein: 30, carbs: 56, fat: 20 };
  if (n.includes("rice") || n.includes("risotto")) return { cal: 480, protein: 18, carbs: 68, fat: 14 };
  if (n.includes("noodle") || n.includes("ramen")) return { cal: 520, protein: 22, carbs: 62, fat: 18 };
  return { cal: 480, protein: 28, carbs: 45, fat: 18 };
};

const imgCache = {};
function useMealImage(name) {
  const [url, setUrl] = useState(imgCache[name] || null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!name || url || failed || imgCache[name]) return;
    fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(MEAL_QUERY(name))}&per_page=1&orientation=landscape`, {
      headers: { Authorization: "FPalvRHODlwPpVAMgaGcGhYQkyGPGcovXNQwKxOlznUiHZgDjKkmBhZg" }
    }).then(r => r.json()).then(d => {
      const photo = d?.photos?.[0]?.src?.large || d?.photos?.[0]?.src?.medium;
      if (photo) { imgCache[name] = photo; setUrl(photo); }
      else setFailed(true);
    }).catch(() => setFailed(true));
  }, [name]);
  return { url: imgCache[name] || url, failed };
}

// ─── Components ──────────────────────────────────────────────────────────────
function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill={C.clay} />
      <ellipse cx="20" cy="24" rx="10" ry="4.5" fill="rgba(255,255,255,0.18)" />
      <path d="M10 22 Q10 31 20 31 Q30 31 30 22" fill="rgba(255,255,255,0.92)" />
      <path d="M15.5 18 Q14.5 15 15.5 12" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 17 Q19 14 20 11" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24.5 18 Q23.5 15 24.5 12" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function NutritionChip({ label, value, color }) {
  return (
    <div style={{ flex: 1, background: C.bg, borderRadius: 12, padding: "10px 6px", textAlign: "center", border: `1px solid ${C.border}` }}>
      <p style={{ fontSize: 15, fontWeight: 800, color: color || C.walnut, margin: "0 0 2px" }}>{value}</p>
      <p style={{ fontSize: 10, color: C.muted, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
    </div>
  );
}

function MealCard({ meal, onSwap, onMarkTried, triedMeals = [] }) {
  const [open, setOpen] = useState(false);
  const { url, failed } = useMealImage(meal?.name);
  const nutrition = NUTRITION(meal?.name);
  const emoji = EMOJI(meal?.name);
  const tried = triedMeals.includes(meal?.day);

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 14, background: C.white, border: `1px solid ${C.border}`, boxShadow: open ? "0 12px 40px rgba(44,24,16,0.14)" : "0 2px 8px rgba(44,24,16,0.06)", transition: "box-shadow 0.25s" }}>
      <div style={{ position: "relative", height: open ? 220 : 140, overflow: "hidden", cursor: "pointer" }} onClick={() => setOpen(!open)}>
        {url && !failed
          ? <img src={url} alt={meal?.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={() => {}} />
          : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${C.clayLight},${C.sageLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: open ? 64 : 48 }}>{emoji}</div>
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(44,24,16,0.82) 0%,rgba(44,24,16,0.2) 50%,transparent 100%)" }} />
        <div style={{ position: "absolute", top: 12, left: 14, display: "flex", gap: 6 }}>
          <span style={{ background: C.clay, color: C.white, fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.08em" }}>{meal?.day}</span>
          {tried && <span style={{ background: C.sage, color: C.white, fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>✓ Cooked</span>}
        </div>
        <button onClick={e => { e.stopPropagation(); onSwap && onSwap(meal); }} style={{ position: "absolute", top: 10, right: 12, background: "rgba(255,255,255,0.18)", color: C.white, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Swap ↺</button>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 16px" }}>
          <p style={{ color: C.white, fontWeight: 800, fontSize: 17, margin: "0 0 3px", lineHeight: 1.2 }}>{meal?.name}</p>
          <div style={{ display: "flex", gap: 10 }}>
            {meal?.prepTime && <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>⏱ {meal.prepTime}</span>}
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>🔥 {nutrition.cal} cal</span>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ padding: "18px 18px 20px" }}>
          {meal?.description && <p style={{ fontSize: 14, color: C.muted, margin: "0 0 16px", lineHeight: 1.65, fontStyle: "italic" }}>"{meal.description}"</p>}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <NutritionChip label="Calories" value={nutrition.cal} color={C.clay} />
            <NutritionChip label="Protein" value={`${nutrition.protein}g`} color={C.sage} />
            <NutritionChip label="Carbs" value={`${nutrition.carbs}g`} color={C.clayMid} />
            <NutritionChip label="Fat" value={`${nutrition.fat}g`} color={C.muted} />
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, color: C.clay, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.1em" }}>How to make it</p>
          {meal?.steps?.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 13, alignItems: "flex-start" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 0 ? C.clay : C.clayLight, color: i === 0 ? C.white : C.clay, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
              <p style={{ fontSize: 14, color: C.walnut, margin: 0, lineHeight: 1.65 }}>{step}</p>
            </div>
          ))}
          {!tried && (
            <button onClick={() => onMarkTried && onMarkTried(meal?.day)} style={{ width: "100%", padding: "11px 0", marginTop: 8, background: C.sageLight, color: C.sage, border: `1.5px solid ${C.sageMid}`, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✓ Mark as cooked</button>
          )}
        </div>
      )}
    </div>
  );
}

function ShoppingList({ days }) {
  const cats = { "🥩 Proteins": [], "🥦 Vegetables & Herbs": [], "🌾 Grains & Pasta": [], "🧀 Dairy": [], "🧴 Pantry": ["Olive oil", "Salt & pepper", "Mixed herbs", "Stock cubes"] };
  const proteins = ["chicken","beef","salmon","fish","lamb","pork","shrimp","tuna","turkey","tofu"];
  const veggies = ["tomato","spinach","pepper","broccoli","carrot","onion","garlic","lettuce","mushroom","lemon","basil","parsley","ginger"];
  const grains = ["pasta","rice","noodle","bread","tortilla","quinoa","couscous","lentil","bean"];
  const dairy = ["cheese","butter","milk","cream","yogurt","parmesan","mozzarella"];

  days?.forEach(meal => {
    const n = meal.name.toLowerCase();
    proteins.forEach(p => { if (n.includes(p) && !cats["🥩 Proteins"].some(i => i.toLowerCase().includes(p))) cats["🥩 Proteins"].push(p.charAt(0).toUpperCase() + p.slice(1)); });
    veggies.forEach(v => { if (n.includes(v) && !cats["🥦 Vegetables & Herbs"].some(i => i.toLowerCase().includes(v))) cats["🥦 Vegetables & Herbs"].push(v.charAt(0).toUpperCase() + v.slice(1)); });
    grains.forEach(g => { if (n.includes(g) && !cats["🌾 Grains & Pasta"].some(i => i.toLowerCase().includes(g))) cats["🌾 Grains & Pasta"].push(g.charAt(0).toUpperCase() + g.slice(1)); });
    dairy.forEach(d => { if (n.includes(d) && !cats["🧀 Dairy"].some(i => i.toLowerCase().includes(d))) cats["🧀 Dairy"].push(d.charAt(0).toUpperCase() + d.slice(1)); });
  });

  if (!cats["🥩 Proteins"].length) cats["🥩 Proteins"] = days?.slice(0,3).map(d => d.name.split(" ")[0]) || ["Protein"];
  if (!cats["🥦 Vegetables & Herbs"].length) cats["🥦 Vegetables & Herbs"] = ["Mixed salad leaves","Cherry tomatoes","Fresh herbs","Garlic","Onions"];
  if (!cats["🌾 Grains & Pasta"].length) cats["🌾 Grains & Pasta"] = ["Rice","Pasta"];
  if (!cats["🧀 Dairy"].length) cats["🧀 Dairy"] = ["Butter","Parmesan"];

  const [checked, setChecked] = useState({});
  const toggle = key => setChecked(p => ({ ...p, [key]: !p[key] }));
  const total = Object.values(cats).flat().length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: C.walnut, margin: 0 }}>Shopping progress</p>
          <span style={{ fontSize: 13, color: C.clay, fontWeight: 700 }}>{done}/{total}</span>
        </div>
        <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${total > 0 ? (done/total)*100 : 0}%`, background: C.clay, borderRadius: 4, transition: "width 0.3s" }} />
        </div>
      </div>
      {Object.entries(cats).filter(([,items]) => items.length > 0).map(([cat, items]) => (
        <div key={cat} style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "14px 18px", marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: C.walnut, margin: "0 0 12px" }}>{cat}</p>
          {items.map((item, i) => {
            const key = cat+item;
            return (
              <div key={i} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked[key] ? C.clay : C.border}`, background: checked[key] ? C.clay : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                  {checked[key] && <span style={{ color: C.white, fontSize: 12, fontWeight: 800 }}>✓</span>}
                </div>
                <p style={{ fontSize: 14, color: checked[key] ? C.muted : C.walnut, margin: 0, textDecoration: checked[key] ? "line-through" : "none", transition: "all 0.15s" }}>{item}</p>
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: "12px 16px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#92400E", margin: "0 0 4px" }}>🗄 Check your cupboards first</p>
        <p style={{ fontSize: 12, color: "#92400E", margin: 0 }}>Salt, pepper, olive oil, garlic — you likely already have these.</p>
      </div>
    </div>
  );
}

// ─── Main app ────────────────────────────────────────────────────────────────
export default function Nourishly() {
  const [screen, setScreen] = useState("welcome");
  const [tab, setTab] = useState("home");
  const [authMode, setAuthMode] = useState("signup");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [session, setSession] = useState(() => { try { return JSON.parse(localStorage.getItem("nourishly_session") || "null"); } catch { return null; } });
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ familySize: "", allergies: "", cookTime: "" });
  const [mealPlan, setMealPlan] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [triedMeals, setTriedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");
  const [swappingMeal, setSwappingMeal] = useState(null);

  useEffect(() => {
    if (session?.access_token) {
      setScreen("app");
      loadProfile(session.access_token, session.user.id);
    }
  }, []);

  const saveSession = (s) => {
    setSession(s);
    try { localStorage.setItem("nourishly_session", JSON.stringify(s)); } catch {}
  };

  const loadProfile = async (token, userId) => {
    try {
      const profiles = await (await sb.from("profiles", token)).select(`id=eq.${userId}&limit=1`);
      if (Array.isArray(profiles) && profiles[0]) {
        const p = profiles[0];
        setProfile(p);
        setForm({ familySize: p.family_size || "", allergies: p.allergies || "", cookTime: p.cook_time || "" });
      }
      const plans = await (await sb.from("meal_plans", token)).select(`user_id=eq.${userId}&limit=10`);
      if (Array.isArray(plans)) setSavedPlans(plans);
    } catch {}
  };

  const handleAuth = async () => {
    if (!authForm.email || !authForm.password) { setError("Please fill in all fields."); return; }
    if (authMode === "signup" && !authForm.name) { setError("Please enter your name."); return; }
    setAuthLoading(true); setError("");
    try {
      let data;
      if (authMode === "signup") {
        data = await sb.signUp(authForm.email, authForm.password);
        if (data.error) throw new Error(data.error.message || data.msg || "Sign up failed");
        if (data.access_token) {
          saveSession(data);
          // Create profile
          await (await sb.from("profiles", data.access_token)).upsert({
            id: data.user.id, name: authForm.name, email: authForm.email,
            subscription_status: "free", generations_used_this_month: 0, streak_weeks: 0
          });
          setProfile({ name: authForm.name, email: authForm.email, streak_weeks: 0, generations_used_this_month: 0 });
          setScreen("app");
        } else {
          setError("Account created! Please check your email to confirm, then sign in.");
          setAuthMode("login");
        }
      } else {
        data = await sb.signIn(authForm.email, authForm.password);
        if (data.error) throw new Error(data.error.message || data.msg || "Sign in failed");
        saveSession(data);
        setScreen("app");
        loadProfile(data.access_token, data.user.id);
      }
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally { setAuthLoading(false); }
  };

  const handleGenerate = async () => {
    if (!form.familySize || !form.cookTime) { setError("Please fill in family size and cook time."); return; }
    setError(""); setLoading(true);
    const token = session?.access_token;
    const userId = session?.user?.id;
    const userName = profile?.name || session?.user?.email?.split("@")[0] || "your family";

    if (token && userId) {
      try {
        await (await sb.from("profiles", token)).update(
          { family_size: parseInt(form.familySize), allergies: form.allergies, cook_time: form.cookTime },
          `id=eq.${userId}`
        );
      } catch {}
    }

    const prompt = `You are a friendly expert meal planning assistant with a background in nutrition. Generate a full Monday to Sunday dinner plan for ${userName}'s family of ${form.familySize}. Allergies: ${form.allergies || "none"}. Cook time per night: ${form.cookTime}.

Return ONLY valid JSON with no markdown or extra text. Keep each step under 15 words:
{"days":[{"day":"Monday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Tuesday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Wednesday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Thursday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Friday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Saturday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]},{"day":"Sunday","name":"Real Meal Name","description":"One warm enticing sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]}]}

Replace all placeholders with real varied family-friendly meals.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 4000, messages: [{ role: "user", content: prompt }] })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = (data?.content || []).filter(b => b.type === "text").map(b => b.text).join("");
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found");
      let raw = match[0];
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch {
        const opens = (raw.match(/\[/g)||[]).length - (raw.match(/\]/g)||[]).length;
        const braces = (raw.match(/\{/g)||[]).length - (raw.match(/\}/g)||[]).length;
        raw = raw.trimEnd().replace(/,\s*$/, "");
        for (let i = 0; i < opens; i++) raw += "]";
        for (let i = 0; i < braces; i++) raw += "}";
        parsed = JSON.parse(raw);
      }
      if (!parsed.days?.length) throw new Error("No days found");
      setMealPlan(parsed); setTriedMeals([]);

      if (token && userId) {
        try {
          const weekOf = new Date().toISOString().split("T")[0];
          const saved = await (await sb.from("meal_plans", token)).insert({ user_id: userId, days: parsed.days, week_of: weekOf });
          if (Array.isArray(saved) && saved[0]) setSavedPlans(prev => [saved[0], ...prev.slice(0, 9)]);
        } catch {}
      }
      setTab("plan");
    } catch (e) {
      setError(`Something went wrong: ${e.message}`);
    } finally { setLoading(false); }
  };

  const handleSwap = async (meal) => {
    setSwappingMeal(meal?.day);
    try {
      const prompt = `Suggest ONE alternative dinner meal (not ${meal?.name}) for a family of ${form.familySize || 4} with ${form.allergies || "no"} allergies that takes about ${form.cookTime || "30 minutes"} to cook. Return ONLY JSON: {"day":"${meal?.day}","name":"Meal Name","description":"One warm sentence.","prepTime":"X minutes","steps":["Step 1","Step 2","Step 3","Step 4"]}`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 600, messages: [{ role: "user", content: prompt }] })
      });
      const data = await res.json();
      const text = (data?.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("");
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const newMeal = JSON.parse(match[0]);
        setMealPlan(prev => ({ ...prev, days: prev.days.map(d => d.day === meal?.day ? newMeal : d) }));
      }
    } catch {}
    finally { setSwappingMeal(null); }
  };

  const handleMarkTried = async (day) => {
    const newTried = [...triedMeals, day];
    setTriedMeals(newTried);
    const token = session?.access_token;
    const userId = session?.user?.id;
    if (token && userId) {
      const meal = mealPlan?.days?.find(d => d.day === day);
      try { await (await sb.from("meals_tried", token)).insert({ user_id: userId, day, meal_name: meal?.name, rating: 5 }); } catch {}
    }
    if (newTried.length === 3) setTimeout(() => alert("🎉 You've cooked 3 Nourishly meals this week! You're building a great habit."), 300);
  };

  const handleLogout = () => {
    saveSession(null);
    setProfile(null); setMealPlan(null); setSavedPlans([]); setTriedMeals([]);
    setTab("home"); setScreen("welcome");
  };

  const totalNutrition = mealPlan?.days?.reduce((acc, meal) => {
    const n = NUTRITION(meal.name);
    return { cal: acc.cal+n.cal, protein: acc.protein+n.protein, carbs: acc.carbs+n.carbs, fat: acc.fat+n.fat };
  }, { cal:0, protein:0, carbs:0, fat:0 });

  const inputStyle = { width:"100%", boxSizing:"border-box", padding:"12px 14px", borderRadius:11, border:`1.5px solid ${C.border}`, fontSize:14, color:C.walnut, background:C.bg, outline:"none", fontFamily:"inherit" };
  const labelStyle = { display:"block", fontWeight:700, fontSize:11, color:C.walnut, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.07em" };
  const tabs = [{ id:"home",label:"Home",emoji:"🏠" },{ id:"plan",label:"This week",emoji:"📅" },{ id:"shopping",label:"Shopping",emoji:"🛒" },{ id:"saved",label:"Saved",emoji:"📋" }];

  // ── WELCOME ──
  if (screen === "welcome") return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <div style={{ background:`linear-gradient(160deg,${C.walnut} 0%,#5C2E1A 50%,${C.clay} 100%)`, padding:"56px 24px 96px", textAlign:"center" }}>
        <Logo size={72} />
        <h1 style={{ color:C.white, fontSize:36, fontWeight:900, margin:"18px 0 8px", letterSpacing:"-1px" }}>Nourishly</h1>
        <p style={{ color:"rgba(255,255,255,0.7)", fontSize:15, margin:"0 0 6px", maxWidth:260, marginLeft:"auto", marginRight:"auto" }}>Warm, personal meal planning — powered by AI</p>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, margin:0 }}>7 dinners sorted in under a minute</p>
      </div>
      <div style={{ maxWidth:420, margin:"-56px auto 0", padding:"0 20px 48px" }}>
        <div style={{ background:C.white, borderRadius:24, padding:"28px 24px", border:`1px solid ${C.border}`, boxShadow:"0 12px 48px rgba(44,24,16,0.14)" }}>
          <div style={{ display:"flex", background:C.bg, borderRadius:12, padding:4, marginBottom:24 }}>
            {[["signup","Create account"],["login","Sign in"]].map(([mode,label]) => (
              <button key={mode} onClick={() => { setAuthMode(mode); setError(""); }} style={{ flex:1, padding:"9px 0", borderRadius:9, border:"none", cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"inherit", background:authMode===mode?C.white:"transparent", color:authMode===mode?C.walnut:C.muted, boxShadow:authMode===mode?"0 2px 8px rgba(44,24,16,0.1)":"none", transition:"all 0.15s" }}>{label}</button>
            ))}
          </div>
          {authMode==="signup" && (
            <div style={{ marginBottom:14 }}>
              <label style={labelStyle}>Your name</label>
              <input type="text" placeholder="e.g. Maria" value={authForm.name} onChange={e=>setAuthForm(f=>({...f,name:e.target.value}))} style={inputStyle} onFocus={e=>{e.target.style.borderColor=C.clay;e.target.style.background=C.white;}} onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.bg;}} />
            </div>
          )}
          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="you@email.com" value={authForm.email} onChange={e=>setAuthForm(f=>({...f,email:e.target.value}))} style={inputStyle} onFocus={e=>{e.target.style.borderColor=C.clay;e.target.style.background=C.white;}} onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.bg;}} />
          </div>
          <div style={{ marginBottom:22 }}>
            <label style={labelStyle}>Password</label>
            <input type="password" placeholder="••••••••" value={authForm.password} onChange={e=>setAuthForm(f=>({...f,password:e.target.value}))} style={inputStyle} onFocus={e=>{e.target.style.borderColor=C.clay;e.target.style.background=C.white;}} onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.bg;}} />
          </div>
          {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:16 }}><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>⚠️ {error}</p></div>}
          <button onClick={handleAuth} disabled={authLoading} style={{ width:"100%", padding:"14px 0", background:authLoading?C.muted:C.clay, color:C.white, border:"none", borderRadius:12, fontSize:15, fontWeight:800, cursor:authLoading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:"0 4px 16px rgba(196,98,45,0.4)" }}>
            {authLoading?"Please wait...":authMode==="signup"?"Start planning →":"Welcome back →"}
          </button>
          <p style={{ textAlign:"center", color:C.muted, fontSize:12, margin:"14px 0 0" }}>🔒 Your data stays private · No credit card needed</p>
        </div>
      </div>
    </div>
  );

  // ── MAIN APP ──
  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"system-ui,-apple-system,sans-serif" }}>
      <div style={{ background:`linear-gradient(135deg,${C.walnut} 0%,#5C2E1A 100%)`, padding:"18px 20px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Logo size={36} />
            <div>
              <h1 style={{ color:C.white, margin:0, fontSize:18, fontWeight:900 }}>Nourishly</h1>
              <p style={{ color:"rgba(255,255,255,0.55)", margin:0, fontSize:11 }}>Hey {profile?.name?.split(" ")[0] || "there"} 👋</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {profile?.streak_weeks > 0 && <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:8, padding:"5px 10px" }}><p style={{ color:C.white, fontSize:11, margin:0, fontWeight:600 }}>🔥 {profile.streak_weeks}w streak</p></div>}
            <button onClick={handleLogout} style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, padding:"6px 12px", fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>Log out</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:560, margin:"0 auto", padding:"16px 16px 90px", boxSizing:"border-box" }}>

        {/* HOME */}
        {tab==="home" && (
          <div>
            {savedPlans.length>0 && (
              <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                {[{label:"Plans",value:savedPlans.length,emoji:"📋"},{label:"Meals",value:savedPlans.length*7,emoji:"🍽️"},{label:"Family",value:form.familySize||"–",emoji:"👨‍👩‍👧"}].map((s,i)=>(
                  <div key={i} style={{ flex:1, background:C.white, borderRadius:14, border:`1px solid ${C.border}`, padding:"12px 8px", textAlign:"center" }}>
                    <p style={{ fontSize:18, margin:"0 0 4px" }}>{s.emoji}</p>
                    <p style={{ fontWeight:900, fontSize:18, color:C.walnut, margin:"0 0 2px" }}>{s.value}</p>
                    <p style={{ fontSize:10, color:C.muted, margin:0, textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            )}
            <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.border}`, padding:"22px 20px", marginBottom:16 }}>
              <p style={{ fontWeight:900, fontSize:20, color:C.walnut, margin:"0 0 4px", letterSpacing:"-0.4px" }}>Plan this week's dinners</p>
              <p style={{ fontSize:13, color:C.muted, margin:"0 0 20px" }}>Tell us about your family and Claude will build a full week of personalised meals.</p>
              {[{label:"How many people are eating?",name:"familySize",placeholder:"e.g. 4",type:"number"},{label:"Any allergies or restrictions?",name:"allergies",placeholder:"e.g. no nuts — or leave blank",type:"text"},{label:"How long can you cook on a weeknight?",name:"cookTime",placeholder:"e.g. 30 minutes",type:"text"}].map(field=>(
                <div key={field.name} style={{ marginBottom:14 }}>
                  <label style={labelStyle}>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.name]} onChange={e=>setForm(f=>({...f,[field.name]:e.target.value}))} style={inputStyle} onFocus={e=>{e.target.style.borderColor=C.clay;e.target.style.background=C.white;}} onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.bg;}} />
                </div>
              ))}
              {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 14px", marginBottom:14 }}><p style={{ color:"#DC2626", fontSize:13, margin:0 }}>⚠️ {error}</p></div>}
              <button onClick={handleGenerate} disabled={loading} style={{ width:"100%", padding:"14px 0", background:loading?C.muted:C.clay, color:C.white, border:"none", borderRadius:12, fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:loading?"none":"0 4px 16px rgba(196,98,45,0.38)", transition:"all 0.2s" }}>
                {loading?"⏳ Building your plan...":"Build my meal plan →"}
              </button>
              <p style={{ textAlign:"center", color:C.muted, fontSize:12, margin:"12px 0 0" }}>🔒 Powered by Claude AI · Saved to your account</p>
            </div>
            {savedPlans.length>0 && (
              <div>
                <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 10px" }}>Recent plans</p>
                {savedPlans.slice(0,3).map((plan,i)=>(
                  <div key={i} onClick={()=>{ setMealPlan({days:plan.days}); setTriedMeals([]); setTab("plan"); }} style={{ background:C.white, borderRadius:14, border:`1px solid ${C.border}`, padding:"14px 16px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:C.clayLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🍽️</div>
                      <div>
                        <p style={{ fontWeight:700, fontSize:14, color:C.walnut, margin:"0 0 2px" }}>{profile?.name||"Your"}'s plan</p>
                        <p style={{ fontSize:12, color:C.muted, margin:0 }}>{new Date(plan.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p>
                      </div>
                    </div>
                    <span style={{ color:C.clay, fontSize:20, fontWeight:700 }}>›</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PLAN */}
        {tab==="plan" && (
          mealPlan ? (
            <div>
              <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:16 }}>
                <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 12px" }}>Weekly nutrition totals</p>
                <div style={{ display:"flex", gap:8 }}>
                  <NutritionChip label="Calories" value={totalNutrition?.cal} color={C.clay} />
                  <NutritionChip label="Protein" value={`${totalNutrition?.protein}g`} color={C.sage} />
                  <NutritionChip label="Carbs" value={`${totalNutrition?.carbs}g`} color={C.clayMid} />
                  <NutritionChip label="Fat" value={`${totalNutrition?.fat}g`} color={C.muted} />
                </div>
              </div>
              <p style={{ fontSize:12, color:C.muted, margin:"0 0 14px", textAlign:"center" }}>Tap to expand · Swap a meal · Mark as cooked when done</p>
              {mealPlan.days?.map(meal=>(
                <div key={meal.day} style={{ position:"relative" }}>
                  {swappingMeal===meal.day && <div style={{ position:"absolute", inset:0, background:"rgba(250,246,240,0.85)", borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}><p style={{ color:C.clay, fontWeight:700, fontSize:14 }}>Finding alternative...</p></div>}
                  <MealCard meal={meal} onSwap={handleSwap} onMarkTried={handleMarkTried} triedMeals={triedMeals} />
                </div>
              ))}
              <button onClick={()=>{ setMealPlan(null); setTab("home"); }} style={{ width:"100%", padding:"13px 0", marginTop:8, background:"none", color:C.clay, border:`2px solid ${C.clay}`, borderRadius:12, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>← Generate a new plan</button>
            </div>
          ) : (
            <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.border}`, padding:"48px 24px", textAlign:"center" }}>
              <p style={{ fontSize:48, margin:"0 0 16px" }}>🍽️</p>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>No meal plan yet</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 20px" }}>Head to Home and build your first week of dinners.</p>
              <button onClick={()=>setTab("home")} style={{ padding:"12px 28px", background:C.clay, color:C.white, border:"none", borderRadius:11, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Go to Home</button>
            </div>
          )
        )}

        {/* SHOPPING */}
        {tab==="shopping" && (
          mealPlan ? <ShoppingList days={mealPlan.days} /> : (
            <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.border}`, padding:"48px 24px", textAlign:"center" }}>
              <p style={{ fontSize:48, margin:"0 0 16px" }}>🛒</p>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>No shopping list yet</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 20px" }}>Generate a meal plan and your shopping list appears here.</p>
              <button onClick={()=>setTab("home")} style={{ padding:"12px 28px", background:C.clay, color:C.white, border:"none", borderRadius:11, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Build a plan</button>
            </div>
          )
        )}

        {/* SAVED */}
        {tab==="saved" && (
          savedPlans.length>0 ? (
            <div>
              <p style={{ fontWeight:800, fontSize:12, color:C.muted, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 12px" }}>{savedPlans.length} saved {savedPlans.length===1?"plan":"plans"}</p>
              {savedPlans.map((plan,i)=>(
                <div key={i} style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, padding:"16px 18px", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
                    <div>
                      <p style={{ fontWeight:800, fontSize:15, color:C.walnut, margin:"0 0 3px" }}>{profile?.name||"Your"}'s meal plan</p>
                      <p style={{ fontSize:12, color:C.muted, margin:0 }}>{new Date(plan.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</p>
                    </div>
                    <button onClick={()=>{ setMealPlan({days:plan.days}); setTriedMeals([]); setTab("plan"); }} style={{ background:C.clayLight, color:C.clay, border:"none", borderRadius:9, padding:"7px 14px", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>View →</button>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {plan.days?.slice(0,5).map((d,j)=>(
                      <span key={j} style={{ background:C.bg, color:C.muted, fontSize:11, padding:"3px 9px", borderRadius:20, border:`1px solid ${C.border}` }}>{d.name}</span>
                    ))}
                    {plan.days?.length>5 && <span style={{ color:C.muted, fontSize:11, padding:"3px 0" }}>+{plan.days.length-5} more</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.border}`, padding:"48px 24px", textAlign:"center" }}>
              <p style={{ fontSize:48, margin:"0 0 16px" }}>📋</p>
              <p style={{ fontWeight:800, fontSize:17, color:C.walnut, margin:"0 0 8px" }}>No saved plans yet</p>
              <p style={{ fontSize:14, color:C.muted, margin:"0 0 20px" }}>Your plans save automatically every time you generate one.</p>
              <button onClick={()=>setTab("home")} style={{ padding:"12px 28px", background:C.clay, color:C.white, border:"none", borderRadius:11, fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Create first plan</button>
            </div>
          )
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:C.white, borderTop:`1px solid ${C.border}`, display:"flex", padding:"10px 0 14px", zIndex:100, boxShadow:"0 -4px 20px rgba(44,24,16,0.08)" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"2px 0", fontFamily:"inherit" }}>
            <span style={{ fontSize:20 }}>{t.emoji}</span>
            <span style={{ fontSize:10, fontWeight:tab===t.id?800:500, color:tab===t.id?C.clay:C.muted }}>{t.label}</span>
            {tab===t.id && <div style={{ width:20, height:3, background:C.clay, borderRadius:2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
