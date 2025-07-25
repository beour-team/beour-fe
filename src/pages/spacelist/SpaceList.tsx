import PageHeader from "../../components/header/PageHeader";
import { useState } from "react";
import SpaceCard from "./spacelist-components/SpaceCard";
import { useMySpaceList } from "../../hooks/MySpace/useMySpaceList";
import { useDeleteMySpace } from "../../hooks/MySpace/useDeleteMySpace";
import Modal from "../../components/modal/Modal";
import { plus } from "../../assets/theme";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import FloatingAddButton from "./spacelist-components/FloatingAddButton";
import SpaceSchedule from "../space-schedule/SpaceSchedule";
import type { MySpace } from "../../types/MySpace";

const SpaceList = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null);
  const [selectedSpaceName, setSelectedSpaceName] = useState<string>("");
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<MySpace | null>(null);

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

  const handleScheduleOpen = (space: MySpace) => {
    setSelectedSpace(space);
    setScheduleModalOpen(true);
  };

  const handleScheduleClose = () => {
    setScheduleModalOpen(false);
    setSelectedSpace(null);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="relative px-[2rem] min-h-screen pb-[8rem] bg-cr-white">
        <PageHeader>내 공간</PageHeader>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-[1.2rem]">
          <div className="text-18-SemiBold text-cr-black">
            공간을 불러오는 중...
          </div>
          <div className="text-14-Medium text-cr-500 text-center leading-[2.2rem]">
            잠시만 기다려주세요
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
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-[1.2rem]">
          <div className="text-18-SemiBold text-cr-black">
            문제가 발생했어요
          </div>
          <div className="text-14-Medium text-cr-500 text-center leading-[2.2rem]">
            잠시 후 다시 시도해주세요
          </div>
        </div>
      </div>
    );
  }

  const spaces = spaceList || [];

  return (
    <div className="relative px-[2rem] min-h-screen pb-[8rem] bg-white">
      <PageHeader>내 공간</PageHeader>
      <div className="w-full text-13-Medium text-cr-600 mb-[1.2rem]">
        총 {spaces.length}개
      </div>

      {spaces.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-[1.2rem]">
          <div className="text-18-SemiBold text-cr-black">
            아직 등록된 공간이 없어요
          </div>
          <div className="text-14-Medium text-cr-500 text-center leading-[2.2rem]">
            우측의 [+공간 추가] 버튼을 눌러 매장을 추가하고
            <br />
            비어있는 게스트에게 대여해보세요
          </div>
          <Link
            to={PATHS.HOST.SPACE_REGISTER}
            className="px-[1.6rem] py-[1.4rem] bg-cr-black text-cr-white rounded-[2.2rem] text-14-Medium flex items-center gap-[0.8rem] mt-[2.4rem]"
          >
            <img src={plus} alt="plus" />
            공간 추가
          </Link>
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
            onScheduleOpen={handleScheduleOpen}
          />
        ))
      )}

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title={`[ ${selectedSpaceName} ]을\n내 공간에서 삭제하시겠어요?\n\n삭제 후엔 복구가 불가능해요`}
        confirmText={isDeleting ? "삭제 중..." : "삭제하기"}
        cancelText="닫기"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* 메뉴 오버레이 */}
      {openMenuId !== null && (
        <div
          className="fixed inset-0 z-0"
          onClick={handleMenuClose}
          aria-hidden="true"
        />
      )}

      {/* 플로팅 공간 추가 버튼 */}
      <FloatingAddButton />

      {/* 스케줄 팝업 */}
      <SpaceSchedule
        isOpen={scheduleModalOpen}
        onClose={handleScheduleClose}
        spaceName={selectedSpace?.spaceName}
        spaceId={selectedSpace?.spaceId}
      />
    </div>
  );
};

export default SpaceList;
