export type TopicLayoutProps = {
  pageTitle: string;
  lead: string;
  paragraphs: string[];
};

export function TopicLayout({ pageTitle, lead, paragraphs }: TopicLayoutProps) {
  return (
    <>
      <h1 className="page-title">{pageTitle}</h1>
      <p className="page-lead">{lead}</p>
      <div className="panel topic-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}
