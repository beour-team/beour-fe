import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "../FavoriteIcon";

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

  return (
    <div
      key={spaceId}
      className="relative w-full min-w-0 aspect-[117/114] overflow-hidden rounded-[1.2rem]"
    >
      <img
        src={space.thumbnail_url}
        alt={`새 공간 ${spaceId + 1}`}
        className="object-cover w-full h-full rounded-[1.2rem]"
        onClick={goToDetail}
      />
      <button
        onClick={toggleFavorite}
        className="absolute top-[1rem] right-[1rem] z-10"
      >
        <FavoriteIcon isFavorite={isFavorite} />
      </button>
      <div className="absolute bottom-[1.3rem] left-[1rem] text-white text-shadow-sm">
        <div className="text-[1rem] font-thin">{space.location}</div>
        <div className="text-[1.2rem] font-regular py-3">{space.name}</div>
        <div className="text-[#ccc] pb-2">{space.price_per_hour} 원/시간</div>
      </div>
    </div>
  );
};

export default NewSpaceUpload;
