import { TopicLayout } from "../components/TopicLayout";
import { useSiteContent } from "../content/useSiteContent";

export function BusinessPage() {
  const b = useSiteContent().business;
  return <TopicLayout pageTitle={b.pageTitle} lead={b.lead} paragraphs={b.paragraphs} />;
}
