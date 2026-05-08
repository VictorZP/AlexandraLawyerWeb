import { AdminTextArea } from "./AdminTextArea";

type Props = {
  paragraphs: string[];
  onChange: (next: string[]) => void;
  /** По умолчанию: «Текстовые абзацы» */
  legend?: string;
};

export function AdminParagraphsEditor({ paragraphs, onChange, legend = "Текстовые абзацы" }: Props) {
  return (
    <fieldset className="admin-fieldset">
      <legend className="admin-fieldset__legend">{legend}</legend>
      {paragraphs.map((p, i) => (
        <AdminTextArea
          key={i}
          label={`Абзац ${i + 1}`}
          value={p}
          onChange={(v) => {
            const next = [...paragraphs];
            next[i] = v;
            onChange(next);
          }}
          rows={5}
        />
      ))}
      <div className="admin-inline-actions">
        <button type="button" className="admin-btn admin-btn--small" onClick={() => onChange([...paragraphs, ""])}>
          + Добавить абзац
        </button>
        {paragraphs.length > 1 ? (
          <button
            type="button"
            className="admin-btn admin-btn--small admin-btn--ghost"
            onClick={() => onChange(paragraphs.slice(0, -1))}
          >
            Удалить последний абзац
          </button>
        ) : null}
      </div>
    </fieldset>
  );
}
