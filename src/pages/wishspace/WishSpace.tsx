// yarn add tailwind-scrollbar-hide
import { useState } from "react";
import WishSpaceGrid from "./wishspace-components/WishSpaceGrid";
import PageHeader from "../../components/header/PageHeader";

// WishSpaceItem 인터페이스 정의
interface WishSpaceItem {
  spaceId: number;
  spaceName: string;
  region: string;
  maxCapacity: number;
  price: number;
  thumbnailUrl: string;
  like: boolean;
  average: number;
  tags: string[];
}

// 더미 데이터 (실제 API 연동 시 제거 예정)
const dummyList: WishSpaceItem[] = [
  {
    spaceId: 1,
    spaceName: "게임 파티룸 플레이앤 샤인",
    region: "삼성동",
    maxCapacity: 3,
    price: 99000,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 4.2,
    tags: ["파티", "바베큐", "루프탑", "루프탑", "루프탑"],
  },
  {
    spaceId: 2,
    spaceName: "게임 파티룸 플레이앤 샤인",
    region: "삼성동",
    maxCapacity: 3,
    price: 99003,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 4.2,
    tags: ["파티", "바베큐", "루프탑", "루프탑", "루프탑"],
  },
  {
    spaceId: 3,
    spaceName: "우리동네 베이킹 공방",
    region: "마포구",
    maxCapacity: 8,
    price: 85000,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 4.5,
    tags: ["공방", "베이킹", "와이파이"],
  },
  {
    spaceId: 4,
    spaceName: "성수 홈베이킹 스튜디오",
    region: "성동구",
    maxCapacity: 6,
    price: 75000,
    thumbnailUrl: "https://example.com/image.jpg",
    like: true,
    average: 4.0,
    tags: ["성수", "베이킹", "핫플"],
  },
];

const WishSpace = () => {
  // 찜 공간 목록 상태 관리 (12개로 확장)
  const [wishSpaces, setWishSpaces] = useState<WishSpaceItem[]>(() =>
    Array.from({ length: 12 }, (_, i) => {
      const base = dummyList[i % dummyList.length];
      return {
        ...base,
        spaceId: base.spaceId + i * 10,
        spaceName:
          i < 2 ? base.spaceName : `${base.spaceName} ${Math.floor(i / 2) + 1}`,
      };
    })
  );

  // 찜 토글 기능
  const handleToggleLike = (spaceId: number) => {
    setWishSpaces((prev) =>
      prev.map((space) =>
        space.spaceId === spaceId ? { ...space, like: !space.like } : space
      )
    );
  };

  // 공간 상세 페이지로 이동
  const handleCardClick = (spaceId: number) => {
    console.log("카드 클릭:", spaceId);
  };

  return (
    <div className="pb-[2rem] px-[2rem]">
      {/* 페이지 헤더 */}
      <PageHeader>찜 공간</PageHeader>

      {/* 찜 공간 총 개수 표시 */}
      <div className="my-[1.6rem]">
        <p className="text-cr-600 text-13-Medium">총 {wishSpaces.length}개</p>
      </div>

      {/* 찜 공간 그리드 */}
      <WishSpaceGrid
        spaces={wishSpaces}
        onToggleLike={handleToggleLike}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default WishSpace;
