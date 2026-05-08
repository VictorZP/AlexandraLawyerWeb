import { useId, useState } from "react";
import type { MediaRef } from "../../content/types";
import { MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, readUploadAsDataUrl } from "../utils/readUploadAsDataUrl";

type Props = {
  label: string;
  value: MediaRef | null;
  onChange: (next: MediaRef | null) => void;
  kind: "image" | "video";
  hint?: string;
};

export function AdminMediaField({ label, value, onChange, kind, hint }: Props) {
  const id = useId();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    setBusy(true);
    const max = kind === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    const res = await readUploadAsDataUrl(file, { maxBytes: max, kind });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    onChange({
      src: res.dataUrl,
      alt: value?.alt ?? file.name,
      caption: value?.caption ?? null,
    });
  };

  const clear = () => {
    setErr(null);
    onChange(null);
  };

  return (
    <div className="admin-field admin-field--media">
      <span className="admin-field__label">{label}</span>
      {hint ? <span className="admin-field__hint">{hint}</span> : null}
      <div className="admin-media-row">
        <input
          id={id}
          type="file"
          className="admin-media-file visually-hidden"
          accept={kind === "image" ? "image/*" : "video/*"}
          onChange={onPick}
          disabled={busy}
        />
        <label htmlFor={id} className="admin-btn admin-btn--small">
          {busy ? "Загрузка…" : "Выбрать файл"}
        </label>
        {value?.src ? (
          <button type="button" className="admin-btn admin-btn--small admin-btn--ghost" onClick={clear}>
            Убрать
          </button>
        ) : null}
      </div>
      {err ? <p className="admin-field__error">{err}</p> : null}
      {value?.src ? (
        <div className="admin-media-preview">
          {kind === "image" ? (
            <img src={value.src} alt="" className="admin-media-preview__img" />
          ) : (
            <video src={value.src} className="admin-media-preview__video" muted controls playsInline />
          )}
          <label className="admin-field admin-field--inline">
            <span className="admin-field__label">Подпись (alt)</span>
            <input
              className="admin-field__input"
              type="text"
              value={value.alt}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
