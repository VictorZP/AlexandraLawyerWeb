import type { SiteContent } from "./types";

/** Минимальная проверка структуры перед сохранением из JSON. */
export function isValidSiteContent(x: unknown): x is SiteContent {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (typeof o.adminMediaGuidance !== "string") return false;
  if (!o.home || typeof o.home !== "object") return false;
  for (const key of ["emigration", "business", "talentPassport"] as const) {
    if (!o[key] || typeof o[key] !== "object") return false;
  }
  const laws = o.laws;
  if (!laws || typeof laws !== "object") return false;
  const L = laws as Record<string, unknown>;
  if (typeof L.pageTitle !== "string" || !Array.isArray(L.articles)) return false;
  for (const art of L.articles as unknown[]) {
    if (!art || typeof art !== "object") return false;
    const a = art as Record<string, unknown>;
    if (typeof a.id !== "string" || typeof a.title !== "string" || typeof a.sourceUrl !== "string") return false;
    if (typeof a.sortOrder !== "number" || !Array.isArray(a.facts)) return false;
    for (const f of a.facts as unknown[]) {
      if (typeof f !== "string") return false;
    }
  }
  const assoc = o.associations;
  if (!assoc || typeof assoc !== "object") return false;
  const a = assoc as Record<string, unknown>;
  if (typeof a.pageTitle !== "string") return false;
  if (!Array.isArray(a.items) || !Array.isArray(a.details)) return false;
  return true;
}
