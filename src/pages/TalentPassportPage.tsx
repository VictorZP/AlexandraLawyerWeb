import { TopicLayout } from "../components/TopicLayout";
import { useSiteContent } from "../content/useSiteContent";

export function TalentPassportPage() {
  const b = useSiteContent().talentPassport;
  return <TopicLayout pageTitle={b.pageTitle} lead={b.lead} paragraphs={b.paragraphs} />;
}
