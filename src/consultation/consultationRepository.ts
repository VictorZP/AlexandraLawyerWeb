/**
 * Слой доступа к записям на консультацию.
 * Сейчас: демо через localStorage (bookingStore).
 * Позже: реализация на Supabase + Edge Functions / RLS — подключить вместо createDemoRepository().
 */

import type { ConsultationBooking, CreateConsultationInput } from "./types";
import {
  createBooking as storeCreate,
  findUnpaidByDateAndPhone as storeFindUnpaid,
  markBookingPaidDemo as storeMarkPaid,
} from "./bookingStore";

export type IConsultationRepository = {
  createBooking(input: CreateConsultationInput): Promise<ConsultationBooking>;
  findUnpaidBookings(dateKey: string, phone: string): Promise<ConsultationBooking[]>;
  markPaid(bookingId: string): Promise<ConsultationBooking | null>;
};

function createLocalStorageRepository(): IConsultationRepository {
  return {
    async createBooking(input: CreateConsultationInput) {
      return storeCreate(input);
    },
    async findUnpaidBookings(dateKey: string, phone: string) {
      return storeFindUnpaid(dateKey, phone);
    },
    async markPaid(bookingId: string) {
      return storeMarkPaid(bookingId);
    },
  };
}

/** Демо и прод до Supabase: одна реализация без сетевых вызовов. */
export function getConsultationRepository(): IConsultationRepository {
  return createLocalStorageRepository();
}

/*
 * === Supabase (включить при готовности) ===
 *
 * 1) npm i @supabase/supabase-js
 * 2) .env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
 * 3) Таблица `consultation_bookings` с полями как в типе ConsultationBooking + RLS
 *
 * import { createClient, type SupabaseClient } from "@supabase/supabase-js";
 *
 * function requireEnv(name: string): string {
 *   const v = import.meta.env[name] as string | undefined;
 *   if (!v) throw new Error(`Missing ${name}`);
 *   return v;
 * }
 *
 * export function getSupabaseConsultationRepository(): IConsultationRepository {
 *   const client: SupabaseClient = createClient(
 *     requireEnv("VITE_SUPABASE_URL"),
 *     requireEnv("VITE_SUPABASE_ANON_KEY"),
 *   );
 *   return {
 *     async createBooking(input) {
 *       const { data, error } = await client.from("consultation_bookings").insert({ ... }).select().single();
 *       if (error) throw error;
 *       return mapRow(data);
 *     },
 *     async findUnpaidBookings(dateKey, phone) { ... },
 *     async markPaid(bookingId) { ... },
 *   };
 * }
 *
 * export function getConsultationRepository(): IConsultationRepository {
 *   if (import.meta.env.VITE_SUPABASE_URL) return getSupabaseConsultationRepository();
 *   return createLocalStorageRepository();
 * }
 */
