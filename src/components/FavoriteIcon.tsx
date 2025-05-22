//즐겨찾기(찜?) 기능 별 모양 버튼
import { FaStar, FaRegStar } from "react-icons/fa";

interface FavoriteIconProps {
  isFavorite: boolean;
  className?: string;
}

const FavoriteIcon = ({ isFavorite, className = "" }: FavoriteIconProps) => {
  return isFavorite ? (
    <FaStar className={`text-white text-[2.3rem] ${className}`} />
  ) : (
    <FaRegStar className={`text-white text-[2.3rem] ${className}`} />
  );
};

export default FavoriteIcon;
