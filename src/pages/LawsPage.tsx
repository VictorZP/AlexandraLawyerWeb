import { TopicLayout } from "../components/TopicLayout";
import { useSiteContent } from "../content/useSiteContent";

export function LawsPage() {
  const b = useSiteContent().laws;
  return <TopicLayout pageTitle={b.pageTitle} lead={b.lead} paragraphs={b.paragraphs} />;
}
