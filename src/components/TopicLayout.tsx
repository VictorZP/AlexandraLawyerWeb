export type TopicLayoutProps = {
  pageTitle: string;
  lead: string;
  paragraphs: string[];
};

export function TopicLayout({ pageTitle, lead, paragraphs }: TopicLayoutProps) {
  return (
    <div className="topic-page">
      <header className="panel glass topic-page__header">
        <h1 className="page-title">{pageTitle}</h1>
        <p className="page-lead topic-page__lead">{lead}</p>
      </header>
      <div className="panel glass topic-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
