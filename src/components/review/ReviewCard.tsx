import ReviewComment from "./ReviewComment";
import type { ReviewCardData } from "../../types/Review";

interface ReviewCardProps {
  reviews: ReviewCardData[];
}

const ReviewCard = ({ reviews }: ReviewCardProps) => {
  return (
    <>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="w-full border-b border-cr-200 pt-[1.6rem] pb-[2.4rem]"
        >
          <div className="flex flex-col items-start justify-between mx-[2rem]">
            <div className="flex items-center gap-[0.8rem] h-[7rem] justify-between w-full">
              <div className="flex flex-col justify-between h-full">
                <div className="flex gap-[0.6rem]">
                  <div className="w-[3.6rem] h-[3.6rem] bg-cr-500 rounded-full flex items-center justify-center">
                    {/* 프로필 이미지가 없을 때 기본 아바타 */}
                    <span className="text-white text-16-Medium">
                      {review.nickname?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="flex flex-col h-[3.6rem] justify-between">
                    <div className="flex items-center gap-[0.6rem]">
                      <span className="text-[1.5rem] font-semibold">
                        {review.nickname}
                      </span>
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <input
                            key={n}
                            type="radio"
                            name={`rating-${review.id}`}
                            className="mask mask-star bg-yellow-400"
                            checked={review.rating === n}
                            readOnly
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-[1.3rem] text-cr-600">1일 전</div>
                  </div>
                </div>
                <div className="text-13-Medium flex items-center gap-[0.4rem]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="mt-[0.1rem]"
                  >
                    <path
                      d="M6 1C4.67392 1 3.40215 1.52678 2.46447 2.46447C1.52678 3.40215 1 4.67392 1 6C1 7.32608 1.52678 8.59785 2.46447 9.53553C3.40215 10.4732 4.67392 11 6 11C7.32608 11 8.59785 10.4732 9.53553 9.53553C10.4732 8.59785 11 7.32608 11 6C11 4.67392 10.4732 3.40215 9.53553 2.46447C8.59785 1.52678 7.32608 1 6 1ZM6 7.5C5.60218 7.5 5.22064 7.34196 4.93934 7.06066C4.65804 6.77936 4.5 6.39782 4.5 6C4.5 5.60218 4.65804 5.22064 4.93934 4.93934C5.22064 4.65804 5.60218 4.5 6 4.5C6.39782 4.5 6.77936 4.65804 7.06066 4.93934C7.34196 5.22064 7.5 5.60218 7.5 6C7.5 6.39782 7.34196 6.77936 7.06066 7.06066C6.77936 7.34196 6.39782 7.5 6 7.5Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                  {review.place_name}
                </div>
              </div>
              <div className="relative">
                <img
                  className="w-[7rem] h-[7rem] rounded-[0.8rem] object-cover bg-cr-500"
                  src="https://via.placeholder.com/60"
                  alt="썸네일"
                />
                {review.image_count > 1 && (
                  <div className="absolute top-[0.4rem] right-[0.4rem] bg-black bg-opacity-60 text-white text-[1.2rem] font-medium px-[0.6rem] py-[0.2rem] rounded-[0.4rem]">
                    +{review.image_count}
                  </div>
                )}
              </div>
            </div>

            {/* 리뷰 내용 */}
            <ReviewComment review={review} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewCard;
