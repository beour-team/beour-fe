import { useState } from "react";
import { AxiosError } from "axios";
import { deleteReviewComment } from "../../api/Review/WrittenComments";

// 커스텀 훅의 반환 타입 정의
interface UseDeleteReviewCommentReturn {
  // 상태
  loading: boolean; // 답글 삭제 중인지 여부
  error: string | null; // 에러 메시지
  success: boolean; // 답글 삭제 성공 여부

  // 액션 함수들
  deleteComment: (commentId: number) => Promise<void>; // 답글 삭제 함수
  resetState: () => void; // 상태 초기화 함수
}

// 호스트가 작성한 답글을 삭제하는 기능을 관리하는 커스텀 훅
export const useDeleteReviewComment = (): UseDeleteReviewCommentReturn => {
  // 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [success, setSuccess] = useState(false); // 성공 상태

  // 답글 삭제 함수
  const deleteComment = async (commentId: number): Promise<void> => {
    try {
      // 로딩 시작
      setLoading(true);
      setError(null); // 이전 에러 초기화
      setSuccess(false); // 이전 성공 상태 초기화

      console.log(`🗑️ [Hook] 답글 삭제 시작 - 답글 ID: ${commentId}`);

      // API 호출 (토큰 처리는 api.ts에서 자동 처리)
      await deleteReviewComment(commentId);

      // 성공 처리
      setSuccess(true);
      console.log(`✅ [Hook] 답글 삭제 성공 - 답글 ID: ${commentId}`);
    } catch (err) {
      // 에러 발생시 메시지 설정
      console.error(`❌ [Hook] 답글 삭제 실패 - 답글 ID: ${commentId}`, err);

      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message); // 백엔드 에러 메시지 사용
      } else if (err instanceof Error) {
        setError(err.message); // 일반 에러 메시지
      } else {
        setError("답글을 삭제하는데 실패했습니다."); // 기본 에러 메시지
      }
      setSuccess(false); // 성공 상태 초기화
    } finally {
      // 로딩 상태 종료
      setLoading(false);
    }
  };

  // 상태 초기화 함수 (새로운 삭제 작업 전이나 컴포넌트 언마운트 시 사용)
  const resetState = (): void => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    console.log("🔄 [Hook] 답글 삭제 상태 초기화");
  };

  return {
    // 상태
    loading,
    error,
    success,

    // 액션
    deleteComment,
    resetState,
  };
};
