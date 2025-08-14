// 예약 현황
export interface ReservationItem {
  reservationId: number;
  spaceName: string;
  spaceThumbImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  guestCount: number;
  status: "PENDING" | "CONFIRMED";
  reviewId: number;
}

export interface CurrentReservation {
  reservations: ReservationItem[];
  totalPage: number;
  last: boolean;
}

export interface PastReservation {
  reservations: ReservationItem[];
  totalPage: number;
  last: boolean;
}

export interface CanceledReservation {
  reservations: ReservationItem[];
  totalPage: number;
  last: boolean;
}
