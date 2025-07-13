import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchResultItem } from "../../../constants/dummy-data/search-data";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import FavoriteIcon from "../../../components/FavoriteIcon";
import { PATHS } from "../../../routes/paths";

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
      className="py-[1rem] flex gap-[2rem] cursor-pointer border-b border-[#ECECEC]"
      onClick={() => nav(`${PATHS.SPACE}/${item.id}`)}
    >
      <div className="relative overflow-hidden flex-shrink-0 pb-[1rem]">
        <img
          src={item.thumbnail_url}
          alt={item.name}
          className="w-[12.7rem] h-[15.8rem] object-cover rounded-[1rem]"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-[1rem] left-[1rem] z-10"
        >
          <FavoriteIcon isFavorite={isFavorite} />
        </button>
      </div>

      <div className="flex flex-col justify-between py-2 ">
        <div className="text-18-SemiBold pb-[1.4rem]">{item.name}</div>

        <div className="flex items-center text-[1.2rem] pb-[1.4rem] gap-4">
          <div className="flex gap-[0.4rem] items-center">
            <FaMapMarkerAlt className="text-cr-700 text-[1.5rem]" />
            <span className="text-cr-600 text-13-Medium">{item.address}</span>
          </div>
          <div className="flex gap-[0.4rem] items-center">
            <IoPersonSharp className="text-cr-700 text-[1.5rem]" />
            <span className="text-[#505050]">최대 {item.max_capacity}인</span>
          </div>
        </div>

        <div className="flex text-[1.2rem] pb-[1rem] gap-[0.4rem] items-center">
          <GoStarFill className="text-cr-yellow text-[1.5rem]" />
          <span className="text-13-Bold">{item.avg_rating}</span>
        </div>

        <div className="w-full overflow-hidden">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full">
            {item.tags.map((tag, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center rounded-[4.9rem] bg-cr-primary px-4 py-1 min-w-[4.4rem] h-[2.5rem]"
              >
                <span className="text-cr-blue text-13-Medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-18-ExtraBold text-right pt-[1.5rem]">
          {item.price_per_hour}원/시간
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
