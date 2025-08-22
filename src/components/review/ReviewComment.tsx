import { useState } from "react";
import ReviewReply from "./ReviewReply";
import WrittenReply from "./WrittenReply";
import type { ReviewCardData } from "../../types/Review";
import type { WrittenComment } from "../../api/Review/WrittenComments";

interface ReviewProps {
  review: ReviewCardData;
  onCommentCreated?: () => void; // 답글 작성 성공 시 호출될 콜백
  writtenComment?: WrittenComment; // 작성한 답글 데이터 (호스트 탭에서 사용)
  showWrittenReply?: boolean; // 작성한 답글을 표시할지 여부
  onCommentDeleted?: () => void; // 답글 삭제 성공 시 호출될 콜백
}

const ReviewComment = ({
  review,
  onCommentCreated,
  writtenComment,
  showWrittenReply,
  onCommentDeleted,
}: ReviewProps) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const isLong = (text: string) => text.length > 65;

  return (
    <div className="w-full flex flex-col pt-[0.6rem]">
      <div className="text-14-Medium leading-[2.2rem] break-words relative">
        {!expanded[review.id] && isLong(review.comment) ? (
          <span>
            {review.comment.slice(0, 70)}...
            <button
              onClick={() =>
                setExpanded((prev) => ({ ...prev, [review.id]: true }))
              }
              className="text-cr-400 text-[1.3rem] pl-[0.4rem]"
            >
              더보기
            </button>
          </span>
        ) : (
          <span>
            {review.comment}
            {isLong(review.comment) && (
              <button
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [review.id]: false,
                  }))
                }
                className="text-cr-400 text-[1.3rem] pl-[0.4rem]"
              >
                접기
              </button>
            )}
          </span>
        )}
      </div>

      {/* 답글 작성 기능이 있을 때만 답글 입력창 표시 */}
      {onCommentCreated && (
        <ReviewReply reviewId={review.id} onCommentCreated={onCommentCreated} />
      )}

      {/* 작성한 답글 표시 (호스트 탭에서 사용) */}
      {showWrittenReply && writtenComment && (
        <WrittenReply
          comment={writtenComment}
          onCommentDeleted={onCommentDeleted}
        />
      )}
    </div>
  );
};

export default ReviewComment;
