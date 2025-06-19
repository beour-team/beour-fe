import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dummySpace } from "../../constants/dummy-data/spcaes";
import type { Space } from "../../types/Space";
import SpaceImageSlider from "./SpaceImageSlider";
import FavoriteIcon from "../../components/FavoriteIcon";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    if (spaceId && Number(spaceId) === dummySpace.id) {
      setSpace(dummySpace);
    } else {
      setSpace(null);
    }
  }, [spaceId]);

  if (!space) return <div>매장을 찾을 수 없습니다.</div>;

  return (
    <div>
      <div>
        <div className="relative overflow-hidden flex-shrink-0">
          <SpaceImageSlider imageUrls={space.imageUrls} />
          <button
            onClick={toggleFavorite}
            className="absolute top-[2rem] right-[2rem] z-10"
          >
            <FavoriteIcon isFavorite={isFavorite} />
          </button>
        </div>
        <div className="text-20-SemiBold my-[2rem] mx-[1rem]">{space.name}</div>
        <div>
          <div>{space.location}</div>
        </div>
      </div>
      <div>회색선</div>

      <div>리뷰</div>

      <div>공간 소개</div>
      <div>공간 정보, 공간 안내, 주의사항</div>
      <div>기타 가격 안내</div>
      <div>회색선</div>
      <div>위치 정보</div>
      <div>회색선</div>
      <div>환불 정책</div>
      <div>문의하기, 예약하기</div>
    </div>
  );
};

export default SpacePage;
