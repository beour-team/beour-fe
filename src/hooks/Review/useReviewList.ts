import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getReviewList } from "../../api/Review/ReviewList";
import type { ReviewListResponse } from "../../api/Review/ReviewList";

interface UseReviewListReturn {
  reviews: ReviewListResponse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useReviewList = (): UseReviewListReturn => {
  const [reviews, setReviews] = useState<ReviewListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true); // 로딩 시작
      setError(null); // 이전 에러 초기화

      // API 호출 (토큰 처리는 api.ts에서 자동 처리)
      const data = await getReviewList();
      setReviews(data); // 성공시 데이터 저장
    } catch (err) {
      // 에러 발생시 메시지 설정 (api.ts에서 이미 토큰/권한 처리 완료)
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message); // 백엔드 에러 메시지 사용
      } else {
        setError("리뷰를 불러오는데 실패했습니다."); // 기본 에러 메시지
      }
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
  };
};
