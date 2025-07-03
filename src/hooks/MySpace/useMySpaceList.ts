import { useQuery } from "@tanstack/react-query";
import type { MySpaceList } from "../../types/MySpace";
import { getMySpaceList } from "../../api/MySpace/MySpaceList";

export const useMySpaceList = () => {
  return useQuery<MySpaceList, Error>({
    queryKey: ["mySpaceList"],
    queryFn: getMySpaceList,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });
};
