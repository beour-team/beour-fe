import React from "react";
import SpaceCardMenu from "./SpaceCardMenu";
import { calendar2, people, spot, star, threeDot } from "../../../assets/theme";
import type { MySpace } from "../../../types/MySpace";

interface SpaceCardProps {
  space: MySpace;
  menuOpen: boolean;
  onMenuOpen: (id: number) => void;
  onMenuClose: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onScheduleOpen: (space: MySpace) => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  space,
  menuOpen,
  onMenuOpen,
  onMenuClose,
  onEdit,
  onDelete,
  onScheduleOpen,
}) => {
  return (
    <div className="w-full flex flex-col gap-[1.2rem] border-b border-[#ECECEC] py-[2.7rem] relative">
      <div className="flex gap-[1.6rem] h-[8.2rem]">
        {/* 썸네일 이미지 */}
        <div className="h-full min-w-[8.2rem] rounded-[1.2rem] bg-[#E9EBEE] overflow-hidden">
          {space.thumbnailUrl && (
            <img
              src={space.thumbnailUrl}
              alt={space.spaceName}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-[1rem]">
          <div className="flex items-start justify-between">
            <h2 className="text-18-SemiBold pt-[0.4rem]">{space.spaceName}</h2>

            <button
              className="ml-[0.8rem] p-[0.4rem ]"
              onClick={() => onMenuOpen(space.spaceId)}
            >
              <img src={threeDot} alt="3점 아이콘" />
            </button>

            {menuOpen && (
              <SpaceCardMenu
                onClose={onMenuClose}
                onEdit={() => onEdit(space.spaceId)}
                onDelete={() => onDelete(space.spaceId)}
              />
            )}
          </div>

          <div className="flex items-center text-13-Medium gap-[0.6rem]">
            <img className="h-[1.5rem]" src={spot} alt="주소 아이콘" />
            {space.address}
            <div className="text-13-SemiBold text-[#313131] flex items-center gap-[0.4rem]">
              <img src={people} alt="인원 아이콘" />
              최대 {space.maxCapacity}명
            </div>
          </div>

          <div className="flex items-center justify-between w-fit gap-[0.4rem]">
            <img src={star} alt="별점" className="w-[1.2rem] h-[1.2rem]" />
            <span className="text-13-Bold text-cr-black">
              {space.avgRating.toFixed(1)}
              <span className="text-13-Medium text-cr-500">
                ({space.reviewCount})
              </span>
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onScheduleOpen(space)}
        className="w-full h-[4.4rem] bg-cr-blue text-cr-white rounded-[0.8rem] py-[1.2rem] flex items-center justify-center text-14-SemiBold gap-[0.4rem]"
      >
        <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
          <img src={calendar2} alt="달력 아이콘" />
        </div>
        대여 가능 일시 등록
      </button>
    </div>
  );
};

export default SpaceCard;
