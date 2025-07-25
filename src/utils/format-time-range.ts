// 10:00, 11:00, 14:00, 15:00 선택했을 때
// 10:00-12:00, 14:00-16:00로 보이게 하는 함수 (+1씩 해줌)

export const padTime = (hour: number): string => {
  return hour.toString().padStart(2, "0");
};

export const formatTimeRanges = (times: string[]): string => {
  if (times.length === 0) return "";

  const sorted = times
    .map((t) => parseInt(t.split(":")[0]))
    .sort((a, b) => a - b);

  const ranges: string[] = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    if (current === end + 1) {
      end = current;
    } else {
      ranges.push(`${padTime(start)}:00-${padTime(end + 1)}:00`);
      start = end = current;
    }
  }
  ranges.push(`${padTime(start)}:00-${padTime(end + 1)}:00`);

  return ranges.join(", ");
};
