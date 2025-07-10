// 리뷰 컴포넌트 부분
import { FaStar } from "react-icons/fa";
import { spot } from "../../assets/theme";
import ExpandableText from "../../components/review/ExpandableText";
import { formatRelativeTime } from "../../utils/relative-time";
import { formatDateWithDay } from "../../utils/data-formatter";

interface SpaceReviewProps {
  id: number;
  nickname: string;
  rating: number;
  comment: string;
  created_at: string;
  name: string;
  review_images: { image_url: string }[];
}

const SpaceReview = ({
  id,
  nickname,
  rating,
  comment,
  created_at,
  name,
  review_images,
}: SpaceReviewProps) => {
  return (
    <div>
      <div className="bg-cr-100 w-[32.7rem] min-h-[19rem] rounded-[1.2rem] px-[2rem] py-[2rem]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-end gap-3 mb-[0.5rem]">
              <p className="text-14-SemiBold">{nickname}</p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={`size-[1.6rem] ${
                      idx < rating ? "text-cr-yellow" : "text-cr-400"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-12-Regular text-cr-700 mb-[1.2rem]">
              {formatRelativeTime(created_at)}
            </p>

            <div className="flex items-center gap-2 mb-[0.5rem]">
              <img src={spot} />
              <p className="text-13-Medium text-cr-600">{name}</p>
            </div>
            <p className="text-13-Medium text-cr-600 mb-[1.2rem]">
              {formatDateWithDay(created_at)} 이용
            </p>
          </div>
          <img
            // 대표사진만 보이게
            src={review_images[0]?.image_url}
            alt="리뷰 사진"
            className="w-[6.9rem] h-[6.8rem] rounded-[1rem]"
          />
        </div>

        <ExpandableText id={id} text={comment} />
      </div>
    </div>
  );
};
export default SpaceReview;
