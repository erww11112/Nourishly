import { useState, useCallback, useMemo, useEffect } from "react";
import { LanguageContext, locales, LANG_STORAGE_KEY, RTL_LANGS, translate } from "./context";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return saved && locales[saved] ? saved : "en";
    } catch { return "en"; }
  });

  const setLang = useCallback((next) => {
    if (!locales[next]) return;
    setLangState(next);
    try { localStorage.setItem(LANG_STORAGE_KEY, next); } catch {}
  }, []);

  // Keep <html dir/lang> in sync so RTL languages flip layout direction and
  // the browser/assistive tech know what script is being read.
  useEffect(() => {
    document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  const value = useMemo(() => ({ lang, setLang, t, availableLangs: Object.keys(locales) }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
