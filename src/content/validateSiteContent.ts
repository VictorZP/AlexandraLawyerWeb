import type { SiteContent } from "./types";

/** Минимальная проверка структуры перед сохранением из JSON. */
export function isValidSiteContent(x: unknown): x is SiteContent {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (typeof o.adminMediaGuidance !== "string") return false;
  if (!o.home || typeof o.home !== "object") return false;
  for (const key of ["emigration", "business", "talentPassport", "laws"] as const) {
    if (!o[key] || typeof o[key] !== "object") return false;
  }
  const assoc = o.associations;
  if (!assoc || typeof assoc !== "object") return false;
  const a = assoc as Record<string, unknown>;
  if (typeof a.pageTitle !== "string") return false;
  if (!Array.isArray(a.items) || !Array.isArray(a.details)) return false;
  return true;
}
