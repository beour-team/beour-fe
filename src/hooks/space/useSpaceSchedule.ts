import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSpaceAvailableTimes,
  updateSpaceAvailableTimes,
} from "../../api/space/space";
import type {
  UpdateAvailableTimesRequest,
  UpdateAvailableTimesResponse,
} from "../../types/SpaceSchedule";

// 공간 대여 가능 시간 조회 훅
export const useGetSpaceAvailableTimes = (spaceId: number) => {
  return useQuery({
    queryKey: ["spaceAvailableTimes", spaceId],
    queryFn: () => getSpaceAvailableTimes(spaceId),
    enabled: Number.isFinite(spaceId),
    staleTime: 60_000,
  });
};

// 공간 대여 가능 시간 업데이트 훅
export const useUpdateSpaceAvailableTimes = (spaceId: number) => {
  const qc = useQueryClient();

  return useMutation<
    UpdateAvailableTimesResponse,
    Error,
    UpdateAvailableTimesRequest
  >({
    mutationFn: (payload) => updateSpaceAvailableTimes(spaceId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["spaceAvailableTimes", spaceId] });
      console.log("공간 대여 가능 시간 업데이트 성공");
    },
    onError: (e) => {
      console.error("공간 대여 가능 시간 업데이트 실패", e);
    },
  });
};
