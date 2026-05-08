import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { AssociationDetailPageBlock, SiteContent } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminMediaField } from "../components/AdminMediaField";
import { AdminParagraphsEditor } from "../components/AdminParagraphsEditor";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";
import { AdminTextField } from "../components/AdminTextField";

export function AdminAssociationDetailEditor() {
  const { slug } = useParams<{ slug: string }>();
  const root = useSiteContent();
  const index = useMemo(() => root.associations.details.findIndex((d) => d.slug === slug), [root.associations.details, slug]);
  const [detail, setDetail] = useState<AssociationDetailPageBlock | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (index < 0) {
      setDetail(null);
      return;
    }
    setDetail(structuredClone(root.associations.details[index]));
  }, [root.associations.details, index]);

  if (!slug || index < 0 || !detail) {
    return (
      <div className="admin-doc">
        <p>Страница не найдена.</p>
        <Link to="/admin/associations/details">← К списку</Link>
      </div>
    );
  }

  const updateGallery = (gi: number, next: (typeof detail.gallery)[0] | null) => {
    const g = [...detail.gallery];
    g[gi] = next ?? { src: null, alt: "", caption: null };
    setDetail({ ...detail, gallery: g });
  };

  const addGallerySlot = () => {
    if (detail.gallery.length >= 8) return;
    setDetail({ ...detail, gallery: [...detail.gallery, { src: null, alt: "", caption: null }] });
  };

  const removeGallerySlot = () => {
    if (detail.gallery.length <= 1) return;
    setDetail({ ...detail, gallery: detail.gallery.slice(0, -1) });
  };

  const save = () => {
    setErr(null);
    setMsg(null);
    try {
      const details = [...root.associations.details];
      details[index] = detail;
      const next: SiteContent = { ...root, associations: { ...root.associations, details } };
      setSiteContentInBrowser(next);
      setMsg("Сохранено.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка");
    }
  };

  return (
    <div className="admin-doc">
      <p className="admin-back">
        <Link to="/admin/associations/details">← Все страницы «Подробнее»</Link>
      </p>
      <h1 className="admin-doc__title">Подробнее: {detail.title}</h1>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Фон страницы</h2>
        <AdminMediaField label="Фото фона" kind="image" value={detail.pageBackground} onChange={(v) => setDetail({ ...detail, pageBackground: v })} />
        <AdminMediaField label="Видео фона" kind="video" value={detail.pageBackgroundVideo} onChange={(v) => setDetail({ ...detail, pageBackgroundVideo: v })} />
        <AdminMediaField label="Постер" kind="image" value={detail.pageBackgroundVideoPoster} onChange={(v) => setDetail({ ...detail, pageBackgroundVideoPoster: v })} />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Тексты</h2>
        <p className="admin-field__hint">Slug URL: {detail.slug} (фиксирован)</p>
        <AdminTextField label="Заголовок" value={detail.title} onChange={(v) => setDetail({ ...detail, title: v })} />
        <AdminTextArea label="Лид" value={detail.lead} onChange={(v) => setDetail({ ...detail, lead: v })} rows={4} />
        <AdminParagraphsEditor paragraphs={detail.paragraphs} onChange={(p) => setDetail({ ...detail, paragraphs: p })} />
        <AdminTextField label="URL сайта организации" value={detail.externalUrl} onChange={(v) => setDetail({ ...detail, externalUrl: v })} />
        <AdminTextField
          label="URL встраиваемого видео (YouTube и т.п., или пусто)"
          value={detail.videoEmbedUrl ?? ""}
          onChange={(v) => setDetail({ ...detail, videoEmbedUrl: v.trim() ? v.trim() : null })}
        />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Галерея на странице</h2>
        <div className="admin-inline-actions">
          <button type="button" className="admin-btn admin-btn--small" onClick={addGallerySlot}>
            + Слот фото
          </button>
          <button type="button" className="admin-btn admin-btn--small admin-btn--ghost" onClick={removeGallerySlot}>
            − Убрать последний слот
          </button>
        </div>
        {detail.gallery.map((g, gi) => (
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
