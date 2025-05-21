import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

type NewSpace = {
  thumbnail_url: string;
  location: string;
  name: string;
  price_per_hour: number;
};

type NewSpaceUploadProps = {
  space: NewSpace;
  spaceId: number;
};

const NewSpaceUpload = ({ space, spaceId }: NewSpaceUploadProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const nav = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const goToDetail = () => {
    nav(`/space/detail/${spaceId}`);
  };

  //시간이 된다면 여기 스크롤말고 다른 방법으로 바꿔보기
  return (
    <div
      key={spaceId}
      className="relative aspect-squre w-[20.4rem] h-[20rem] overflow-hidden flex-shrink-0"
    >
      <img
        src={space.thumbnail_url}
        alt={`새 공간 ${spaceId + 1}`}
        className="rounded-[1.2rem] object-cover w-full h-full"
        onClick={goToDetail}
      />
      <button
        onClick={toggleFavorite}
        className="absolute top-[1rem] right-[1rem] z-10"
      >
        {isFavorite ? (
          <FaStar className="text-white text-[2.3rem]" />
        ) : (
          <FaRegStar className="text-white text-[2.3rem]" />
        )}
      </button>
      <div className="absolute bottom-[1.3rem] left-[1rem] text-white text-shadow-sm">
        <div className="text-[1rem] font-thin">{space.location}</div>
        <div className="text-[1.2rem] font-regular py-3">{space.name}</div>
        <div className="text-[#888] pb-2">{space.price_per_hour} 원/시간</div>
      </div>
    </div>
  );
};

export default NewSpaceUpload;
