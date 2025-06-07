import { useState } from "react";
import ReviewReply from "./ReviewReply";

interface ReviewProps {
  review: {
    id: number;
    comment: string;
    created_at: string;
  };
}

const ReviewComment = ({ review }: ReviewProps) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const isLong = (text: string) => text.length > 65;

  return (
    <div className="w-full flex flex-col pt-[0.6rem]">
      <div className="text-13-Medium text-cr-500 mt-[0.2rem] pb-[1.6rem]">
        {review.created_at}
      </div>

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

      <ReviewReply />
    </div>
  );
};

export default ReviewComment;
