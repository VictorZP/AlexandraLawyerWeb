type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
};

export function AdminTextField({ label, value, onChange, hint }: Props) {
  return (
    <label className="admin-field">
      <span className="admin-field__label">{label}</span>
      {hint ? <span className="admin-field__hint">{hint}</span> : null}
      <input className="admin-field__input" type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
