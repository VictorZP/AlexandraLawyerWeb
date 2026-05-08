import { TopicLayout } from "../components/TopicLayout";
import { getSiteContent } from "../content/defaultSiteContent";

export function BusinessPage() {
  const { business } = getSiteContent();
  return <TopicLayout {...business} />;
}
