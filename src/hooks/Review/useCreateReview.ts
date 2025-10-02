import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../api/Review/CreateReview";
import type {
  CreateReviewRequest,
  CreateReviewResponse,
} from "../../api/Review/CreateReview";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateReviewResponse,
    Error,
    CreateReviewRequest
  >({
    mutationFn: createReview,
    onSuccess: (data) => {
      console.log("🎉 [리뷰 작성] 성공:", data);
      console.log("📝 [리뷰 작성] 작성된 리뷰 ID:", data.reviewId);

      // 관련 쿼리 무효화 (리뷰 목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ["reviewableList"] });
      queryClient.invalidateQueries({ queryKey: ["writtenReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewList"] });
    },
    onError: (error, variables) => {
      console.error("❌ [리뷰 작성] 실패:", error.message);
      console.error("📝 [리뷰 작성] 실패한 데이터:", {
        reservationId: variables.reservationId,
        rating: variables.rating,
        content: variables.content,
        imageCount: variables.images?.length || 0,
      });
    },
  });

  return {
    createReview: mutation.mutate,
    createReviewAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
    reset: mutation.reset,
  };
};
