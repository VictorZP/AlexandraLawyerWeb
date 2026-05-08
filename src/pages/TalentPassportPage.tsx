import { TopicLayout } from "../components/TopicLayout";
import { getSiteContent } from "../content/defaultSiteContent";

export function TalentPassportPage() {
  const { talentPassport } = getSiteContent();
  return <TopicLayout {...talentPassport} />;
}
