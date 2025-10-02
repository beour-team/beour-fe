import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWrittenReviews } from "../../api/Review/ReviewList";
import type { WrittenReviewsData } from "../../api/Review/ReviewList";

export const useWrittenReviews = (pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(0);

  const queryResult = useQuery<WrittenReviewsData, Error>({
    queryKey: ["writtenReviews", currentPage, pageSize],
    queryFn: () => getWrittenReviews(currentPage, pageSize),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });

  // 데이터 변경시 콘솔 로그 출력
  useEffect(() => {
    if (queryResult.data) {
      console.log("📋 [작성한 리뷰] API 응답 데이터:", queryResult.data);
      console.log(`📄 총 ${queryResult.data.reviews.length}개의 리뷰`);
      console.log(
        `📊 페이징 정보: ${currentPage + 1}/${
          queryResult.data.totalPage
        }, 마지막: ${queryResult.data.last}`
      );
    }
  }, [queryResult.data, currentPage]);

  // 에러 발생시 콘솔 로그 출력
  useEffect(() => {
    if (queryResult.error) {
      console.error("❌ [작성한 리뷰] API 에러:", queryResult.error);
    }
  }, [queryResult.error]);

  // 페이지 네비게이션 함수들
  const goToPage = (page: number) => {
    if (page >= 0 && queryResult.data && page < queryResult.data.totalPage) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (queryResult.data && !queryResult.data.last) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    ...queryResult,
    currentPage: currentPage + 1, // 1-based로 반환
    totalPages: queryResult.data?.totalPage || 0,
    isLastPage: queryResult.data?.last || true,
    goToPage,
    nextPage,
    prevPage,
  };
};
