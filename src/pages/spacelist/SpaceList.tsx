import PageHeader from "../../components/header/PageHeader";
import { SPACELIST } from "../../constants/space/spacelist";
import { useState } from "react";
// import FloatingAddButton from "./spacelist-components/FloatingAddButton";
import SpaceCard from "./spacelist-components/SpaceCard";

const SpaceList = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleMenuOpen = (id: number) => {
    setOpenMenuId(id);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const handleEdit = (id: number) => {
    console.log(`공간 수정: ${id}`);
    // 추후 수정 페이지로 이동하는 로직 추가
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    console.log(`공간 삭제: ${id}`);
    // 추후 삭제 확인 모달 또는 API 호출 로직 추가
    setOpenMenuId(null);
  };

  return (
    <div className="relative px-[2rem] min-h-screen pb-[8rem] bg-white">
      <PageHeader>내 공간</PageHeader>
      <div className="w-full text-13-Medium text-[#656565] mb-[1.2rem]">
        총 {SPACELIST.length}개
      </div>

      {SPACELIST.map((space) => (
        <SpaceCard
          key={space.id}
          space={space}
          menuOpen={openMenuId === space.id}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {/* <FloatingAddButton /> */}

      {openMenuId !== null && (
        <div
          className="fixed inset-0 z-0"
          onClick={handleMenuClose}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default SpaceList;
