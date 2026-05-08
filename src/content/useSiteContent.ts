import { useSyncExternalStore } from "react";
import { defaultSiteContent } from "./defaultSiteContent";
import { siteContentFr } from "./defaultSiteContent.fr";
import { getSiteContentSnapshot, subscribeSiteContent } from "./runtimeSiteContent";
import type { SiteContent } from "./types";
import { getStoredLocale } from "../i18n/localeStorage";

function serverSnapshot(): SiteContent {
  return getStoredLocale() === "fr" ? siteContentFr : defaultSiteContent;
}

export function useSiteContent(): SiteContent {
  return useSyncExternalStore(subscribeSiteContent, getSiteContentSnapshot, serverSnapshot);
}
