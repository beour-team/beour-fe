import React from "react";
import { edit, trash } from "../../../assets/theme";

interface SpaceCardMenuProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SpaceCardMenu: React.FC<SpaceCardMenuProps> = ({
  // onClose,
  onEdit,
  onDelete,
}) => (
  <div className="absolute flex flex-col h-[8rem] justify-between right-0 top-[4rem] z-10 bg-white border border-cr-300 rounded-[1rem] w-[12rem] py-[1.2rem] px-[1.2rem] shadow-lg">
    <button
      className="w-full flex items-center gap-[1rem] text-left text-14-Medium text-cr-black hover:bg-cr-100 rounded-[0.4rem] "
      onClick={onEdit}
    >
      <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <img src={edit} alt="편집 아이콘" />
      </div>
      공간 수정
    </button>

    <button
      className="w-full flex items-center gap-[1rem] text-left text-14-Medium text-cr-black hover:bg-cr-100 rounded-[0.4rem] "
      onClick={onDelete}
    >
      <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <img src={trash} alt="휴지통 아이콘" />
      </div>
      공간 삭제
    </button>
  </div>
);

export default SpaceCardMenu;
