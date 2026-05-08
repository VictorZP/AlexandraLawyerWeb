import { TopicLayout } from "../components/TopicLayout";
import { getSiteContent } from "../content/defaultSiteContent";

export function LawsPage() {
  const { laws } = getSiteContent();
  return <TopicLayout {...laws} />;
}
