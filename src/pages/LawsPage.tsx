import { TopicLayout } from "../components/TopicLayout";
import { getSiteContent } from "../content/defaultSiteContent";

export function LawsPage() {
  const b = getSiteContent().laws;
  return <TopicLayout pageTitle={b.pageTitle} lead={b.lead} paragraphs={b.paragraphs} />;
}
