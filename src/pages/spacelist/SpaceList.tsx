import PageHeader from "../../components/header/PageHeader";
import { useState } from "react";
import SpaceCard from "./spacelist-components/SpaceCard";
import { useMySpaceList } from "../../hooks/MySpace/useMySpaceList";
import { useDeleteMySpace } from "../../hooks/MySpace/useDeleteMySpace";
import Modal from "../../components/modal/Modal";

const SpaceList = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null);
  const [selectedSpaceName, setSelectedSpaceName] = useState<string>("");

  // API 호출
  const { data: spaceList, isLoading, error } = useMySpaceList();
  const { mutate: deleteSpace, isPending: isDeleting } = useDeleteMySpace();

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
    const space = spaceList?.find((space) => space.spaceId === id);
    setSelectedSpaceId(id);
    setSelectedSpaceName(space?.spaceName || "");
    setDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedSpaceId !== null) {
      deleteSpace(selectedSpaceId, {
        onSuccess: () => {
          // 삭제 성공 시 모달 닫기
          setDeleteModalOpen(false);
          setSelectedSpaceId(null);
          setSelectedSpaceName("");
        },
        onError: () => {
          // 에러 발생 시 모달은 열어둠 (사용자가 다시 시도할 수 있도록)
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSelectedSpaceId(null);
    setSelectedSpaceName("");
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="relative px-[2rem] min-h-screen pb-[8rem] bg-white">
        <PageHeader>내 공간</PageHeader>
        <div className="flex justify-center items-center h-[20rem]">
          <div className="text-16-Medium text-[#656565]">
            공간 목록을 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="relative px-[2rem] min-h-screen pb-[8rem] bg-white">
        <PageHeader>내 공간</PageHeader>
        <div className="flex flex-col justify-center items-center h-[20rem] gap-[1rem]">
          <div className="text-16-Medium text-red-500">{error.message}</div>
          <button
            className="px-[2rem] py-[1rem] bg-cr-blue text-white rounded-[0.8rem] text-14-SemiBold"
            onClick={() => window.location.reload()}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const spaces = spaceList || [];

  return (
    <div className="relative px-[2rem] min-h-screen pb-[8rem] bg-white">
      <PageHeader>내 공간</PageHeader>
      <div className="w-full text-13-Medium text-[#656565] mb-[1.2rem]">
        총 {spaces.length}개
      </div>

      {spaces.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[30rem] gap-[1.6rem]">
          <div className="text-18-Medium text-[#656565]">
            등록된 공간이 없습니다
          </div>
          <button
            className="px-[2rem] py-[1rem] bg-cr-blue text-white rounded-[0.8rem] text-14-SemiBold"
            onClick={() => console.log("공간 등록 페이지로 이동")}
          >
            첫 번째 공간 등록하기
          </button>
        </div>
      ) : (
        spaces.map((space) => (
          <SpaceCard
            key={space.spaceId}
            space={space}
            menuOpen={openMenuId === space.spaceId}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title={`「${selectedSpaceName}」을\n내 공간에서 삭제하시겠어요?`}
        message="삭제 후엔 복구가 불가능해요"
        confirmText={isDeleting ? "삭제 중..." : "삭제하기"}
        cancelText="닫기"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmButtonClass="bg-[#4C8EFF] text-white"
        cancelButtonClass="bg-[#9CA3AF] text-white"
      />

      {/* 메뉴 오버레이 */}
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
