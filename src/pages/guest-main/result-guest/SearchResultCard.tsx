import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchResultItem } from "../../../constants/searh-data";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import FavoriteIcon from "../../../components/FavoriteIcon";

interface SearchResultCardProps {
  item: SearchResultItem;
}

const SearchResultCard = ({ item }: SearchResultCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const nav = useNavigate();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className="pb-[2rem] pt-[1rem] flex gap-[2rem] cursor-pointer border-b border-[#ECECEC]"
      onClick={() => nav(`/space/detail/${item.spaceId}`)}
    >
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={item.thumbnail_url}
          alt={item.name}
          className="w-[17rem] h-[18rem] object-cover rounded-[1rem]"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-[1rem] left-[1rem] z-10"
        >
          <FavoriteIcon isFavorite={isFavorite} />
        </button>
      </div>

      <div className="flex flex-col justify-between py-2 h-[18rem]">
        <div>
          <div className="text-[1.5rem] font-semibold pb-[1rem] text-[#313131]">
            {item.name}
          </div>

          <div className="flex items-center text-[1.2rem] pb-[1rem] gap-5">
            <div className="flex gap-[0.4rem] items-center">
              <FaMapMarkerAlt size={14} className="text-[#666666]" />
              <span className="text-[#505050]">{item.address}</span>
            </div>
            <div className="flex gap-[0.4rem] items-center">
              <IoPersonSharp size={14} className="text-[#666666]" />
              <span className="text-[#505050]">최대 {item.guest_count}인</span>
            </div>
          </div>

          <div className="flex text-[1.2rem] pb-[0.8rem] gap-[0.4rem] items-center">
            <GoStarFill className="text-[#FFCC00]" />
            <span className="font-semibold">{item.rating}</span>
          </div>

          <div className="flex gap-3 items-center">
            <div className="rounded-[2rem] bg-[#E9EBEE] px-[1.1rem] py-[0.6rem] text-[#9D9D9D]">
              {item.category}
            </div>
            <div className="rounded-[2rem] bg-[#E9EBEE] px-[1.1rem] py-[0.6rem] text-[#9D9D9D]">
              {item.use}
            </div>
          </div>
        </div>

        <div className="font-black text-[#313131] text-[1.7rem] text-right">
          {item.price_per_hour} 원/시간
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
