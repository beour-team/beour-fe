import { useState, useEffect } from "react";
import {
  getSpaceAvailableTimes,
  updateSpaceAvailableTimes,
} from "../../api/space/space";
import type {
  SpaceAvailableTimesResponse,
  UpdateAvailableTimesRequest,
  UpdateAvailableTimesResponse,
} from "../../types/SpaceSchedule";

interface UseSpaceScheduleReturn {
  data: SpaceAvailableTimesResponse | null; // 조회된 데이터
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지
  refetch: () => void; // 데이터 다시 가져오기
  updateAvailableTimes: (
    availableTimes: UpdateAvailableTimesRequest
  ) => Promise<UpdateAvailableTimesResponse>; // 대여 가능 시간 업데이트
  updating: boolean; // 업데이트 중 상태
}

export const useSpaceSchedule = (spaceId?: number): UseSpaceScheduleReturn => {
  const [data, setData] = useState<SpaceAvailableTimesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchData = async () => {
    // spaceId가 없으면 데이터를 가져오지 않음
    if (!spaceId) return;

    setLoading(true);
    setError(null);

    try {
      console.log("🔄 공간 스케줄 데이터 가져오는 중...", spaceId);
      const result = await getSpaceAvailableTimes(spaceId);
      console.log("✅ 공간 스케줄 데이터 가져오기 성공:", result);
      setData(result);
    } catch (err) {
      console.error("❌ 공간 스케줄 데이터 가져오기 실패:", err);
      setError(
        err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  // spaceId가 바뀔 때마다 데이터를 새로 가져옴
  useEffect(() => {
    fetchData();
  }, [spaceId]);

  // 대여 가능 시간 업데이트 함수
  const updateAvailableTimes = async (
    availableTimes: UpdateAvailableTimesRequest
  ): Promise<UpdateAvailableTimesResponse> => {
    if (!spaceId) {
      throw new Error("spaceId가 필요합니다");
    }

    setUpdating(true);
    setError(null);

    try {
      console.log(
        "📝 [useSpaceSchedule] 대여 가능 시간 업데이트 시작:",
        availableTimes
      );
      const result = await updateSpaceAvailableTimes(spaceId, availableTimes);
      console.log(
        "📝 [useSpaceSchedule] 대여 가능 시간 업데이트 성공:",
        result
      );

      // 업데이트 후 데이터 다시 가져오기
      await fetchData();

      return result;
    } catch (err) {
      console.error("📝 [useSpaceSchedule] 대여 가능 시간 업데이트 실패:", err);
      setError(err instanceof Error ? err.message : "업데이트에 실패했습니다");
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    updateAvailableTimes,
    updating,
  };
};
