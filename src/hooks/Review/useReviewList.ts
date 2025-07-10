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
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("로그인이 필요합니다.");
        return;
      }

      const data = await getReviewList();
      setReviews(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          setError(
            "호스트 권한이 필요합니다. 호스트로 로그인했는지 확인해주세요."
          );
        } else if (err.response?.status === 401) {
          setError("인증이 필요합니다. 다시 로그인해주세요.");
        } else {
          setError(
            err.response?.data?.message ||
              err.message ||
              "알 수 없는 오류가 발생했습니다."
          );
        }
      } else {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      }
    } finally {
      setLoading(false);
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
