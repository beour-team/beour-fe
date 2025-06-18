// 2025-06-13 -> 2025.06.13 (월)
// 13:00:00 -> 13:00 으로 수정해주는 함수

export const formatReservationDateTime = (
  dateStr: string,
  startTime: string,
  endTime: string
) => {
  const date = new Date(dateStr);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  //padStart -> 항상 2자리 수로 맞추기
  const formattedDate = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} (${
    dayNames[date.getDay()]
  })`;
  const formattedStartTime = startTime.slice(0, 5);
  const formattedEndTime = endTime.slice(0, 5);

  return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
};
