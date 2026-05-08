import { useSyncExternalStore } from "react";
import { defaultSiteContent } from "./defaultSiteContent";
import { getSiteContentSnapshot, subscribeSiteContent } from "./runtimeSiteContent";
import type { SiteContent } from "./types";

export function useSiteContent(): SiteContent {
  return useSyncExternalStore(
    subscribeSiteContent,
    getSiteContentSnapshot,
    () => defaultSiteContent,
  );
}
