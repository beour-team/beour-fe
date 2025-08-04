// 주변 공간 조회 API 호출
import { useState, useEffect } from "react";
import type { NearbySpace } from "../../types/map/NearbySpace";
import { fetchNearbySpaces } from "../../api/map/map";

export const useNearbySpaces = (lat: number | null, lng: number | null) => {
  const [spaces, setSpaces] = useState<NearbySpace[]>([]);

  useEffect(() => {
    if (lat == null || lng == null) return;

    const fetch = async () => {
      try {
        const data = await fetchNearbySpaces(lat, lng);
        setSpaces(data);
      } catch (e) {
        console.error("주변 공간 조회 실패:", e);
      }
    };

    fetch();
  }, [lat, lng]);

  return spaces;
};
