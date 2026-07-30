import { useContext } from "react";
import { LanguageContext } from "./context";

function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT/useLang must be used within a LanguageProvider");
  return ctx;
}

export function useT() {
  return useLanguageContext().t;
}

export function useLang() {
  const { lang, setLang, availableLangs } = useLanguageContext();
  return { lang, setLang, availableLangs };
}
