import type { ReviewableReservation } from "./types";

// 임시 더미 데이터 - 실제로는 API에서 가져올 데이터
export const reviewableReservations: ReviewableReservation[] = [
  {
    reservationId: 12345678,
    spaceName: "게임 파티룸 플레이엔 삼성역점",
    spaceThumbImageUrl: "https://via.placeholder.com/120x120",
    date: "2025-05-12",
    startTime: "18:00:00",
    endTime: "19:00:00",
    guestCount: 3,
    hasReview: false,
    useTypes: ["요리 연습"],
  },
  {
    reservationId: 12345679,
    spaceName: "게임 파티룸 플레이엔 삼성역점",
    spaceThumbImageUrl: "https://via.placeholder.com/120x120",
    date: "2025-05-12",
    startTime: "18:00:00",
    endTime: "19:00:00",
    guestCount: 10,
    hasReview: false,
    useTypes: ["단체 모임"],
  },
  {
    reservationId: 12345680,
    spaceName: "게임 파티룸 플레이엔 삼성역점",
    spaceThumbImageUrl: "https://via.placeholder.com/120x120",
    date: "2025-04-10", // 30일 이상 지난 날짜
    startTime: "18:00:00",
    endTime: "19:00:00",
    guestCount: 3,
    hasReview: false,
    useTypes: ["요리 연습"],
  },
  {
    reservationId: 12345681,
    spaceName: "게임 파티룸 플레이엔 삼성역점",
    spaceThumbImageUrl: "https://via.placeholder.com/120x120",
    date: "2025-05-12",
    startTime: "18:00:00",
    endTime: "19:00:00",
    guestCount: 3,
    hasReview: false,
    useTypes: ["요리 연습"],
  },
];
