import React from "react";
import SpaceCardMenu from "./SpaceCardMenu";
import { calendar2, people, spot, threeDot } from "../../../assets/theme";
import type { MySpace } from "../../../types/MySpace";

interface SpaceCardProps {
  space: MySpace;
  menuOpen: boolean;
  onMenuOpen: (id: number) => void;
  onMenuClose: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  space,
  menuOpen,
  onMenuOpen,
  onMenuClose,
  onEdit,
  onDelete,
}) => {
  // 카테고리와 용도를 한국어로 변환하는 함수 (필요에 따라 수정)
  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      WORKSHOP: "공방",
      STUDIO: "스튜디오",
      CAFE: "카페",
      // 필요한 카테고리 추가
    };
    return categoryMap[category] || category;
  };

  const getUseName = (use: string) => {
    const useMap: { [key: string]: string } = {
      PRACTICE: "연습",
      MEETING: "회의",
      PARTY: "파티",
      // 필요한 용도 추가
    };
    return useMap[use] || use;
  };

  return (
    <div className="w-full flex flex-col gap-[1.2rem] border-b border-[#ECECEC] py-[2.7rem] relative">
      <div className="flex gap-[1.6rem] h-[8.2rem]">
        {/* 썸네일 이미지 */}
        <div className="h-full min-w-[8.2rem] rounded-[1.2rem] bg-[#E9EBEE] overflow-hidden">
          {space.thumbnail_url && (
            <img
              src={space.thumbnail_url}
              alt={space.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-[1rem]">
          <div className="flex items-start justify-between">
            <h2 className="text-18-SemiBold pt-[0.4rem]">{space.name}</h2>

            <button className="ml-2 p-1" onClick={() => onMenuOpen(space.id)}>
              <img src={threeDot} alt="3점 아이콘" />
            </button>

            {menuOpen && (
              <SpaceCardMenu
                onClose={onMenuClose}
                onEdit={() => onEdit(space.id)}
                onDelete={() => onDelete(space.id)}
              />
            )}
          </div>

          <div className="flex gap-[1.2rem]">
            <div className="flex items-center text-13-Medium gap-[0.6rem]">
              <img className="h-[1.5rem]" src={spot} alt="카테고리 아이콘" />
              {getCategoryName(space.category)}
            </div>

            <div className="flex items-center text-13-Medium gap-[0.6rem]">
              <img
                className="h-[1.2rem] w-[1.2rem]"
                src={people}
                alt="용도 아이콘"
              />
              {getUseName(space.use)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-13-SemiBold text-[#313131]">
                시간당 {space.price_per_hour.toLocaleString()}원
              </div>
            </div>
            <div
              className={`text-13-Medium px-[0.8rem] py-[0.4rem] rounded-[0.4rem] ${
                space.status === "ACTIVE"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {space.status === "ACTIVE" ? "운영중" : "운영중지"}
            </div>
          </div>
        </div>
      </div>

      <button className="w-full h-[4.4rem] bg-cr-blue text-cr-white rounded-[0.8rem] py-[1.2rem] flex items-center justify-center text-14-SemiBold gap-[0.4rem]">
        <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
          <img src={calendar2} alt="달력 아이콘" />
        </div>
        대여 가능 일시 등록
      </button>
    </div>
  );
};

export default SpaceCard;
