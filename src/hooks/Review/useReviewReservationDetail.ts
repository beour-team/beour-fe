import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviewReservationDetail } from "../../api/Review/ReviewReservationDetail";
import type { ReviewReservationDetail } from "../../api/Review/ReviewReservationDetail";

export const useReviewReservationDetail = (reservationId: number) => {
  const queryResult = useQuery<ReviewReservationDetail, Error>({
    queryKey: ["reviewReservationDetail", reservationId],
    queryFn: () => getReviewReservationDetail(reservationId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
    enabled: !!reservationId, // reservationId가 있을 때만 쿼리 실행
  });

  // 데이터 변경시 콘솔 로그 출력
  useEffect(() => {
    if (queryResult.data) {
      console.log(
        "📋 [리뷰 작성용 예약 정보] API 응답 데이터:",
        queryResult.data
      );
      console.log(
        `📄 예약 ID: ${queryResult.data.reservationId}, 공간: ${queryResult.data.spaceName}`
      );
    }
  }, [queryResult.data]);

  // 에러 발생시 콘솔 로그 출력
  useEffect(() => {
    if (queryResult.error) {
      console.error("❌ [리뷰 작성용 예약 정보] API 에러:", queryResult.error);
    }
  }, [queryResult.error]);

  return queryResult;
};
