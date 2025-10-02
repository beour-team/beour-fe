import { useState } from "react";
import { AxiosError } from "axios";
import {
  createReviewComment,
  type CreateReviewCommentRequest,
} from "../../api/Review/CommentableReviews";

// 커스텀 훅의 반환 타입 정의
interface UseCreateReviewCommentReturn {
  // 상태
  loading: boolean; // 답글 작성 중인지 여부
  error: string | null; // 에러 메시지
  success: boolean; // 답글 작성 성공 여부

  // 액션 함수들
  createComment: (reviewId: number, content: string) => Promise<void>; // 답글 작성 함수
  resetState: () => void; // 상태 초기화 함수
}

// 호스트가 리뷰에 답글을 작성하는 기능을 관리하는 커스텀 훅
export const useCreateReviewComment = (): UseCreateReviewCommentReturn => {
  // 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [success, setSuccess] = useState(false); // 성공 상태

  // 답글 작성 함수
  const createComment = async (
    reviewId: number,
    content: string
  ): Promise<void> => {
    // 입력 값 검증
    if (!content.trim()) {
      setError("답글 내용을 입력해주세요.");
      return;
    }

    if (content.trim().length < 5) {
      setError("답글은 최소 5자 이상 입력해주세요.");
      return;
    }

    if (content.trim().length > 500) {
      setError("답글은 최대 500자까지 입력할 수 있습니다.");
      return;
    }

    try {
      // 로딩 시작
      setLoading(true);
      setError(null); // 이전 에러 초기화
      setSuccess(false); // 이전 성공 상태 초기화

      console.log(`📝 [Hook] 답글 작성 시작 - 리뷰 ID: ${reviewId}`);

      // 요청 데이터 준비
      const requestData: CreateReviewCommentRequest = {
        reviewId,
        content: content.trim(),
      };

      // API 호출 (토큰 처리는 api.ts에서 자동 처리)
      await createReviewComment(requestData);

      // 성공 처리
      setSuccess(true);
      console.log(`✅ [Hook] 답글 작성 성공 - 리뷰 ID: ${reviewId}`);
    } catch (err) {
      // 에러 발생시 메시지 설정
      console.error(`❌ [Hook] 답글 작성 실패 - 리뷰 ID: ${reviewId}`, err);

      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message); // 백엔드 에러 메시지 사용
      } else if (err instanceof Error) {
        setError(err.message); // 일반 에러 메시지
      } else {
        setError("답글을 작성하는데 실패했습니다."); // 기본 에러 메시지
      }
      setSuccess(false); // 성공 상태 초기화
    } finally {
      // 로딩 상태 종료
      setLoading(false);
    }
  };

  // 상태 초기화 함수 (새로운 답글 작성 전이나 컴포넌트 언마운트 시 사용)
  const resetState = (): void => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    console.log("🔄 [Hook] 답글 작성 상태 초기화");
  };

  return {
    // 상태
    loading,
    error,
    success,

    // 액션
    createComment,
    resetState,
  };
};
