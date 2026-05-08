import { useEffect, useState } from "react";
import type { SiteContent, TopicPageBlock } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminMediaField } from "../components/AdminMediaField";
import { AdminParagraphsEditor } from "../components/AdminParagraphsEditor";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";
import { AdminTextField } from "../components/AdminTextField";

export type TopicSectionKey = "emigration" | "business" | "talentPassport" | "laws";

const titles: Record<TopicSectionKey, string> = {
  emigration: "Эмиграция во Францию",
  business: "Бизнес во Франции",
  talentPassport: "Паспорт талант Франция",
  laws: "Интересные законы Франции",
};

export function AdminTopicEditor({ section }: { section: TopicSectionKey }) {
  const root = useSiteContent();
  const [block, setBlock] = useState<TopicPageBlock>(() => structuredClone(root[section]));
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setBlock(structuredClone(root[section]));
  }, [root, section]);

  const save = () => {
    setErr(null);
    setMsg(null);
    try {
      const next: SiteContent = { ...root, [section]: block };
      setSiteContentInBrowser(next);
      setMsg("Сохранено в браузере.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  };

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">{titles[section]}</h1>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Фон страницы</h2>
        <AdminMediaField
          label="Фото фона"
          kind="image"
          value={block.pageBackground}
          onChange={(v) => setBlock({ ...block, pageBackground: v })}
        />
        <AdminMediaField
          label="Видео фона"
          kind="video"
          value={block.pageBackgroundVideo}
          onChange={(v) => setBlock({ ...block, pageBackgroundVideo: v })}
        />
        <AdminMediaField
          label="Постер видео"
          kind="image"
          value={block.pageBackgroundVideoPoster}
          onChange={(v) => setBlock({ ...block, pageBackgroundVideoPoster: v })}
        />
      </section>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Тексты</h2>
        <AdminTextField label="Заголовок страницы" value={block.pageTitle} onChange={(v) => setBlock({ ...block, pageTitle: v })} />
        <AdminTextArea label="Лид" value={block.lead} onChange={(v) => setBlock({ ...block, lead: v })} rows={4} />
        <AdminParagraphsEditor paragraphs={block.paragraphs} onChange={(p) => setBlock({ ...block, paragraphs: p })} />
      </section>

      <AdminSaveBar message={msg} error={err} onSave={save} />
    </div>
  );
}
