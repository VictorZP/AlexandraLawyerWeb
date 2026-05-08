import { useSyncExternalStore } from "react";
import type { ConsultationBooking } from "./types";
import { getBookingsSnapshot, subscribeBookings } from "./bookingStore";

const EMPTY_SERVER: readonly ConsultationBooking[] = [];

export function useConsultationBookings(): readonly ConsultationBooking[] {
  return useSyncExternalStore(subscribeBookings, getBookingsSnapshot, () => EMPTY_SERVER);
}
