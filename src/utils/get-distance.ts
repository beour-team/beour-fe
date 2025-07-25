// 백엔드와 연동 시 거리 계산 필요 X
export function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const rad = Math.PI / 180;
  const dLat = lat2 * rad - lat1 * rad;
  const dLng = lng2 * rad - lng1 * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000; // 거리
}
