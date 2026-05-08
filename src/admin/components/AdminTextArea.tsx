type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
};

export function AdminTextArea({ label, value, onChange, rows = 4, hint }: Props) {
  return (
    <label className="admin-field">
      <span className="admin-field__label">{label}</span>
      {hint ? <span className="admin-field__hint">{hint}</span> : null}
      <textarea
        className="admin-field__textarea"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
