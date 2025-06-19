import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dummySpace } from "../../constants/dummy-data/spaces";
import type { Space } from "../../types/Space";
import SpaceImageSlider from "./SpaceImageSlider";
import FavoriteIcon from "../../components/FavoriteIcon";
import { area, share, subway, won } from "../../assets/theme";
import BackButton from "../../components/BackButton";
import { IoPersonSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCategoryMap } from "../../constants/space/categoryMap";
import { GoStarFill } from "react-icons/go";
import { FiChevronRight } from "react-icons/fi";
import SpaceFooter from "./SpaceFooter";

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

  if (!space)
    return <div className="text-14-Medium">매장을 찾을 수 없습니다.</div>;

  return (
    <div>
      <div className="pb-[6rem]">
        <div>
          <div className="relative overflow-hidden flex-shrink-0">
            <SpaceImageSlider imageUrls={space.imageUrls} />
            <BackButton
              color="#FFFFFF"
              className="absolute top-[2rem] left-[1rem] z-10"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-[2rem] right-[2rem] z-10"
            >
              <FavoriteIcon isFavorite={isFavorite} />
            </button>
            <img
              src={share}
              alt="공유"
              className="absolute top-[2rem] right-[6rem] z-10 cursor-pointer"
            />
          </div>
          <div className="text-20-SemiBold mt-[2rem] mx-[1.5rem]">
            {space.name}
          </div>
          <div className="flex items-center text-[1.2rem] my-[1.3rem] gap-4 mx-[1.5rem]">
            <div className="flex gap-[0.4rem] items-center">
              <FaMapMarkerAlt className="text-cr-700 text-[1.5rem]" />
              <span className="text-cr-600 text-13-Medium">
                {space.location}
              </span>
            </div>
            <div className="flex gap-[0.4rem] items-center">
              <IoPersonSharp className="text-cr-700 text-[1.5rem]" />
              <span className="text-[#505050] text-13-Medium">
                최대 {space.maxCapacity}인
              </span>
            </div>
            <div className="text-cr-600 bg-cr-300 px-3 py-1 rounded-[0.5rem]">
              {useCategoryMap[space.useCategory]}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 max-w-full mx-[1.5rem]">
            {space.tags.map((tag, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center rounded-[4.9rem] bg-cr-primary px-4 py-1 min-w-[4.4rem] h-[2.5rem]"
              >
                <span className="text-cr-blue text-13-Medium">{tag}</span>
              </div>
            ))}
          </div>
          <div className="mx-[1.5rem] my-[2rem] text-18-ExtraBold">
            {space.pricePerHour}원/시간
          </div>
        </div>
        <div className="border-cr-100 border-[0.4rem]" />

        <div className="flex items-center gap-4 mx-[1.5rem] my-[2rem]">
          <div className="text-13-SemiBold">리뷰</div>
          <div className="flex text-[1.2rem] gap-[0.4rem] items-center">
            <GoStarFill className="text-cr-yellow text-[1.5rem]" />
            <div className="text-13-Bold">{space.avgRating}</div>
          </div>
          <div className="ml-auto flex items-center cursor-pointer">
            <span className="text-12-Bold">전체보기</span>
            <FiChevronRight className="size-[1.5rem] text-cr-black" />
          </div>
        </div>
        <div className="border-cr-100 border-[0.4rem]" />

        <div className="mx-[1.5rem] my-[2rem]">
          <span className="text-13-SemiBold">공간 소개</span>
          <div className="text-14-Medium text-cr-700 my-[1rem] leading-9 whitespace-pre-line">
            {space.description}
          </div>
        </div>

        {/* 기타가격 안내, 공간정보는 호스트에서 입력이 없어요.. */}

        <div className="mx-[1.5rem] my-[2rem]">
          <div>
            <span className="text-13-SemiBold">공간 정보</span>
            <div>주차가능, 와이파이</div>
          </div>
          <div className="my-[1rem]">
            <span className="text-13-SemiBold">공간 안내</span>
            <div className="text-14-Medium text-cr-700 my-[1rem] leading-9 whitespace-pre-line">
              {space.facilityNotice}
            </div>
          </div>
          <div>
            <span className="text-13-SemiBold">주의 사항</span>
            <div className="text-14-Medium text-cr-700 my-[1rem] leading-9 whitespace-pre-line">
              {space.notice}
            </div>
          </div>
        </div>

        {/* 엔터키마다 이미지 넣는건 가능한데 사용자 편의상 입력 시 따로 입력하게 해야할 것 같아요 */}
        <div className="mx-[1.5rem] my-[2rem]">
          <span className="text-13-SemiBold">기타 가격 안내</span>
          <div className="flex items-center gap-2">
            <img src={won} alt="가격" className="w-[1.5rem]" />
            <div className="text-14-Medium text-cr-700 my-[1rem] leading-9 whitespace-pre-line">
              {space.priceGuide}
            </div>
          </div>
        </div>
        <div className="border-cr-100 border-[0.4rem]" />

        <div className="mx-[1.5rem] mt-[2rem]">
          <span className="text-13-SemiBold">위치 정보</span>
          <div className="my-[1rem]">지도</div>
          <div className="flex items-center gap-3 my-[1rem]">
            <img src={area} alt="위치" className="w-[1.2rem]" />
            <div className="text-13-Medium text-cr-700">{space.address}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 mx-[0.8rem] mb-[2rem]">
          <img src={subway} alt="지하철" className="w-[2.4rem]" />
          <div className="text-13-Medium text-cr-700">
            {space.detailAddress}
          </div>
        </div>
        <div className="border-cr-100 border-[0.4rem]" />

        <div className="mx-[1.5rem] my-[2rem]">
          <span className="text-13-SemiBold">환불 정책</span>
          <div className="text-14-Medium text-cr-700 my-[1rem] leading-9 whitespace-pre-line">
            {space.refundPolicy}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white max-w-[41rem] min-w-[32rem] mx-auto">
        <SpaceFooter />
      </div>
    </div>
  );
};

export default SpacePage;
