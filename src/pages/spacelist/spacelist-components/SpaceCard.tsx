import React from "react";
import { calendar2, people, spot, star, threeDot } from "../../../assets/theme";
import SpaceCardMenu from "./spaceCardMenu";

interface Space {
  id: number;
  name: string;
  location: string;
  people: string;
  review: string;
  reviewTotal: string;
  link: string;
}

interface SpaceCardProps {
  space: Space;
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
  return (
    <div className="w-full flex flex-col gap-[1.2rem] border-b border-[#ECECEC] py-[2.7rem] relative">
      <div className="flex gap-[1.6rem] h-[8.2rem]">
        <div className="h-full min-w-[8.2rem] rounded-[1.2rem] bg-[#E9EBEE] overflow-hidden"></div>

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
              <img className="h-[1.5rem]" src={spot} alt="위치 아이콘" />
              {space.location}
            </div>

            <div className="flex items-center text-13-Medium gap-[0.6rem]">
              <img
                className="h-[1.2rem] w-[1.2rem]"
                src={people}
                alt="인원 아이콘"
              />
              최대 {space.people}인
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-[1.7rem] h-[1.7rem] flex items-center justify-center mr-[0.4rem]">
              <img src={star} alt="리뷰 별점 아이콘" />
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-13-SemiBold text-[#313131] pt-[0.1rem]">
                {space.review}
                <span className="text-13-Medium text-[#7E7E7E]">
                  ({space.reviewTotal})
                </span>
              </p>
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
