import { AdminAuthGate } from "./AdminAuthGate";
import { AdminShell } from "./AdminShell";

/** Оболочка входа + layout с Outlet для вложенных маршрутов /admin/… */
export function AdminEntry() {
  return (
    <AdminAuthGate>
      <AdminShell />
    </AdminAuthGate>
  );
}
