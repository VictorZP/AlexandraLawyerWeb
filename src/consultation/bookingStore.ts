import type { ConsultationBooking, ConsultationPaymentStatus, CreateConsultationInput } from "./types";
import { CONSULTATION_SLOT_STARTS } from "./slotSchedule";

const STORAGE_KEY = "legal-consultation-bookings-v1";
const SEQ_KEY = "legal-consultation-seq-v1";
export const BOOKINGS_CHANGED = "legal-consultation-bookings-changed";

/** Нормализация телефона для поиска записи при оплате. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

function safeParse(raw: string | null): ConsultationBooking[] {
  if (!raw) return [];
  try {
    const x = JSON.parse(raw) as unknown;
    if (!Array.isArray(x)) return [];
    return x.filter(isBookingShape) as ConsultationBooking[];
  } catch {
    return [];
  }
}

function isBookingShape(x: unknown): boolean {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.confirmationCode === "string" &&
    typeof o.dateKey === "string" &&
    typeof o.slotStart === "string" &&
    typeof o.clientName === "string" &&
    typeof o.phone === "string" &&
    typeof o.email === "string" &&
    typeof o.topic === "string" &&
    (o.status === "unpaid" || o.status === "paid") &&
    typeof o.createdAt === "string"
  );
}

let snapshotCache: { serialized: string; list: readonly ConsultationBooking[] } | null = null;

function readRaw(): string {
  if (typeof localStorage === "undefined") return "[]";
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

/** Стабильная ссылка для useSyncExternalStore (см. runtimeSiteContent). */
export function getBookingsSnapshot(): readonly ConsultationBooking[] {
  const raw = readRaw();
  if (snapshotCache && snapshotCache.serialized === raw) {
    return snapshotCache.list;
  }
  const list = safeParse(raw);
  snapshotCache = { serialized: raw, list };
  return list;
}

function persist(list: ConsultationBooking[]): void {
  const raw = JSON.stringify(list);
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, raw);
    } catch {
      /* ignore quota */
    }
  }
  snapshotCache = { serialized: raw, list };
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(BOOKINGS_CHANGED));
  }
}

export function subscribeBookings(onChange: () => void): () => void {
  const handler = () => onChange();
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(BOOKINGS_CHANGED, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(BOOKINGS_CHANGED, handler);
    window.removeEventListener("storage", handler);
  };
}

function nextSeq(): number {
  if (typeof localStorage === "undefined") return Date.now() % 100000;
  try {
    const cur = Number(localStorage.getItem(SEQ_KEY) ?? "0") || 0;
    const n = cur + 1;
    localStorage.setItem(SEQ_KEY, String(n));
    return n;
  } catch {
    return Date.now() % 100000;
  }
}

function makeConfirmationCode(dateKey: string): string {
  const compact = dateKey.replace(/-/g, "");
  const seq = nextSeq();
  return `AL-${compact}-${String(seq).padStart(4, "0")}`;
}

function randomId(): string {
  return `cb-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function listBookings(): ConsultationBooking[] {
  return [...getBookingsSnapshot()];
}

export function createBooking(input: CreateConsultationInput): ConsultationBooking {
  const all = listBookings();
  const taken = new Set(all.filter((b) => b.dateKey === input.dateKey).map((b) => b.slotStart));
  if (taken.has(input.slotStart)) {
    throw new Error("SLOT_TAKEN");
  }
  const booking: ConsultationBooking = {
    id: randomId(),
    confirmationCode: makeConfirmationCode(input.dateKey),
    dateKey: input.dateKey,
    slotStart: input.slotStart,
    clientName: input.clientName.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    topic: input.topic.trim(),
    status: "unpaid",
    createdAt: new Date().toISOString(),
  };
  persist([...all, booking]);
  return booking;
}

export function findUnpaidByDateAndPhone(dateKey: string, phone: string): ConsultationBooking[] {
  const n = normalizePhone(phone);
  if (!n) return [];
  return listBookings().filter((b) => b.dateKey === dateKey && normalizePhone(b.phone) === n && b.status === "unpaid");
}

export function findBookingById(id: string): ConsultationBooking | undefined {
  return listBookings().find((b) => b.id === id);
}

export function markBookingPaidDemo(id: string): ConsultationBooking | null {
  const all = listBookings();
  const i = all.findIndex((b) => b.id === id);
  if (i < 0) return null;
  const b = all[i];
  if (b.status === "paid") return b;
  const next: ConsultationBooking = {
    ...b,
    status: "paid" as ConsultationPaymentStatus,
    paidAt: new Date().toISOString(),
  };
  const copy = [...all];
  copy[i] = next;
  persist(copy);
  return next;
}

/** Слоты, занятые существующими записями (любой статус — время зарезервировано). */
export function getTakenSlotsForDate(dateKey: string): Set<string> {
  const set = new Set<string>();
  for (const b of getBookingsSnapshot()) {
    if (b.dateKey === dateKey) set.add(b.slotStart);
  }
  return set;
}

/** Все слоты дня заняты (реальные записи + демо-заблокированные дни). */
export function isDateFullyBooked(dateKey: string): boolean {
  if (isDemoFullyBlockedDay(dateKey)) return true;
  const taken = getTakenSlotsForDate(dateKey);
  return CONSULTATION_SLOT_STARTS.every((s) => taken.has(s));
}

/** Демо: несколько полностью занятых будних дней без записей в БД (только визуал). */
const DEMO_BLOCKED_FULL_DAYS = new Set<string>();

function seedDemoBlockedDays(): void {
  if (typeof window === "undefined" || DEMO_BLOCKED_FULL_DAYS.size > 0) return;
  const addOffset = (off: number) => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + off);
    while (d.getDay() === 0 || d.getDay() === 6) {
      d.setDate(d.getDate() + 1);
    }
    DEMO_BLOCKED_FULL_DAYS.add(dateKeyFromDate(d));
  };
  addOffset(4);
  addOffset(11);
}

export function dateKeyFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDateKeyLocal(dateKey: string): Date {
  const [y, mo, da] = dateKey.split("-").map(Number);
  return new Date(y, mo - 1, da, 12, 0, 0, 0);
}

export function isDemoFullyBlockedDay(dateKey: string): boolean {
  seedDemoBlockedDays();
  return DEMO_BLOCKED_FULL_DAYS.has(dateKey);
}

export function isWeekendDateKey(dateKey: string): boolean {
  const d = parseDateKeyLocal(dateKey);
  const day = d.getDay();
  return day === 0 || day === 6;
}
