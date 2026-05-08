import { useEffect, useState } from "react";
import type { AssociationFilterTab, AssociationsPageBlock, SiteContent } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminMediaField } from "../components/AdminMediaField";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";
import { AdminTextField } from "../components/AdminTextField";

function mapTabs(tabs: AssociationFilterTab[], index: number, patch: Partial<AssociationFilterTab>) {
  const next = [...tabs];
  next[index] = { ...next[index], ...patch };
  return next;
}

export function AdminAssociationsPageEditor() {
  const root = useSiteContent();
  const [block, setBlock] = useState<AssociationsPageBlock>(() => structuredClone(root.associations));
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setBlock(structuredClone(root.associations));
  }, [root.associations]);

  const save = () => {
    setErr(null);
    setMsg(null);
    try {
      const next: SiteContent = { ...root, associations: block };
      setSiteContentInBrowser(next);
      setMsg("Сохранено в браузере.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  };

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Ассоциации — страница каталога</h1>
      <p className="admin-doc__lead">Заголовок, лид, фон и вкладки фильтров. Карточки и страницы «Подробнее» — в соседних разделах меню.</p>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Фон</h2>
        <AdminMediaField label="Фото фона" kind="image" value={block.pageBackground} onChange={(v) => setBlock({ ...block, pageBackground: v })} />
        <AdminMediaField label="Видео фона" kind="video" value={block.pageBackgroundVideo} onChange={(v) => setBlock({ ...block, pageBackgroundVideo: v })} />
        <AdminMediaField label="Постер" kind="image" value={block.pageBackgroundVideoPoster} onChange={(v) => setBlock({ ...block, pageBackgroundVideoPoster: v })} />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Заголовок и лид</h2>
        <AdminTextField label="Заголовок" value={block.pageTitle} onChange={(v) => setBlock({ ...block, pageTitle: v })} />
        <AdminTextArea label="Лид" value={block.lead} onChange={(v) => setBlock({ ...block, lead: v })} rows={6} />
        <AdminTextField
          label="Карточек на странице (число)"
          value={String(block.itemsPerPage)}
          onChange={(v) => setBlock({ ...block, itemsPerPage: Math.max(1, Number(v.replace(/\D/g, "")) || 6) })}
        />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Вкладки «Регион»</h2>
        {block.regionTabs.map((t, i) => (
          <div key={t.id} className="admin-tile-block">
            <AdminTextField label="ID (не менять без необходимости)" value={t.id} onChange={(v) => setBlock({ ...block, regionTabs: mapTabs(block.regionTabs, i, { id: v }) })} />
            <AdminTextField label="Подпись" value={t.label} onChange={(v) => setBlock({ ...block, regionTabs: mapTabs(block.regionTabs, i, { label: v }) })} />
          </div>
        ))}
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Вкладки «Сфера»</h2>
        {block.categoryTabs.map((t, i) => (
          <div key={t.id} className="admin-tile-block">
            <AdminTextField label="ID" value={t.id} onChange={(v) => setBlock({ ...block, categoryTabs: mapTabs(block.categoryTabs, i, { id: v }) })} />
            <AdminTextField label="Подпись" value={t.label} onChange={(v) => setBlock({ ...block, categoryTabs: mapTabs(block.categoryTabs, i, { label: v }) })} />
          </div>
        ))}
      </section>

      <AdminSaveBar message={msg} error={err} onSave={save} />
    </div>
  );
}
