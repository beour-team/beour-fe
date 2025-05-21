import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; //react-icons

type NewSpace = {
  thumbnail_url: string;
  location: string;
  name: string;
  price_per_hour: number;
};

type NewSpaceUploadProps = {
  space: NewSpace;
  index: number;
};

const NewSpaceUpload = ({ space, index }: NewSpaceUploadProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      key={index}
      className="relative aspect-squre w-[20.4rem] h-[20rem] overflow-hidden flex-shrink-0"
    >
      <img
        src={space.thumbnail_url}
        alt={`새 공간 ${index + 1}`}
        className="rounded-[1.2rem] object-cover w-full h-full"
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
