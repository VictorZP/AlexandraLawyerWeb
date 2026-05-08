/** Статус оплаты — в проде синхронизируется со Stripe / Supabase. */
export type ConsultationPaymentStatus = "unpaid" | "paid";

/** Запись на консультацию (схема близка к будущей таблице в Supabase). */
export type ConsultationBooking = {
  id: string;
  /** Номер для клиента: например AL-20260506-0042 */
  confirmationCode: string;
  /** Локальная дата YYYY-MM-DD */
  dateKey: string;
  /** Начало слота, 24ч, шаг 45 мин (например 09:00) */
  slotStart: string;
  clientName: string;
  phone: string;
  email: string;
  topic: string;
  status: ConsultationPaymentStatus;
  createdAt: string;
  paidAt?: string | null;
};

export type CreateConsultationInput = {
  dateKey: string;
  slotStart: string;
  clientName: string;
  phone: string;
  email: string;
  topic: string;
};
