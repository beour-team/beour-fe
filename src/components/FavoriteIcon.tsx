//즐겨찾기(찜?) 기능 별 모양 버튼
import { FaStar } from "react-icons/fa";

interface FavoriteIconProps {
  isFavorite: boolean;
  className?: string;
}

const FavoriteIcon = ({ isFavorite, className = "" }: FavoriteIconProps) => {
  return isFavorite ? (
    <FaStar className={`text-cr-yellow text-[2.3rem] ${className}`} />
  ) : (
    <FaStar className={`text-cr-400 text-[2.3rem] ${className}`} />
  );
};

export default FavoriteIcon;
