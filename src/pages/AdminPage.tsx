import { useCallback, useRef, useState } from "react";
import { defaultSiteContent } from "../content/defaultSiteContent";
import {
  resetSiteContentInBrowser,
  setSiteContentInBrowser,
} from "../content/runtimeSiteContent";
import type { SiteContent } from "../content/types";
import { isValidSiteContent } from "../content/validateSiteContent";
import { useSiteContent } from "../content/useSiteContent";
import { clearAdminSession } from "../admin/adminSession";
import "../styles/admin.css";

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminPage() {
  const live = useSiteContent();
  const [jsonText, setJsonText] = useState(() => JSON.stringify(live, null, 2));
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const parseContent = useCallback((): SiteContent | null => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText) as unknown;
    } catch {
      setError("Невалидный JSON.");
      return null;
    }
    if (!isValidSiteContent(parsed)) {
      setError("Структура не совпадает с SiteContent (проверьте разделы и associations.details).");
      return null;
    }
    return parsed;
  }, [jsonText]);

  const onValidate = () => {
    setMessage(null);
    setError(null);
    const c = parseContent();
    if (c) setMessage("JSON корректен.");
  };

  const onSave = () => {
    setMessage(null);
    setError(null);
    const c = parseContent();
    if (!c) return;
    try {
      setSiteContentInBrowser(c);
      setMessage("Сохранено в браузере этого деплоя. Экспортируйте JSON и закоммитьте в репозиторий для постоянного обновления сайта.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  };

  const onExport = () => {
    setError(null);
    const c = parseContent();
    if (!c) return;
    downloadJson("site-content.json", c);
    setMessage("Файл скачан.");
  };

  const onResetBrowser = () => {
    setMessage(null);
    setError(null);
    resetSiteContentInBrowser();
    setJsonText(JSON.stringify(defaultSiteContent, null, 2));
    setMessage("Сброшено к встроенному контенту из кода (только черновик в браузере очищен).");
  };

  const onReloadFromLive = () => {
    setJsonText(JSON.stringify(live, null, 2));
    setMessage("Подставлен текущий контент из памяти/хранилища.");
    setError(null);
  };

  const onPickFile = () => fileRef.current?.click();

  const onFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setJsonText(text);
      setMessage("Файл загружен в редактор. Нажмите «Проверить» или «Сохранить в браузер».");
      setError(null);
    };
    reader.readAsText(file, "utf-8");
  };

  const onLogout = () => {
    clearAdminSession();
    window.location.reload();
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Управление контентом</h1>
          <p className="admin-status">
            Режим <code className="admin-code">VITE_SITE_MODE=admin</code>. Данные в{" "}
            <code className="admin-code">localStorage</code> на этом домене; публичная сборка их не читает.
          </p>
        </div>
        <div className="admin-page__actions">
          <button type="button" className="admin-btn" onClick={onLogout}>
            Выйти
          </button>
        </div>
      </header>

      <section className="admin-hint glass">
        <strong>Подсказка по медиа</strong> (для редакторов): {live.adminMediaGuidance}
      </section>

      <p className="admin-status" style={{ marginBottom: "1rem" }}>
        <strong>Как попасть на публичный сайт с правками:</strong> «Сохранить в браузер» держит черновик только на этом домене.
        Чтобы изменения появились на основном деплое, нажмите «Экспорт JSON» и перенесите поля в{" "}
        <code className="admin-code">src/content/defaultSiteContent.ts</code> (или подключите позже загрузку из файла/API).
      </p>

      {message ? <p className="admin-status">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}

      <textarea
        className="admin-textarea"
        spellCheck={false}
        value={jsonText}
        onChange={(ev) => setJsonText(ev.target.value)}
        aria-label="JSON контента сайта"
      />

      <div className="admin-page__actions" style={{ marginTop: "1rem" }}>
        <button type="button" className="admin-btn" onClick={onValidate}>
          Проверить
        </button>
        <button type="button" className="admin-btn admin-btn--primary" onClick={onSave}>
          Сохранить в браузер
        </button>
        <button type="button" className="admin-btn" onClick={onExport}>
          Экспорт JSON
        </button>
        <button type="button" className="admin-btn" onClick={onPickFile}>
          Импорт файла
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={onFile} />
        <button type="button" className="admin-btn" onClick={onReloadFromLive}>
          Подставить текущий
        </button>
        <button type="button" className="admin-btn admin-btn--danger" onClick={onResetBrowser}>
          Сбросить черновик
        </button>
      </div>
    </div>
  );
}
