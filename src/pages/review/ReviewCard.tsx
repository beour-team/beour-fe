import ReviewComment from "./ReviewComment";

interface Review {
  id: number;
  comment: string;
  created_at: string;
  nickname: string;
  rating: number;
}

interface ReviewCardProps {
  reviews: Review[];
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
                  <img
                    className="w-[3.6rem] h-[3.6rem] bg-cr-500 rounded-full object-cover"
                    src=""
                    alt="프로필"
                  />
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
                <div className="text-13-Medium">
                  게임 파티룸 플레이앤 삼성역점
                </div>
              </div>
              <img
                className="w-[7rem] h-[7rem] rounded-[0.8rem] object-cover bg-cr-500"
                src="https://via.placeholder.com/60"
                alt="썸네일"
              />
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
