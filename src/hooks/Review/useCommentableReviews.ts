import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import {
  getCommentableReviews,
  type CommentableReview,
  type CommentableReviewsData,
} from "../../api/Review/CommentableReviews";

// 커스텀 훅의 반환 타입 정의
interface UseCommentableReviewsReturn {
  // 데이터 상태
  reviews: CommentableReview[]; // 현재 페이지의 리뷰 목록
  totalReviews: CommentableReview[]; // 지금까지 로드된 모든 리뷰 (무한 스크롤용)

  // 로딩 및 에러 상태
  loading: boolean; // 데이터 로딩 중인지 여부
  loadingMore: boolean; // 추가 데이터 로딩 중인지 여부 (무한 스크롤용)
  error: string | null; // 에러 메시지

  // 페이징 정보
  currentPage: number; // 현재 페이지 번호 (0부터 시작)
  totalPages: number; // 전체 페이지 수
  hasNextPage: boolean; // 다음 페이지가 있는지 여부
  isLastPage: boolean; // 마지막 페이지인지 여부

  // 액션 함수들
  refetch: () => void; // 첫 페이지부터 다시 불러오기
  loadNextPage: () => void; // 다음 페이지 불러오기 (무한 스크롤용)
  goToPage: (page: number) => void; // 특정 페이지로 이동
}

// 호스트가 답글을 작성할 수 있는 리뷰 목록을 관리하는 커스텀 훅
export const useCommentableReviews = (
  pageSize: number = 10 // 한 페이지당 보여줄 리뷰 개수 (기본값 10개)
): UseCommentableReviewsReturn => {
  // 상태 관리
  const [reviews, setReviews] = useState<CommentableReview[]>([]); // 현재 페이지 리뷰
  const [totalReviews, setTotalReviews] = useState<CommentableReview[]>([]); // 전체 로드된 리뷰
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [loadingMore, setLoadingMore] = useState(false); // 추가 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [isLastPage, setIsLastPage] = useState(true); // 마지막 페이지 여부

  // 특정 페이지의 리뷰를 가져오는 함수
  const fetchReviews = useCallback(
    async (
      page: number,
      isLoadMore: boolean = false // 추가 로딩인지 여부
    ) => {
      try {
        // 로딩 상태 설정
        if (isLoadMore) {
          setLoadingMore(true); // 추가 로딩 시작
        } else {
          setLoading(true); // 일반 로딩 시작
          setError(null); // 이전 에러 초기화
        }

        console.log(`📄 [Hook] 페이지 ${page + 1} 리뷰 데이터 요청 중...`);

        // API 호출 (토큰 처리는 api.ts에서 자동 처리)
        const data: CommentableReviewsData = await getCommentableReviews(
          page,
          pageSize
        );

        console.log(`✅ [Hook] 페이지 ${page + 1} 데이터 로드 성공:`, data);

        // 상태 업데이트
        if (isLoadMore) {
          // 무한 스크롤: 기존 리뷰에 새로운 리뷰 추가
          setTotalReviews((prev) => [...prev, ...data.reviews]);
        } else {
          // 일반 페이징: 현재 페이지 리뷰만 설정
          setReviews(data.reviews);
          setTotalReviews(data.reviews); // 첫 페이지인 경우 전체도 초기화
        }

        // 페이징 정보 업데이트
        setCurrentPage(page);
        setTotalPages(data.totalPage);
        setIsLastPage(data.last);
      } catch (err) {
        // 에러 발생시 메시지 설정
        console.error(`❌ [Hook] 페이지 ${page + 1} 로드 실패:`, err);

        if (err instanceof AxiosError && err.response?.data?.message) {
          setError(err.response.data.message); // 백엔드 에러 메시지 사용
        } else if (err instanceof Error) {
          setError(err.message); // 일반 에러 메시지
        } else {
          setError("답글 작성 가능한 리뷰를 불러오는데 실패했습니다."); // 기본 에러 메시지
        }
      } finally {
        // 로딩 상태 종료
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [pageSize]
  );

  // 첫 페이지부터 다시 불러오기
  const refetch = useCallback(() => {
    console.log("🔄 [Hook] 리뷰 목록 새로고침");
    setCurrentPage(0); // 페이지를 0으로 리셋
    fetchReviews(0, false); // 첫 페이지 로드
  }, [fetchReviews]);

  // 다음 페이지 불러오기 (무한 스크롤용)
  const loadNextPage = useCallback(() => {
    if (!loadingMore && !isLastPage) {
      const nextPage = currentPage + 1;
      console.log(`➡️ [Hook] 다음 페이지 로드: ${nextPage + 1}`);
      fetchReviews(nextPage, true); // 추가 로딩으로 다음 페이지 요청
    } else {
      if (isLastPage) {
        console.log("ℹ️ [Hook] 마지막 페이지입니다.");
      }
      if (loadingMore) {
        console.log("ℹ️ [Hook] 이미 로딩 중입니다.");
      }
    }
  }, [currentPage, isLastPage, loadingMore, fetchReviews]);

  // 특정 페이지로 이동 (일반 페이징용)
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages && page !== currentPage) {
        console.log(`🎯 [Hook] 페이지 ${page + 1}로 이동`);
        fetchReviews(page, false); // 해당 페이지 로드
      } else {
        console.log(`⚠️ [Hook] 잘못된 페이지 번호: ${page + 1}`);
      }
    },
    [totalPages, currentPage, fetchReviews]
  );

  // 컴포넌트 마운트 시 첫 페이지 로드
  useEffect(() => {
    console.log("🚀 [Hook] useCommentableReviews 초기화");
    fetchReviews(0, false);
  }, [fetchReviews]);

  // 계산된 값들
  const hasNextPage = !isLastPage; // 다음 페이지 존재 여부

  return {
    // 데이터
    reviews,
    totalReviews,

    // 상태
    loading,
    loadingMore,
    error,

    // 페이징 정보
    currentPage,
    totalPages,
    hasNextPage,
    isLastPage,

    // 액션
    refetch,
    loadNextPage,
    goToPage,
  };
};
