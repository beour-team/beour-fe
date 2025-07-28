import { useQuery } from "@tanstack/react-query";
import { getReviewableList } from "../../api/Review/ReviewableList";
import type { ReviewableReservation } from "../../api/Review/ReviewableList";

export const useReviewableList = () => {
  return useQuery<ReviewableReservation[], Error>({
    queryKey: ["reviewableList"],
    queryFn: getReviewableList,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });
};
