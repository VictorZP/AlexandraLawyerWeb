import { useEffect, useState } from "react";
import type { HomeBlock, HomeSectionTile, SiteContent } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminMediaField } from "../components/AdminMediaField";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";
import { AdminTextField } from "../components/AdminTextField";

function emptyMedia(): HomeBlock["illustration"] {
  return { src: null, alt: "", caption: null };
}

export function AdminHomeEditor() {
  const root = useSiteContent();
  const [home, setHome] = useState(() => structuredClone(root.home));
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setHome(structuredClone(root.home));
  }, [root.home]);

  const save = () => {
    setErr(null);
    setMsg(null);
    try {
      const next: SiteContent = { ...root, home };
      setSiteContentInBrowser(next);
      setMsg("Сохранено в браузере.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  };

  const updateTile = (index: number, patch: Partial<HomeSectionTile>) => {
    const tiles = [...home.sectionTiles];
    tiles[index] = { ...tiles[index], ...patch };
    setHome({ ...home, sectionTiles: tiles });
  };

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Главная страница</h1>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Фон страницы</h2>
        <AdminMediaField
          label="Фото фона"
          kind="image"
          value={home.pageBackground}
          onChange={(v) => setHome({ ...home, pageBackground: v })}
          hint="JPEG / PNG / WebP с устройства."
        />
        <AdminMediaField
          label="Видео фона (необязательно)"
          kind="video"
          value={home.pageBackgroundVideo}
          onChange={(v) => setHome({ ...home, pageBackgroundVideo: v })}
        />
        <AdminMediaField
          label="Постер для видео"
          kind="image"
          value={home.pageBackgroundVideoPoster}
          onChange={(v) => setHome({ ...home, pageBackgroundVideoPoster: v })}
        />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Герой</h2>
        <AdminTextField
          label="Заголовок (основная строка)"
          value={home.headlineMain}
          onChange={(v) => setHome({ ...home, headlineMain: v })}
        />
        <AdminTextField
          label="Акцентная строка (курсив)"
          value={home.headlineAccent ?? ""}
          onChange={(v) => setHome({ ...home, headlineAccent: v.trim() ? v : null })}
        />
        <AdminTextArea label="Лид" value={home.lead} onChange={(v) => setHome({ ...home, lead: v })} rows={5} />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Панель справа</h2>
        <AdminTextField label="Заголовок панели" value={home.panelTitle} onChange={(v) => setHome({ ...home, panelTitle: v })} />
        <AdminTextArea label="Текст панели" value={home.panelBody} onChange={(v) => setHome({ ...home, panelBody: v })} rows={5} />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Плитки разделов</h2>
        {[...home.sectionTiles]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((tile) => {
            const index = home.sectionTiles.findIndex((t) => t.id === tile.id);
            return (
              <div key={tile.id} className="admin-tile-block">
                <h3 className="admin-tile-block__title">Плитка: {tile.title}</h3>
                <AdminTextField label="Путь (URL)" value={tile.path} onChange={(v) => updateTile(index, { path: v })} />
                <AdminTextField label="Заголовок" value={tile.title} onChange={(v) => updateTile(index, { title: v })} />
                <AdminTextField label="Подсказка" value={tile.hint} onChange={(v) => updateTile(index, { hint: v })} />
                <AdminTextField
                  label="Порядок (число)"
                  value={String(tile.sortOrder)}
                  onChange={(v) => updateTile(index, { sortOrder: Number(v.replace(/\D/g, "")) || 0 })}
                />
              </div>
            );
          })}
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Иллюстрация внизу</h2>
        <AdminTextField
          label="Подзаголовок блока"
          value={home.illustrationHeading ?? ""}
          onChange={(v) => setHome({ ...home, illustrationHeading: v.trim() ? v : null })}
        />
        <AdminMediaField
          label="Файл иллюстрации"
          kind="image"
          value={home.illustration ?? emptyMedia()}
          onChange={(v) => setHome({ ...home, illustration: v })}
        />
      </section>

      <AdminSaveBar message={msg} error={err} onSave={save} />
    </div>
  );
}
