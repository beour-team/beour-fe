import { useState } from "react";
import type { WrittenReview } from "../../../api/Review/ReviewList";
import { spot, edit, trash } from "../../../assets/theme";
import { useDeleteWrittenReview } from "../../../hooks/Review/useDeleteWrittenReview";

interface WrittenReviewCardProps {
  review: WrittenReview;
}

const WrittenReviewCard = ({ review }: WrittenReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 리뷰 삭제 훅
  const { deleteReview, isLoading: isDeleting } = useDeleteWrittenReview();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 상대적 시간 계산 (1일 전, 2일 전 등)
  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "오늘";
    } else if (diffInDays === 1) {
      return "1일 전";
    } else {
      return `${diffInDays}일 전`;
    }
  };

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-[1.6rem] ${
          index < rating ? "text-cr-yellow" : "text-cr-400"
        }`}
      >
        ★
      </span>
    ));
  };

  // 리뷰 내용이 긴지 확인 (대략 2줄 기준 - 약 80자)
  const isLongContent = review.reviewContent.length > 80;

  // 2줄에 맞게 텍스트 자르기 (더보기 포함)
  const getTruncatedContent = () => {
    if (!isLongContent || isExpanded) {
      return review.reviewContent;
    }
    // 대략 2줄에 해당하는 길이에서 "...더보기" 공간을 고려하여 자르기
    const maxLength = 95;
    return review.reviewContent.substring(0, maxLength);
  };

  // 메뉴 토글
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 닫기
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // 수정 버튼 클릭
  const handleEdit = () => {
    console.log("리뷰 수정:", review.reviewId);
    // TODO: 리뷰 수정 기능 구현
    setIsMenuOpen(false);
  };

  // 삭제 버튼 클릭 (모달 열기)
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setIsMenuOpen(false);
  };

  // 삭제 확인
  const handleDeleteConfirm = () => {
    deleteReview(review.reviewId);
    setShowDeleteModal(false);
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="py-[3.2rem] relative border-b border-cr-200">
      {/* 우측 상단 더보기 버튼 */}
      <div className="absolute top-0 right-[0.4rem]">
        <button
          className="text-cr-500 p-[0.8rem]"
          onClick={handleMenuToggle}
          disabled={isDeleting}
        >
          <span className="text-[1.8rem]">⋯</span>
        </button>

        {/* 수정/삭제 메뉴 */}
        {isMenuOpen && (
          <>
            {/* 배경 오버레이 (메뉴 외부 클릭 시 닫기) */}
            <div className="fixed inset-0 z-[5]" onClick={handleMenuClose} />

            {/* 메뉴 팝업 */}
            <div className="absolute flex flex-col gap-[0.8rem] justify-between right-[0.4rem] top-[3.2rem] z-10 bg-white border border-cr-300 rounded-[1rem] w-[8rem] py-[1.2rem] px-[1.2rem] shadow-lg">
              <button
                className="w-full flex justify-between items-center text-left text-14-Medium text-cr-black hover:bg-cr-100"
                onClick={handleEdit}
              >
                <div className="min-w-[2.4rem] h-[2.4rem] flex items-center justify-center">
                  <img src={edit} alt="편집 아이콘" className="h-[1.6rem]" />
                </div>
                <p className="text-14-Medium text-cr-black">수정</p>
              </button>

              <button
                className="w-full flex justify-between items-center text-left text-14-Medium text-cr-black hover:bg-cr-100"
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
                  <img src={trash} alt="휴지통 아이콘" className="h-[1.6rem]" />
                </div>
                <p className="text-14-Medium text-cr-black">삭제</p>
              </button>
            </div>
          </>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-cr-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-cr-white flex flex-col justify-between gap-[2rem] rounded-[1.6rem] p-[1.6rem] w-[30rem]">
            <div className="flex flex-col gap-[1.6rem]">
              <p className="text-16-SemiBold text-cr-black whitespace-pre-line leading-[2.6rem]">
                리뷰를 삭제하시겠어요?
                <br />
                <span className="text-14-Medium text-cr-500">
                  삭제 후엔 복구가 불가능해요
                </span>
              </p>
            </div>

            <div className="flex gap-[0.4rem]">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 h-[4.8rem] rounded-[0.8rem] text-14-SemiBold bg-cr-500 text-cr-white"
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 h-[4.8rem] rounded-[0.8rem] text-14-SemiBold bg-cr-red text-cr-white"
                disabled={isDeleting}
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메인 리뷰 영역 */}
      <div className="flex flex-col justify-between items-start mb-[1.6rem]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col gap-[0.6rem] justify-between w-full">
              <div className="flex items-center gap-[0.8rem]">
                <span className="text-16-SemiBold text-cr-black">
                  {review.guestNickname}
                </span>
                <div className="flex items-center">
                  {renderStars(review.reviewRating)}
                </div>
              </div>
              <span className="text-13-Medium text-cr-500">
                {getRelativeTime(review.reviewCreatedAt)}
              </span>
            </div>
            <div className="flex items-center gap-[0.4rem] my-[0.8rem]">
              <img
                src={spot}
                alt="location"
                className="w-[1.6rem] h-[1.6rem]"
              />
              <span className="text-14-Medium text-cr-black">
                {review.spaceName}
              </span>
            </div>
          </div>

          {/* 오른쪽 이미지 또는 플레이스홀더 */}
          <div className="relative flex-shrink-0 ml-[1.6rem]">
            {review.reviewImages && review.reviewImages.length > 0 ? (
              <>
                <img
                  src={review.reviewImages[0]}
                  alt="리뷰 이미지"
                  className="w-[7rem] h-[7rem] rounded-[1rem] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {review.reviewImages.length > 1 && (
                  <div className="absolute top-[0.6rem] left-[0.6rem] bg-black bg-opacity-60 rounded-full px-[0.8rem] py-[0.4rem]">
                    <span className="text-cr-white text-12-Regular">
                      +{review.reviewImages.length - 1}
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* 이미지 플레이스홀더 */
              <div className="w-[7rem] h-[7rem] rounded-[1rem] bg-cr-200 flex items-center justify-center">
                <span className="text-13-Medium text-cr-500">이미지</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-13-Medium text-cr-500 mt-[0.8rem]">
          {formatDate(review.reservationDate)} (월) 이용
        </div>
      </div>

      {/* 리뷰 내용 */}
      <div className="w-full">
        <p className="text-14-Medium text-cr-black leading-[1.8] break-words">
          {getTruncatedContent()}
          {!isExpanded && isLongContent && (
            <>
              <span>...</span>
              <button
                onClick={() => setIsExpanded(true)}
                className="text-cr-500 ml-[0.4rem] hover:text-cr-600 transition-colors"
              >
                더보기
              </button>
            </>
          )}
          {isExpanded && isLongContent && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-cr-500 ml-[0.4rem] hover:text-cr-600 transition-colors"
            >
              접기
            </button>
          )}
        </p>
      </div>

      {/* 호스트 답글 */}
      {review.reviewCommentHostNickname && review.reviewCommentContent && (
        <div className="bg-cr-100 rounded-[1rem] p-[1.6rem] mt-[2rem]">
          {/* 호스트 태그와 닉네임 */}
          <div className="flex items-center gap-[0.8rem] mb-[1rem]">
            <span className="bg-cr-pink text-cr-black text-12-Regular px-[0.8rem] py-[0.4rem] rounded-[0.4rem]">
              호스트
            </span>
            <span className="text-14-SemiBold text-cr-black">
              {review.reviewCommentHostNickname}
            </span>
            {review.reviewCommentCreatedAt && (
              <span className="text-13-Medium text-cr-500">
                {getRelativeTime(review.reviewCommentCreatedAt)}
              </span>
            )}
          </div>

          {/* 호스트 답글 내용 */}
          <p className="text-14-Medium text-cr-black leading-[1.6]">
            {review.reviewCommentContent}
          </p>
        </div>
      )}
    </div>
  );
};

export default WrittenReviewCard;
