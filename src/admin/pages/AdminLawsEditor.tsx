import { useEffect, useState } from "react";
import type { LawArticleBlock, LawsPageBlock, SiteContent } from "../../content/types";
import { setSiteContentInBrowser } from "../../content/runtimeSiteContent";
import { useSiteContent } from "../../content/useSiteContent";
import { AdminMediaField } from "../components/AdminMediaField";
import { AdminParagraphsEditor } from "../components/AdminParagraphsEditor";
import { AdminSaveBar } from "../components/AdminSaveBar";
import { AdminTextArea } from "../components/AdminTextArea";
import { AdminTextField } from "../components/AdminTextField";

function newLawArticle(): LawArticleBlock {
  return {
    id: `law-${Date.now()}`,
    sortOrder: 100,
    title: "Новый закон / тема",
    sourceUrl: "",
    facts: ["Первый тезис", "Второй тезис"],
  };
}

export function AdminLawsEditor() {
  const root = useSiteContent();
  const [block, setBlock] = useState<LawsPageBlock>(() => structuredClone(root.laws));
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setBlock(structuredClone(root.laws));
  }, [root.laws]);

  const save = () => {
    setErr(null);
    setMsg(null);
    try {
      const next: SiteContent = { ...root, laws: block };
      setSiteContentInBrowser(next);
      setMsg("Сохранено в браузере.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Ошибка сохранения");
    }
  };

  const updateArticle = (index: number, patch: Partial<LawArticleBlock>) => {
    const articles = [...block.articles];
    articles[index] = { ...articles[index], ...patch };
    setBlock({ ...block, articles });
  };

  const updateFacts = (index: number, facts: string[]) => {
    const articles = [...block.articles];
    articles[index] = { ...articles[index], facts };
    setBlock({ ...block, articles });
  };

  const addArticle = () => {
    const maxOrder = block.articles.reduce((m, a) => Math.max(m, a.sortOrder), 0);
    setBlock({
      ...block,
      articles: [...block.articles, { ...newLawArticle(), sortOrder: maxOrder + 10 }],
    });
  };

  const removeArticle = (index: number) => {
    if (block.articles.length <= 1) return;
    setBlock({ ...block, articles: block.articles.filter((_, i) => i !== index) });
  };

  const sorted = [...block.articles].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Законы — блоки на странице</h1>
      <p className="admin-doc__lead">
        Каждый блок: название, ссылка на официальный текст (URL), тезисы. Добавляйте и удаляйте блоки по кнопкам ниже.
      </p>

      <section className="admin-card glass">
        <h2 className="admin-card__title">Фон и вводная</h2>
        <AdminMediaField label="Фото фона" kind="image" value={block.pageBackground} onChange={(v) => setBlock({ ...block, pageBackground: v })} />
        <AdminMediaField label="Видео фона" kind="video" value={block.pageBackgroundVideo} onChange={(v) => setBlock({ ...block, pageBackgroundVideo: v })} />
        <AdminMediaField label="Постер видео" kind="image" value={block.pageBackgroundVideoPoster} onChange={(v) => setBlock({ ...block, pageBackgroundVideoPoster: v })} />
        <AdminTextField label="Заголовок страницы" value={block.pageTitle} onChange={(v) => setBlock({ ...block, pageTitle: v })} />
        <AdminTextArea label="Лид под заголовком" value={block.lead} onChange={(v) => setBlock({ ...block, lead: v })} rows={4} />
      </section>

      <div className="admin-inline-actions">
        <button type="button" className="admin-btn admin-btn--primary" onClick={addArticle}>
          + Добавить блок о законе
        </button>
      </div>

      {sorted.map((art) => {
        const index = block.articles.findIndex((a) => a.id === art.id);
        return (
          <section key={art.id} className="admin-card glass">
            <div className="admin-card__headrow">
              <h2 className="admin-card__title">Блок: {art.title || "без названия"}</h2>
              <button type="button" className="admin-btn admin-btn--small admin-btn--danger" onClick={() => removeArticle(index)}>
                Удалить блок
              </button>
            </div>
            <AdminTextField label="Внутренний id (не менять без нужды)" value={art.id} onChange={(v) => updateArticle(index, { id: v.trim() || art.id })} />
            <AdminTextField
              label="Порядок (число)"
              value={String(art.sortOrder)}
              onChange={(v) => updateArticle(index, { sortOrder: Number(v.replace(/\D/g, "")) || 0 })}
            />
            <AdminTextField label="Название закона / темы" value={art.title} onChange={(v) => updateArticle(index, { title: v })} />
            <AdminTextField label="Ссылка на текст (URL)" value={art.sourceUrl} onChange={(v) => updateArticle(index, { sourceUrl: v })} />
            <AdminParagraphsEditor
              legend="Тезисы (каждая строка — отдельный пункт списка на сайте)"
              paragraphs={art.facts}
              onChange={(facts) => updateFacts(index, facts)}
            />
          </section>
        );
      })}

      <AdminSaveBar message={msg} error={err} onSave={save} />
    </div>
  );
}
