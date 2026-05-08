/** Рабочий день: с 9:00 до 18:00, слоты по 45 минут (последний старт 17:15). */

const DAY_START_MIN = 9 * 60;
const DAY_END_MIN = 18 * 60;
const SLOT_STEP = 45;

export function getConsultationSlotStarts(): string[] {
  const out: string[] = [];
  for (let m = DAY_START_MIN; m + SLOT_STEP <= DAY_END_MIN; m += SLOT_STEP) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    out.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return out;
}

export const CONSULTATION_SLOT_STARTS = getConsultationSlotStarts();

export function slotLabel(slotStart: string, locale: "ru" | "fr"): string {
  const [h, min] = slotStart.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, min, 0, 0);
  return d.toLocaleTimeString(locale === "fr" ? "fr-FR" : "ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
