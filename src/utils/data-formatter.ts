// 2025-06-13 -> 2025.06.13 (월)
export const formatDateWithDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")} (${days[date.getDay()]})`;
};

// 13:00:00 -> 13:00 으로 수정해주는 함수
export const formatTimeToHHMM = (timeStr: string): string => {
  return timeStr.slice(0, 5);
};

export const formatReservationDateTime = (
  dateStr: string,
  startTime: string,
  endTime: string
): string => {
  return `${formatDateWithDay(dateStr)} ${formatTimeToHHMM(
    startTime
  )} - ${formatTimeToHHMM(endTime)}`;
};
