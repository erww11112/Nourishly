import { createContext } from "react";
import { en } from "../locales/en";
import { pt } from "../locales/pt";
import { es } from "../locales/es";
import { zh } from "../locales/zh";
import { fr } from "../locales/fr";
import { de } from "../locales/de";

// Add a new language by importing its locale file and adding it here —
// nothing else in the app needs to change.
export const locales = { en, pt, es, zh, fr, de };
export const LANG_STORAGE_KEY = "nourishly_lang";

// Plain-English names for each language code, used only in prompts sent to
// Claude (so it knows what "pt" means) — never shown to the user directly.
export const LANGUAGE_NAMES = { en: "English", pt: "Portuguese", es: "Spanish", zh: "Mandarin Chinese", fr: "French", de: "German" };

function resolveKey(dict, key) {
  let node = dict;
  for (const part of key.split(".")) {
    node = node?.[part];
    if (node === undefined) return undefined;
  }
  return node;
}

// Looks up `key` (dot path, e.g. "profile.plansUsed") in the given locale's
// dictionary and interpolates `{var}` placeholders from `vars`. Falls back to
// the English string, then to the raw key, so a missing translation never
// renders blank.
export function translate(langCode, key, vars) {
  let value = resolveKey(locales[langCode] || locales.en, key);
  if (value === undefined) value = resolveKey(locales.en, key);
  if (typeof value !== "string") return value ?? key;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? vars[name] : `{${name}}`));
}

export const LanguageContext = createContext(null);
