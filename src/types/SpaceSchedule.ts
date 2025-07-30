// 시간대 정보 (시작시간-종료시간)
export interface TimeSlot {
  date: string; // 날짜 (예: "2025-07-10")
  startTime: string; // 시작 시간 (예: "09:00")
  endTime: string; // 종료 시간 (예: "12:00")
}

// 공간 대여 가능 시간 조회 API 응답
export interface SpaceAvailableTimesResponse {
  spaceId: number; // 공간 ID
  editableTimeSlots: TimeSlot[]; // 수정 가능한 시간대들
  nonEditableTimeSlots: TimeSlot[]; // 수정 불가능한 시간대들 (예약된 시간)
}

// 공간 스케줄 설정 시 사용하는 데이터
export interface SpaceScheduleData {
  selectedDates: Date | undefined; // 선택된 날짜
  selectedTime: string[]; // 선택된 시간들
  isHoliday: boolean; // 휴무일 여부
  applyToAll: boolean; // 모든 일자 적용 여부
}

// 공간 대여 가능 시간 수정 API 요청 데이터
export interface UpdateAvailableTimesRequest {
  availableTimes: TimeSlot[]; // 새로운 대여 가능 시간 목록
}

// 공간 대여 가능 시간 수정 API 응답 데이터
export interface UpdateAvailableTimesResponse {
  code: number; // 응답 코드
  message: string; // 응답 메시지
  data: null; // 응답 데이터 (없음)
}
