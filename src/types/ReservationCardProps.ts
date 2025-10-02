// types/ReservationCardProps.ts
export interface ReservationCardProps {
    name: string;
    place: string;
    time: string;
    people: number;
    reserveId: string | number;
    initialStatus?: string;
  }
  