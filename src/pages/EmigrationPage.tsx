import { TopicLayout } from "../components/TopicLayout";
import { useSiteContent } from "../content/useSiteContent";

export function EmigrationPage() {
  const b = useSiteContent().emigration;
  return <TopicLayout pageTitle={b.pageTitle} lead={b.lead} paragraphs={b.paragraphs} />;
}
