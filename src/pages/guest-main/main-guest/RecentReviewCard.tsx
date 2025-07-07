import { FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { placemark } from "../../../assets/theme";
import { formatRelativeTime } from "../../../utils/relative-time";
import { useNavigate } from "react-router-dom";

type Review = {
  space_id: number;
  name: string;
  nickname: string;
  rating: number;
  comment: string;
  created_at: string;
  review_images: { image_url: string }[];
};

const RecentReviewCard = ({
  space_id,
  name,
  nickname,
  rating,
  comment,
  created_at,
  review_images,
}: Review) => {
  const nav = useNavigate();

  const goToDetail = () => {
    nav(`/space/${space_id}`);
  };

  return (
    <div>
      <div className="bg-cr-100 relative rounded-[1.2rem] w-[32.3rem] h-[20.2rem]">
        <div className="bg-cr-blue w-[32.3rem] h-[5.1rem] rounded-t-[1.2rem] rounded-b-none">
          <div className="flex">
            <div
              className="flex items-center gap-2 px-[1.5rem] py-[1.5rem] cursor-pointer"
              onClick={goToDetail}
            >
              <img src={placemark} alt="공간 장소" className="w-[2.4rem]" />
              <span className="text-13-Medium text-cr-white">{name}</span>
              <FiChevronRight className="size-[2rem] text-cr-white" />
            </div>
          </div>
          <div
            className="px-[1.5rem] py-[1.5rem] cursor-pointer"
            onClick={() => nav("/guestreview")} // 리뷰페이지 이동
          >
            <div className="flex items-center gap-4">
              <span className="text-14-SemiBold">{nickname}</span>
              <span className="text-12-Medium text-cr-600">
                {formatRelativeTime(created_at)}
              </span>
            </div>
            <div className="my-[1rem] flex">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FaStar
                  key={idx}
                  className={`size-[1.6rem] ${
                    idx < rating ? "text-cr-yellow" : "text-cr-400"
                  }`}
                />
              ))}
            </div>
            {/* 한 줄이랑 세줄 ... 중에 뭐가 나으려나 */}
            <div className="text-14-Medium leading-[2rem] truncate">
              {comment}
            </div>
          </div>
        </div>
        <img
          // 몇 개를 넣든 대표사진만 보이게 해둠
          src={review_images?.[0]?.image_url}
          alt="공간 사진"
          className="absolute right-[2rem] top-[1.8rem] w-[6.9rem] h-[6.8rem] z-50 rounded-[1rem]"
        />
      </div>
    </div>
  );
};

export default RecentReviewCard;
