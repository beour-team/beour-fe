import { getDistance } from "./get-distance";
import { SearchData } from "../constants/dummy-data/search-data";
import type { SearchResultItem } from "../constants/dummy-data/search-data";

declare global {
  interface Window {
    kakao: any;
  }
}

export function searchSpaces(
  keyword: string,
  onComplete: (
    center: { lat: number; lng: number },
    results: SearchResultItem[]
  ) => void
) {
  if (!window.kakao?.maps) {
    console.warn("Kakao Maps SDK가 아직 로드되지 않았습니다.");
    return;
  }

  window.kakao.maps.load(() => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (
        data: any,
        status: any
      ) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          data.length > 0
        ) {
          const target = {
            lat: parseFloat(data[0].y),
            lng: parseFloat(data[0].x),
          };

          //거리 계산 후 정렬 (가까운 순)
          const allSpaces = Object.values(SearchData).flat();
          const keywordLower = keyword.toLowerCase();
          const sorted = allSpaces
            .filter(
              (space) =>
                space.name.toLowerCase().includes(keywordLower) ||
                space.address.toLowerCase().includes(keywordLower)
            )
            .sort((a, b) => {
              const distA = getDistance(target.lat, target.lng, a.lat, a.lng);
              const distB = getDistance(target.lat, target.lng, b.lat, b.lng);
              return distA - distB;
            });

          onComplete(target, sorted.length > 0 ? sorted : allSpaces);
        } else {
          alert("검색 결과가 없습니다.");
        }
      }
    );
  });
}
