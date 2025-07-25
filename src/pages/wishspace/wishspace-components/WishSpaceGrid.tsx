import WishSpaceCard from "./WishSpaceCard";
import type { WishSpaceItem } from "../../../types/WishSpace";

interface WishSpaceGridProps {
  spaces: WishSpaceItem[];
  onToggleLike?: (spaceId: number) => void;
  onCardClick?: (spaceId: number) => void;
}

const WishSpaceGrid = ({
  spaces,
  onToggleLike,
  onCardClick,
}: WishSpaceGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-[1.2rem] gap-y-[2.4rem] ">
      {spaces.map((item) => (
        <WishSpaceCard
          key={item.spaceId}
          item={item}
          onToggleLike={onToggleLike}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default WishSpaceGrid;
