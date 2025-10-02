export interface CreateReservationRequest {
  spaceId: number;
  date: string; // yyyy-MM-dd
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
  price: number;
  guestCount: number;
  usagePurpose:
    | "GROUP_MEETING"
    | "COOKING_PRACTICE"
    | "BARISTA_TRAINING"
    | "FLEA_MARKET"
    | "FILMING"
    | "OTHER";
  requestMessage?: string;
}

export interface CreateReservationResponse {
  reservationId: number;
  message: string;
}
