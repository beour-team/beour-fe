export type ReservationData = {
  reservationId: number;
  spaceName: string;
  spaceThumbImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  guestCount: number;
  status?: "CONFIRMED" | "PENDING";
};
