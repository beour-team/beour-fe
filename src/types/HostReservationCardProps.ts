export type HostReservationCardProps = {
    name: string;
    place: string;
    time: string;
    people: string;
    reserveId: string;
    initialStatus?: "pending" | "confirmed" | "cancelled"; // 예시로 가능한 상태들
    onDelete?: () => void;
  };
  