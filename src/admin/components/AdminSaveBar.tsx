type Props = {
  message: string | null;
  error: string | null;
  onSave: () => void;
  disabled?: boolean;
};

export function AdminSaveBar({ message, error, onSave, disabled }: Props) {
  return (
    <div className="admin-save-bar glass">
      <button type="button" className="admin-btn admin-btn--primary" onClick={onSave} disabled={disabled}>
        Сохранить изменения раздела
      </button>
      {message ? <span className="admin-save-bar__ok">{message}</span> : null}
      {error ? <span className="admin-save-bar__err">{error}</span> : null}
    </div>
  );
}
