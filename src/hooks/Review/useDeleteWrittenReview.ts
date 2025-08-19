import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWrittenReview } from "../../api/Review/ReviewList";

export const useDeleteWrittenReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, number>({
    mutationFn: deleteWrittenReview,
    onSuccess: (_, reviewId) => {
      console.log("🎉 [리뷰 삭제] 성공:", reviewId);

      // 관련 쿼리 무효화 (리뷰 목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ["writtenReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviewableList"] });
      queryClient.invalidateQueries({ queryKey: ["reviewList"] });
    },
    onError: (error, reviewId) => {
      console.error("❌ [리뷰 삭제] 실패:", error.message);
      console.error("📝 [리뷰 삭제] 실패한 리뷰 ID:", reviewId);
    },
  });

  return {
    deleteReview: mutation.mutate,
    deleteReviewAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};
