import { useCallback, useEffect, useMemo, useState } from "react";
import {
  dateKeyFromDate,
  getTakenSlotsForDate,
  isDateFullyBooked,
  isWeekendDateKey,
  parseDateKeyLocal,
} from "../consultation/bookingStore";
import { getConsultationRepository } from "../consultation/consultationRepository";
import { CONSULTATION_SLOT_STARTS } from "../consultation/slotSchedule";
import { slotLabel } from "../consultation/slotSchedule";
import type { ConsultationBooking } from "../consultation/types";
import { useConsultationBookings } from "../consultation/useConsultationBookings";
import { useLocale } from "../i18n/LocaleProvider";

function todayKey(): string {
  return dateKeyFromDate(new Date());
}

function buildMonthCells(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(dateKeyFromDate(new Date(year, month, d)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);
  return cells;
}

export function ConsultationPage() {
  const { locale, t } = useLocale();
  const localeTag = locale === "fr" ? "fr-FR" : "ru-RU";
  const bookings = useConsultationBookings();
  const repo = useMemo(() => getConsultationRepository(), []);

  const [monthAnchor, setMonthAnchor] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [payDate, setPayDate] = useState("");
  const [payPhone, setPayPhone] = useState("");
  const [payMatches, setPayMatches] = useState<ConsultationBooking[] | null>(null);
  const [payLooking, setPayLooking] = useState(false);
  const [payExpandedId, setPayExpandedId] = useState<string | null>(null);
  const [stripeProcessing, setStripeProcessing] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = t.consultationBrowserTitle;
    return () => {
      document.title = prev;
    };
  }, [t.consultationBrowserTitle]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(id);
  }, [toast]);

  const year = monthAnchor.getFullYear();
  const month = monthAnchor.getMonth();
  const cells = useMemo(() => buildMonthCells(year, month), [year, month]);
  const monthTitle = useMemo(
    () => new Date(year, month, 1).toLocaleDateString(localeTag, { month: "long", year: "numeric" }),
    [year, month, localeTag],
  );

  const takenForSelected = useMemo(
    () => (selectedDateKey ? getTakenSlotsForDate(selectedDateKey) : new Set<string>()),
    [selectedDateKey, bookings],
  );

  const shiftMonth = (delta: number) => {
    setMonthAnchor((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));
  };

  const isPast = (dateKey: string) => dateKey < todayKey();

  const onPickDate = (dateKey: string) => {
    if (isPast(dateKey) || isWeekendDateKey(dateKey) || isDateFullyBooked(dateKey)) return;
    setSelectedDateKey(dateKey);
    setSelectedSlot(null);
  };

  const onSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDateKey || !selectedSlot) {
      setToast({ kind: "err", text: t.consultationErrorNeedSlot });
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim() || !topic.trim()) {
      setToast({ kind: "err", text: t.consultationErrorFill });
      return;
    }
    if (!email.includes("@")) {
      setToast({ kind: "err", text: t.consultationErrorEmail });
      return;
    }
    setSubmitting(true);
    try {
      const b = await repo.createBooking({
        dateKey: selectedDateKey,
        slotStart: selectedSlot,
        clientName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        topic: topic.trim(),
      });
      setToast({
        kind: "ok",
        text: t.consultationSuccessToast.replace("{{code}}", b.confirmationCode),
      });
      setName("");
      setPhone("");
      setEmail("");
      setTopic("");
      setSelectedSlot(null);
      setSelectedDateKey(null);
    } catch (err) {
      const msg = err instanceof Error && err.message === "SLOT_TAKEN" ? t.consultationErrorSlotTaken : t.consultationErrorGeneric;
      setToast({ kind: "err", text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const onFindPayment = async () => {
    setPayLooking(true);
    setPayMatches(null);
    setPayExpandedId(null);
    try {
      if (!payDate || !payPhone.trim()) {
        setPayMatches([]);
        return;
      }
      const list = await repo.findUnpaidBookings(payDate, payPhone.trim());
      setPayMatches(list);
    } finally {
      setPayLooking(false);
    }
  };

  const onFakeStripePay = async (id: string) => {
    setStripeProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      const updated = await repo.markPaid(id);
      if (updated) {
        setToast({ kind: "ok", text: t.consultationPaidToast });
        setPayExpandedId(null);
        setPayMatches((prev) => (prev ? prev.filter((b) => b.id !== id) : prev));
      }
    } finally {
      setStripeProcessing(false);
    }
  };

  const weekdayShort = useCallback(
    (isoWeekdayIndex: number) => {
      const d = new Date(2024, 0, 1 + isoWeekdayIndex);
      return d.toLocaleDateString(localeTag, { weekday: "short" });
    },
    [localeTag],
  );

  return (
    <div className="topic-page consultation-page">
      <header className="panel glass topic-page__header">
        <h1 className="page-title">{t.consultationPageTitle}</h1>
        <p className="page-lead topic-page__lead">{t.consultationLead}</p>
        <p className="consultation-demo-banner" role="note">
          {t.consultationDemoBanner}
        </p>
      </header>

      <section className="panel glass consultation-section" id="consultation-book" aria-labelledby="consultation-book-title">
        <h2 id="consultation-book-title" className="section-heading">
          {t.consultationBookTitle}
        </h2>
        <p className="consultation-section__intro">{t.consultationBookIntro}</p>
        <p className="consultation-hint">{t.consultationPayDeadlineHint}</p>

        <div className="consultation-calendar-wrap">
          <div className="consultation-calendar-head">
            <button type="button" className="btn btn--ghost consultation-calendar-nav" onClick={() => shiftMonth(-1)}>
              {t.consultationMonthPrev}
            </button>
            <span className="consultation-calendar-month">{monthTitle}</span>
            <button type="button" className="btn btn--ghost consultation-calendar-nav" onClick={() => shiftMonth(1)}>
              {t.consultationMonthNext}
            </button>
          </div>
          <div className="consultation-weekdays" aria-hidden>
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} className="consultation-weekdays__d">
                {weekdayShort(i)}
              </span>
            ))}
          </div>
          <div className="consultation-calendar-grid" role="grid" aria-label={t.consultationCalendarAria}>
            {cells.map((dk, i) => {
              if (!dk) {
                return <span key={`e-${i}`} className="consultation-cal-cell consultation-cal-cell--empty" />;
              }
              const past = isPast(dk);
              const weekend = isWeekendDateKey(dk);
              const full = isDateFullyBooked(dk);
              const disabled = past || weekend || full;
              const selected = dk === selectedDateKey;
              let mod = "";
              if (past) mod = " consultation-cal-cell--past";
              else if (weekend) mod += " consultation-cal-cell--weekend";
              else if (full) mod += " consultation-cal-cell--full";
              else if (selected) mod += " consultation-cal-cell--selected";
              return (
                <button
                  key={dk}
                  type="button"
                  role="gridcell"
                  disabled={disabled}
                  className={"consultation-cal-cell" + mod}
                  onClick={() => onPickDate(dk)}
                >
                  {parseDateKeyLocal(dk).getDate()}
                </button>
              );
            })}
          </div>
          <ul className="consultation-legend">
            <li className="consultation-legend__i consultation-legend__i--free">{t.consultationLegendFree}</li>
            <li className="consultation-legend__i consultation-legend__i--full">{t.consultationLegendFull}</li>
            <li className="consultation-legend__i consultation-legend__i--weekend">{t.consultationLegendWeekend}</li>
            <li className="consultation-legend__i consultation-legend__i--past">{t.consultationLegendPast}</li>
          </ul>
        </div>

        {selectedDateKey && !isDateFullyBooked(selectedDateKey) && !isWeekendDateKey(selectedDateKey) ? (
          <div className="consultation-slots">
            <h3 className="consultation-slots__title">{t.consultationPickTime}</h3>
            <div className="consultation-slots__grid">
              {CONSULTATION_SLOT_STARTS.map((slot) => {
                const taken = takenForSelected.has(slot);
                const sel = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={taken}
                    className={
                      "consultation-slot-btn" +
                      (taken ? " consultation-slot-btn--taken" : "") +
                      (sel ? " consultation-slot-btn--selected" : "")
                    }
                    onClick={() => !taken && setSelectedSlot(slot)}
                  >
                    {slotLabel(slot, locale === "fr" ? "fr" : "ru")}
                    {taken ? <span className="consultation-slot-btn__badge">{t.consultationSlotTaken}</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {selectedDateKey && selectedSlot ? (
          <form className="consultation-form" onSubmit={onSubmitBooking}>
            <h3 className="consultation-form__title">{t.consultationFormTitle}</h3>
            <label className="consultation-field">
              <span className="consultation-field__l">{t.consultationFormName}</span>
              <input className="consultation-input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </label>
            <label className="consultation-field">
              <span className="consultation-field__l">{t.consultationFormPhone}</span>
              <input className="consultation-input" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required />
            </label>
            <label className="consultation-field">
              <span className="consultation-field__l">{t.consultationFormEmail}</span>
              <input className="consultation-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </label>
            <label className="consultation-field">
              <span className="consultation-field__l">{t.consultationFormTopic}</span>
              <textarea className="consultation-textarea" value={topic} onChange={(e) => setTopic(e.target.value)} rows={4} required />
            </label>
            <div className="consultation-form__actions">
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? "…" : t.consultationSubmit}
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setSelectedSlot(null);
                  setSelectedDateKey(null);
                }}
              >
                {t.consultationReset}
              </button>
            </div>
          </form>
        ) : null}
      </section>

      <section className="panel glass consultation-section" id="consultation-pay" aria-labelledby="consultation-pay-title">
        <h2 id="consultation-pay-title" className="section-heading">
          {t.consultationPayTitle}
        </h2>
        <p className="consultation-section__intro">{t.consultationPayIntro}</p>
        <div className="consultation-pay-lookup">
          <label className="consultation-field consultation-field--inline">
            <span className="consultation-field__l">{t.consultationPayDateLabel}</span>
            <input className="consultation-input" type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} />
          </label>
          <label className="consultation-field consultation-field--inline">
            <span className="consultation-field__l">{t.consultationPayPhoneLabel}</span>
            <input className="consultation-input" value={payPhone} onChange={(e) => setPayPhone(e.target.value)} autoComplete="tel" />
          </label>
          <button type="button" className="btn btn--primary" onClick={() => void onFindPayment()} disabled={payLooking}>
            {payLooking ? "…" : t.consultationPayFind}
          </button>
        </div>

        {payMatches && payMatches.length === 0 ? <p className="consultation-pay-empty">{t.consultationPayNotFound}</p> : null}

        {payMatches && payMatches.length > 0 ? (
          <ul className="consultation-pay-list">
            {payMatches.map((b) => (
              <li key={b.id} className="consultation-pay-card glass">
                <div className="consultation-pay-card__row">
                  <div>
                    <p className="consultation-pay-card__code">{b.confirmationCode}</p>
                    <p className="consultation-pay-card__meta">
                      {parseDateKeyLocal(b.dateKey).toLocaleDateString(localeTag)} · {slotLabel(b.slotStart, locale === "fr" ? "fr" : "ru")}
                    </p>
                    <p className="consultation-pay-card__status">
                      {t.consultationPayStatusLabel}: <strong>{t.consultationPayStatusUnpaid}</strong>
                    </p>
                  </div>
                  <button type="button" className="btn btn--primary" onClick={() => setPayExpandedId(payExpandedId === b.id ? null : b.id)}>
                    {payExpandedId === b.id ? t.consultationPayClose : t.consultationPayPayBtn}
                  </button>
                </div>
                {payExpandedId === b.id ? (
                  <div className="consultation-stripe-demo">
                    <h4 className="consultation-stripe-demo__title">{t.consultationStripeDemoTitle}</h4>
                    <p className="consultation-stripe-demo__hint">{t.consultationStripeDemoHint}</p>
                    <label className="consultation-field">
                      <span className="consultation-field__l">{t.consultationStripeCardLabel}</span>
                      <input className="consultation-input" disabled placeholder="4242 4242 4242 4242" />
                    </label>
                    <button
                      type="button"
                      className="btn btn--primary consultation-stripe-demo__pay"
                      disabled={stripeProcessing}
                      onClick={() => void onFakeStripePay(b.id)}
                    >
                      {stripeProcessing ? "…" : t.consultationStripePayTest}
                    </button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {toast ? (
        <div className={"consultation-toast consultation-toast--" + toast.kind} role="status">
          <p className="consultation-toast__text">{toast.text}</p>
          <button type="button" className="consultation-toast__close" onClick={() => setToast(null)} aria-label={t.consultationToastClose}>
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
}
