import { useRef, useState } from "react";
import { useCreateReviewComment } from "../../hooks/Review/useCreateReviewComment";

interface ReviewReplyProps {
  reviewId: number; // 답글을 달 리뷰의 ID
  onCommentCreated?: () => void; // 답글 작성 성공 시 호출될 콜백
}

const ReviewReply = ({ reviewId, onCommentCreated }: ReviewReplyProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState("");

  // 답글 작성 훅 사용
  const { loading, error, success, createComment, resetState } =
    useCreateReviewComment();

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이 초기화
      textarea.style.height = textarea.scrollHeight + "px"; // 실제 내용에 맞게 재조정
    }
  };

  // 답글 제출 핸들러
  const handleSubmit = async () => {
    if (!content.trim()) {
      return; // 빈 내용은 제출하지 않음
    }

    await createComment(reviewId, content);

    // 성공 시 처리
    if (!error) {
      setContent(""); // 입력창 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = "5rem"; // 높이 초기화
      }
      onCommentCreated?.(); // 콜백 호출 (부모 컴포넌트에서 데이터 새로고침 등)
    }
  };

  // 성공 시 상태 초기화 (useEffect 대신 직접 처리)
  if (success && content === "") {
    resetState();
  }
  return (
    <div className="w-full relative mt-[2rem]">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`textarea w-full rounded-[1rem] focus:outline-none focus:border-none border-none text-14-Medium leading-[2rem] no-scrollbar resize-none pr-[6.2rem] py-[1.4rem] h-[5rem] focus:ring-0 ${
          error ? "bg-red-100 border-red-300" : "bg-cr-200"
        }`}
        placeholder="답글을 달아주세요"
        onInput={handleInput}
        disabled={loading}
        rows={1}
        maxLength={500}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !content.trim()}
        className={`mx-[2rem] text-14-SemiBold absolute z-10 w-[2.6rem] right-0 bottom-[1.8rem] ${
          loading || !content.trim()
            ? "text-cr-400 cursor-not-allowed"
            : "text-cr-800 hover:text-cr-900 cursor-pointer"
        }`}
      >
        {loading ? "..." : "등록"}
      </button>

      {/* 에러 메시지 표시 */}
      {error && (
        <div className="mt-[0.8rem] text-red-500 text-12-Medium">{error}</div>
      )}

      {/* 성공 메시지 표시 */}
      {success && (
        <div className="mt-[0.8rem] text-green-500 text-12-Medium">
          답글이 성공적으로 작성되었습니다.
        </div>
      )}
    </div>
  );
};
export default ReviewReply;
