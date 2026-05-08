import { TopicLayout } from "../components/TopicLayout";
import { getSiteContent } from "../content/defaultSiteContent";

export function EmigrationPage() {
  const { emigration } = getSiteContent();
  return <TopicLayout {...emigration} />;
}
