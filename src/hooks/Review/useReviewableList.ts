import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviewableList } from "../../api/Review/ReviewableList";
import type {
  ReviewableReservationsData,
  ReviewableReservation,
} from "../../api/Review/ReviewableList";

interface UseReviewableListReturn {
  data: ReviewableReservation[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  isLastPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useReviewableList = (
  pageSize: number = 10
): UseReviewableListReturn => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, error } = useQuery<
    ReviewableReservationsData,
    Error
  >({
    queryKey: ["reviewableList", currentPage, pageSize],
    queryFn: () => getReviewableList(currentPage, pageSize),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });

  // 에러 발생시 콘솔 로그 출력
  useEffect(() => {
    if (error) {
      console.error("❌ [리뷰 작성 가능 목록] API 에러:", error);
    }
  }, [error]);

  const goToPage = (page: number) => {
    if (page >= 0 && (!data || page < data.totalPage)) {
      console.log(`📄 [페이징] 페이지 이동: ${currentPage + 1} → ${page + 1}`);
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (data && !data.last) {
      console.log(
        `📄 [페이징] 다음 페이지: ${currentPage + 1} → ${currentPage + 2}`
      );
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      console.log(
        `📄 [페이징] 이전 페이지: ${currentPage + 1} → ${currentPage}`
      );
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    data: data?.reservations || [],
    isLoading,
    error,
    currentPage,
    totalPages: data?.totalPage || 0,
    isLastPage: data?.last || true,
    goToPage,
    nextPage,
    prevPage,
  };
};
