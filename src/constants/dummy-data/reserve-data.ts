import { space3 } from "../../assets/theme";
import type { ReservationData } from "../../types/ReservationData";

// 현재 예약 데이터
export const currentReservationData: ReservationData[] = [
  {
    reservationId: 12345678,
    spaceName: "게임 파티룸 플레이앤 삼성역점",
    spaceThumbImageUrl: space3,
    date: "2025-06-19",
    startTime: "18:00:00",
    endTime: "19:00:00",
    price: 30000,
    guestCount: 3,
    status: "CONFIRMED",
  },
  {
    reservationId: 12345679,
    spaceName: "게임 파티룸 플레이앤 삼성역점",
    spaceThumbImageUrl: space3,
    date: "2025-06-22",
    startTime: "18:00:00",
    endTime: "19:00:00",
    price: 30000,
    guestCount: 3,
    status: "PENDING",
  },
  {
    reservationId: 12345670,
    spaceName: "게임 파티룸 플레이앤 삼성역점",
    spaceThumbImageUrl: space3,
    date: "2025-07-02",
    startTime: "18:00:00",
    endTime: "19:00:00",
    price: 30000,
    guestCount: 3,
    status: "CONFIRMED",
  },
];

// 지난 예약 데이터
export const pastReservationData: ReservationData[] = [
  {
    reservationId: 12345688,
    spaceName: "게임 파티룸 플레이앤 삼성역점",
    spaceThumbImageUrl: space3,
    date: "2025-05-02",
    startTime: "18:00:00",
    endTime: "19:00:00",
    price: 30000,
    guestCount: 3,
  },
  {
    reservationId: 12345698,
    spaceName: "게임 파티룸 플레이앤 삼성역점",
    spaceThumbImageUrl: space3,
    date: "2025-05-02",
    startTime: "18:00:00",
    endTime: "19:00:00",
    price: 30000,
    guestCount: 3,
  },
];

// 취소 예약 데이터
export const canceledReservationData: ReservationData[] = [
  {
    reservationId: 12344678,
    spaceName: "게임 파티룸 플레이앤 삼성역점",
    spaceThumbImageUrl: space3,
    date: "2025-05-02",
    startTime: "18:00:00",
    endTime: "19:00:00",
    price: 30000,
    guestCount: 3,
  },
];
