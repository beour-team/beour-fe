// 게스트 예약 상세 (예약 신청완료 페이지 아님)
export interface guestReservationDetail {
  reservationId: number;
  guestName: string;
  guestPhoneNumber: string;
  spaceName: string;
  spacePhoneNumber: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  guestCount: number;
  status: string;
  usagePurpose: string;
  requestMessage: string;
}
