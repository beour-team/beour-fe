import { BlackStar, people, spot, star } from "../../../assets/theme";
import SpaceTagScroll from "./SpaceTagScroll";
import type { WishSpaceItem } from "../../../types/WishSpace";

interface WishSpaceCardProps {
  item: WishSpaceItem;
  onToggleLike?: (spaceId: number) => void;
  onCardClick?: (spaceId: number) => void;
}

const WishSpaceCard = ({
  item,
  onToggleLike,
  onCardClick,
}: WishSpaceCardProps) => {
  // 좋아요 버튼 클릭 시 이벤트 버블링을 막고 좋아요 상태를 토글
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike?.(item.spaceId);
  };

  // 카드 전체 클릭 시 공간 상세페이지로 이동
  const handleCardClick = () => {
    onCardClick?.(item.spaceId);
  };

  return (
    <div
      className="bg-white overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 공간 썸네일 이미지 및 좋아요 버튼 */}
      <div className="relative w-full h-[17.2rem] bg-cr-500 rounded-[1.2rem]">
        <img
          src={item.thumbnailUrl}
          alt={item.spaceName}
          className="w-full h-full object-cover"
        />

        {/* 좋아요 토글 버튼 */}
        <button
          className="absolute top-[1.2rem] right-[1.2rem] z-10"
          onClick={handleLikeClick}
        >
          {item.like ? (
            <img src={star} className="h-[2.4rem] w-[2.4rem]" />
          ) : (
            <img src={BlackStar} className="h-[2.4rem] w-[2.4rem]" />
          )}
        </button>
      </div>

      {/* 공간 정보 표시 영역 */}
      <div className="pt-[1rem] flex flex-col gap-[0.8rem]">
        {/* 공간명 표시 */}
        <h3
          className="text-16-Bold text-cr-black line-clamp-1"
          title={item.spaceName}
        >
          {item.spaceName}
        </h3>

        {/* 위치 및 수용인원 정보 */}
        <div className="flex items-center gap-[1.2rem] text-cr-600">
          {/* 공간 위치 */}
          <div className="flex items-center gap-[0.4rem]">
            <img src={spot} className="h-[1.4rem] w-[1.4rem]" />
            <span className="text-13-Medium">{item.region}</span>
          </div>

          {/* 최대 수용인원 */}
          <div className="flex items-center gap-[0.4rem]">
            <img src={people} className="h-[1.2rem] w-[1.2rem]" />
            <span className="text-13-Medium">최대 {item.maxCapacity}인</span>
          </div>
        </div>

        {/* 평점 표시 */}
        <div className="flex items-center gap-[0.4rem]">
          <img src={star} className="h-[1.6rem] w-[1.6rem]" />
          <span className="text-13-Medium text-cr-black">
            {item.average.toFixed(1)}
            <span className="text-cr-500">({item.reviewCount})</span>
          </span>
        </div>

        {/* 공간 태그 리스트 */}
        <SpaceTagScroll tags={item.tags} />

        {/* 시간당 가격 */}
        <div className="text-16-ExtraBold text-cr-black mt-[0.4rem]">
          {item.price.toLocaleString()}원/시간
        </div>
      </div>
    </div>
  );
};

export default WishSpaceCard;
