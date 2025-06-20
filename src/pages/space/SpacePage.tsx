import { useNavigate, useParams } from "react-router-dom";
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
import { PATHS } from "../../routes/paths";
import SpaceFooter from "./SpaceFooter";
import SpaceInformation from "./SpaceInformation";
import SpaceLocation from "./SpaceLocation";
import ExpandableTextSection from "./ExpandableTextSection";

const SpacePage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const nav = useNavigate();

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
      <div className="pb-[6.5rem]">
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
            {/* web share api로 공유하기 */}
            <img
              src={share}
              alt="공유"
              className="absolute top-[2rem] right-[6rem] z-10 cursor-pointer"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: space.name, // 공유 미리보기용 제목
                      text: `${space.name} 공간을 공유합니다.`, // 함께 전송되는 텍스트
                      url: window.location.href,
                    })
                    .then(() => console.log("공유 완료"))
                    .catch((error) => console.error("공유 실패", error));
                } else {
                  alert("현재 브라우저는 공유 기능을 지원하지 않습니다.");
                }
              }}
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
          <div
            className="ml-auto flex items-center cursor-pointer"
            onClick={() => nav(PATHS.GUEST.REVIEW)}
          >
            <span className="text-12-Bold">전체보기</span>
            <FiChevronRight className="size-[1.5rem] text-cr-black" />
          </div>
        </div>
        {/* 리뷰부분 사용할 수 있으면 사용할게요 */}
        <div> 리뷰 컴포넌트 </div>
        <div className="border-cr-100 border-[0.4rem]" />

        <ExpandableTextSection title="공간 소개" content={space.description} />

        {/* 기타가격 안내, 공간정보는 호스트에서 입력이 없어요.. */}

        <div className="mx-[1.5rem] my-[2rem]">
          <span className="text-13-SemiBold">공간 정보</span>
          <div className="my-[1rem]">
            <SpaceInformation />
          </div>
        </div>
        <ExpandableTextSection
          title="공간 안내"
          content={space.facilityNotice}
        />

        <ExpandableTextSection title="주의 사항" content={space.notice} />

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
          <div className="my-[1rem]">
            <SpaceLocation address={space.address} />
          </div>
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

        <ExpandableTextSection title="환불 정책" content={space.refundPolicy} />
      </div>

      <div className="fixed bottom-0 left-1 right-0 z-50 bg-white max-w-[41.5rem] min-w-[32rem] mx-auto rounded-t-[1rem]">
        <SpaceFooter />
      </div>
    </div>
  );
};

export default SpacePage;
