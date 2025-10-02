import { useQuery } from "@tanstack/react-query";
import type { MySpaceListResponse } from "../../types/MySpace";
import { getMySpaceList } from "../../api/MySpace/MySpaceList";

export const useMySpaceList = (page: number = 0) => {
  return useQuery<MySpaceListResponse, Error>({
    queryKey: ["mySpaceList", page],
    queryFn: () => getMySpaceList(page),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });
};
