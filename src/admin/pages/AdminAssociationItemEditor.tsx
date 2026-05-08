import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { AssociationEntry, SiteContent } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminMediaField } from "../components/AdminMediaField";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";
import { AdminTextField } from "../components/AdminTextField";

export function AdminAssociationItemEditor() {
  const { slug } = useParams<{ slug: string }>();
  const root = useSiteContent();
  const index = useMemo(() => root.associations.items.findIndex((i) => i.slug === slug), [root.associations.items, slug]);
  const [item, setItem] = useState<AssociationEntry | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (index < 0) {
      setItem(null);
      return;
    }
    setItem(structuredClone(root.associations.items[index]));
  }, [root.associations.items, index]);

  if (!slug || index < 0 || !item) {
    return (
      <div className="admin-doc">
        <p>Карточка не найдена.</p>
        <Link to="/admin/associations/items">← К списку</Link>
      </div>
    );
  }

  const updateGallery = (gi: number, next: (typeof item.gallery)[0] | null) => {
    const g = [...item.gallery];
    if (next === null) {
      g[gi] = { src: null, alt: "", caption: null };
    } else {
      g[gi] = next;
    }
    setItem({ ...item, gallery: g });
  };

  const addGallerySlot = () => {
    if (item.gallery.length >= 6) return;
    setItem({ ...item, gallery: [...item.gallery, { src: null, alt: "", caption: null }] });
  };

  const removeGallerySlot = () => {
    if (item.gallery.length <= 1) return;
    setItem({ ...item, gallery: item.gallery.slice(0, -1) });
  };

  const updateSpec = (si: number, patch: Partial<(typeof item.specs)[0]>) => {
    const specs = [...item.specs];
    specs[si] = { ...specs[si], ...patch };
    setItem({ ...item, specs });
  };

  const save = () => {
    setErr(null);
    setMsg(null);
    try {
      const items = [...root.associations.items];
      items[index] = item;
      const next: SiteContent = { ...root, associations: { ...root.associations, items } };
      setSiteContentInBrowser(next);
      setMsg("Сохранено.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка");
    }
  };

  return (
    <div className="admin-doc">
      <p className="admin-back">
        <Link to="/admin/associations/items">← Все карточки</Link>
      </p>
      <h1 className="admin-doc__title">Карточка: {item.title}</h1>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Основное</h2>
        <p className="admin-field__hint">
          Slug в URL: <code className="admin-code">{item.slug}</code> (в этой версии не меняется из админки)
        </p>
        <AdminTextField label="Название" value={item.title} onChange={(v) => setItem({ ...item, title: v })} />
        <AdminTextArea label="Краткое описание в списке" value={item.description} onChange={(v) => setItem({ ...item, description: v })} rows={4} />
        <AdminTextArea label="Текст на оверлее карточки" value={item.hoverIntro} onChange={(v) => setItem({ ...item, hoverIntro: v })} rows={5} />
        <AdminTextField
          label="Внешний URL сайта (или пусто)"
          value={item.externalUrl ?? ""}
          onChange={(v) => setItem({ ...item, externalUrl: v.trim() ? v.trim() : null })}
        />
        <AdminTextField label="Порядок сортировки" value={String(item.sortOrder)} onChange={(v) => setItem({ ...item, sortOrder: Number(v.replace(/\D/g, "")) || 0 })} />
        <AdminTextField label="regionId" value={item.regionId} onChange={(v) => setItem({ ...item, regionId: v })} />
        <AdminTextField label="categoryId" value={item.categoryId} onChange={(v) => setItem({ ...item, categoryId: v })} />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Характеристики (до 3 строк)</h2>
        {item.specs.map((s, si) => (
          <div key={si} className="admin-tile-block">
            <AdminTextField label="Подпись" value={s.label} onChange={(v) => updateSpec(si, { label: v })} />
            <AdminTextField label="Значение" value={s.value} onChange={(v) => updateSpec(si, { value: v })} />
          </div>
        ))}
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Галерея карточки (фото с устройства)</h2>
        <div className="admin-inline-actions">
          <button type="button" className="admin-btn admin-btn--small" onClick={addGallerySlot}>
            + Слот фото
          </button>
          <button type="button" className="admin-btn admin-btn--small admin-btn--ghost" onClick={removeGallerySlot}>
            − Убрать последний слот
          </button>
        </div>
        {item.gallery.map((g, gi) => (
          <div key={gi} className="admin-tile-block">
            <h3 className="admin-tile-block__title">Фото {gi + 1}</h3>
            <AdminMediaField label="Файл" kind="image" value={g.src ? g : null} onChange={(m) => updateGallery(gi, m)} />
          </div>
        ))}
      </section>

      <AdminSaveBar message={msg} error={err} onSave={save} />
    </div>
  );
}
