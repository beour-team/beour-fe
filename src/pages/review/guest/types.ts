// 리뷰 작성용 예약 데이터 타입
export type ReviewableReservation = {
  reservationId: number;
  spaceName: string;
  spaceThumbImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  hasReview: boolean;
  useTypes: string[]; // 사용 목적 태그들
};
