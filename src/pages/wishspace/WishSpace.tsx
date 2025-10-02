import { useState, useEffect } from "react";
import WishSpaceGrid from "./wishspace-components/WishSpaceGrid";
import PageHeader from "../../components/header/PageHeader";
import Modal from "../../components/modal/Modal";
import Toast from "../../components/toast/Toast";
import { useWishList } from "../../hooks/WishList/useWishList";
import { useDeleteWishList } from "../../hooks/WishList/useDeleteWishList";
import type { WishSpaceItem } from "../../types/WishSpace";

const WishSpace = () => {
  // 현재 페이지 상태 (0부터 시작)
  const [currentPage, setCurrentPage] = useState(0);

  // API 호출을 통한 찜 목록 데이터 가져오기
  const {
    data: wishSpaceResponse,
    isLoading,
    error,
  } = useWishList(currentPage);

  // 찜 삭제 뮤테이션
  const deleteWishListMutation = useDeleteWishList();

  // 찜 공간 목록 상태 관리 (UI 업데이트를 위해)
  const [localWishSpaces, setLocalWishSpaces] = useState<WishSpaceItem[]>([]);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<WishSpaceItem | null>(
    null
  );

  // 토스트 상태 관리
  const [isToastVisible, setIsToastVisible] = useState(false);

  // API 데이터가 로드되면 로컬 상태 업데이트
  useEffect(() => {
    if (wishSpaceResponse?.spaces) {
      if (currentPage === 0) {
        // 첫 페이지일 때는 새로 설정
        setLocalWishSpaces(wishSpaceResponse.spaces);
      } else {
        // 추가 페이지일 때는 기존 데이터에 추가
        setLocalWishSpaces((prev) => [...prev, ...wishSpaceResponse.spaces]);
      }
    }
  }, [wishSpaceResponse, currentPage]);

  // 찜 삭제 기능 (모달을 통한 확인)
  const handleToggleLike = (spaceId: number) => {
    // 로딩 중이면 클릭 방지
    if (deleteWishListMutation.isPending) {
      return;
    }

    // 찜한 공간 찾기
    const targetSpace = localWishSpaces.find(
      (space) => space.spaceId === spaceId
    );
    if (targetSpace) {
      setSelectedSpace(targetSpace);
      setIsModalOpen(true);
    }
  };

  // 모달에서 삭제 확인
  const handleConfirmDelete = () => {
    if (!selectedSpace) return;

    // 즉시 UI 업데이트 (낙관적 업데이트)
    setLocalWishSpaces((prev) =>
      prev.filter((space) => space.spaceId !== selectedSpace.spaceId)
    );

    // 실제 API 호출
    deleteWishListMutation.mutate(selectedSpace.spaceId, {
      onSuccess: () => {
        // 성공 시 토스트 메시지 표시
        setIsToastVisible(true);
      },
      onError: () => {
        // 에러 발생 시 UI 롤백
        if (wishSpaceResponse?.spaces) {
          setLocalWishSpaces(wishSpaceResponse.spaces);
        }
      },
    });

    // 모달 닫기
    setIsModalOpen(false);
    setSelectedSpace(null);
  };

  // 모달 취소
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedSpace(null);
  };

  // 공간 상세 페이지로 이동
  const handleCardClick = (spaceId: number) => {
    console.log("카드 클릭:", spaceId);
  };

  // 더 많은 데이터 로드하기
  const handleLoadMore = () => {
    if (wishSpaceResponse && !wishSpaceResponse.last) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 로딩 상태
  if (isLoading && currentPage === 0) {
    return (
      <div className="pb-[2rem] px-[2rem]">
        <PageHeader>찜 공간</PageHeader>
        <div className="flex justify-center items-center h-[20rem]">
          <p className="text-cr-600 text-16-Medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="pb-[2rem] px-[2rem]">
        <PageHeader>찜 공간</PageHeader>
        <div className="flex justify-center items-center h-[20rem]">
          <p className="text-cr-600 text-16-Medium">
            {error.message || "찜 목록을 불러오는 중 오류가 발생했습니다."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-[2rem] px-[2rem] relative min-h-screen">
      {/* 페이지 헤더 */}
      <PageHeader>찜 공간</PageHeader>

      {/* 찜 공간 총 개수 표시 */}
      <div className="my-[1.6rem]">
        <p className="text-cr-600 text-13-Medium">
          총 {localWishSpaces.length}개
        </p>
      </div>

      {/* 찜 공간이 없을 때 */}
      {localWishSpaces.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-[1.2rem]">
          <div className="text-18-SemiBold text-cr-black">
            아직 찜한 공간이 없어요
          </div>
          <div className="text-14-Medium text-cr-500 text-center leading-[2.2rem]">
            마음에 드는 공간을 찜해보세요
          </div>
        </div>
      ) : (
        <div>
          {/* 찜 공간 그리드 */}
          <WishSpaceGrid
            spaces={localWishSpaces}
            onToggleLike={handleToggleLike}
            onCardClick={handleCardClick}
          />

          {/* 더보기 버튼 */}
          {wishSpaceResponse && !wishSpaceResponse.last && (
            <div className="flex justify-center mt-[2rem]">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-[2rem] py-[1rem] bg-cr-primary text-white rounded-lg disabled:opacity-50"
              >
                {isLoading ? "로딩 중..." : "더보기"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        title={`[${selectedSpace?.spaceName}]을(를)\n찜 목록에서 삭제하시겠습니까?`}
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmButtonClass="bg-cr-red text-cr-white"
        cancelButtonClass="bg-cr-500 text-cr-white"
      />

      {/* 삭제 완료 토스트 */}
      <Toast
        message="찜 공간에서 삭제했어요"
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
        icon="✓"
      />
    </div>
  );
};

export default WishSpace;
