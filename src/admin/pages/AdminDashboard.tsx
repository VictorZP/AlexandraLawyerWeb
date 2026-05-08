import { Link } from "react-router-dom";

export function AdminDashboard() {
  return (
    <div className="admin-doc">
      <h1 className="admin-doc__title">Обзор</h1>
      <p className="admin-doc__lead">
        Выберите раздел слева — откроется форма с теми же блоками, что и на публичном сайте. Медиа загружаются с устройства
        и сохраняются в черновике браузера (data URL). Для постоянной публикации используйте резерв JSON на странице{" "}
        <Link to="/admin/settings">«Подсказки и резерв»</Link>.
      </p>
      <ul className="admin-doc__list">
        <li>
          <strong>Главная</strong> — заголовки, лид, плитки разделов, иллюстрация, фон.
        </li>
        <li>
          <strong>Тематические страницы</strong> — заголовок, лид, абзацы, фото и видео фона.
        </li>
        <li>
          <strong>Ассоциации</strong> — три экрана: общая страница каталога, карточки в списке, внутренние страницы «Подробнее».
        </li>
      </ul>
    </div>
  );
}
