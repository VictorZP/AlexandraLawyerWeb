import { useCallback, useRef, useState } from "react";
import { defaultSiteContent } from "../../content/defaultSiteContent";
import {
  resetSiteContentInBrowser,
  setSiteContentInBrowser,
} from "../../content/runtimeSiteContent";
import type { SiteContent } from "../../content/types";
import { isValidSiteContent } from "../../content/validateSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminSettingsPage() {
  const live = useSiteContent();
  const [guidance, setGuidance] = useState(live.adminMediaGuidance);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState(() => JSON.stringify(live, null, 2));
  const [showRaw, setShowRaw] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reloadFromLive = () => {
    setGuidance(live.adminMediaGuidance);
    setJsonText(JSON.stringify(live, null, 2));
    setMsg("Подставлен текущий сохранённый контент.");
    setErr(null);
  };

  const saveGuidance = () => {
    setErr(null);
    setMsg(null);
    try {
      setSiteContentInBrowser({ ...live, adminMediaGuidance: guidance });
      setMsg("Подсказка сохранена.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка");
    }
  };

  const parseJson = useCallback((): SiteContent | null => {
    try {
      const parsed = JSON.parse(jsonText) as unknown;
      if (!isValidSiteContent(parsed)) {
        setErr("Структура JSON не совпадает с SiteContent.");
        return null;
      }
      return parsed;
    } catch {
      setErr("Невалидный JSON.");
      return null;
    }
  }, [jsonText]);

  const applyJson = () => {
    setErr(null);
    setMsg(null);
    const c = parseJson();
    if (!c) return;
    setSiteContentInBrowser(c);
    setGuidance(c.adminMediaGuidance);
    setMsg("Весь контент из JSON применён.");
  };

  const exportJson = () => {
    setErr(null);
    downloadJson("site-content.json", live);
    setMsg("Файл экспортирован.");
  };

  const resetDraft = () => {
    setErr(null);
    resetSiteContentInBrowser();
    const fresh = defaultSiteContent;
    setJsonText(JSON.stringify(fresh, null, 2));
    setGuidance(fresh.adminMediaGuidance);
    setMsg("Черновик сброшен к встроенному контенту из репозитория.");
  };

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Подсказки и резерв</h1>
      <p className="admin-inline-actions">
        <button type="button" className="admin-btn admin-btn--small" onClick={reloadFromLive}>
          Подтянуть текущий контент в форму
        </button>
      </p>
      <p className="admin-doc__lead">
        Текст подсказки по медиа показывается в публичной сборке (dev) и может выводиться в вашей внешней CMS. Ниже — резервный
        импорт/экспорт всего JSON для разработчика.
      </p>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Подсказка по фото и видео</h2>
        <AdminTextArea label="Текст для редакторов" value={guidance} onChange={setGuidance} rows={10} />
        <AdminSaveBar message={msg} error={err} onSave={saveGuidance} />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Резерв: весь контент (JSON)</h2>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setShowRaw((s) => !s)}>
          {showRaw ? "Скрыть JSON" : "Показать JSON"}
        </button>
        {showRaw ? (
          <>
            <textarea className="admin-textarea admin-textarea--json" spellCheck={false} value={jsonText} onChange={(e) => setJsonText(e.target.value)} rows={18} />
            <div className="admin-inline-actions" style={{ marginTop: "0.75rem" }}>
              <button type="button" className="admin-btn admin-btn--primary" onClick={applyJson}>
                Применить JSON целиком
              </button>
              <button type="button" className="admin-btn" onClick={exportJson}>
                Экспорт JSON
              </button>
              <button type="button" className="admin-btn" onClick={() => fileRef.current?.click()}>
                Импорт JSON файла
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={(ev) => {
                  const f = ev.target.files?.[0];
                  ev.target.value = "";
                  if (!f) return;
                  const r = new FileReader();
                  r.onload = () => {
                    if (typeof r.result === "string") {
                      setJsonText(r.result);
                      setMsg("JSON загружен в поле. Проверьте и нажмите «Применить».");
                      setErr(null);
                    }
                  };
                  r.readAsText(f, "utf-8");
                }}
              />
              <button type="button" className="admin-btn admin-btn--danger" onClick={resetDraft}>
                Сбросить черновик
              </button>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
