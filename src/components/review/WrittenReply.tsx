import { useState } from "react";
import type { WrittenComment } from "../../api/Review/WrittenComments";
import { formatRelativeTime } from "../../utils/relative-time";
import { edit, trash } from "../../assets/theme";
import { useDeleteReviewComment } from "../../hooks/Review/useDeleteReviewComment";

interface WrittenReplyProps {
  comment: WrittenComment; // 작성한 답글 데이터
  onCommentDeleted?: () => void; // 답글 삭제 성공 시 호출될 콜백
}

const WrittenReply = ({ comment, onCommentDeleted }: WrittenReplyProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 답글 삭제 훅 사용
  const {
    loading: isDeleting,
    error,
    success,
    deleteComment,
  } = useDeleteReviewComment();

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
    console.log("답글 수정 기능 - 나중에 구현");
    setIsMenuOpen(false);
  };

  // 삭제 버튼 클릭 (모달 열기)
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setIsMenuOpen(false);
  };

  // 삭제 확인
  const handleDeleteConfirm = async () => {
    // 디버깅: 실제 comment 데이터 확인
    console.log("🔍 [Debug] 답글 데이터:", comment);
    console.log("🔍 [Debug] commentId:", comment.commentId);

    // commentId가 있으면 사용, 없으면 다른 가능한 필드들을 시도 (임시 해결책)
    // 실제로는 API 응답에서 올바른 commentId 필드를 확인해야 함
    const commentData = comment as unknown as Record<string, unknown>;
    const commentId =
      comment.commentId ||
      (commentData.reviewCommentId as number) ||
      (commentData.id as number) ||
      0;
    console.log("🔍 [Debug] 사용할 commentId:", commentId);

    await deleteComment(commentId);

    if (success) {
      setShowDeleteModal(false);
      onCommentDeleted?.(); // 부모 컴포넌트에 삭제 완료 알림
    }
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-cr-100 rounded-[1rem] p-[1.6rem] mt-[2rem] relative">
      {/* 우측 상단 더보기 버튼 */}
      <div className="relative top-[1.6rem] right-[1.6rem]">
        <button
          className="text-cr-500 absolute top-[-2rem] right-[-2rem]"
          onClick={handleMenuToggle}
        >
          <span className="text-[1.8rem]">⋯</span>
        </button>

        {/* 수정/삭제 메뉴 */}
        {isMenuOpen && (
          <>
            {/* 배경 오버레이 (메뉴 외부 클릭 시 닫기) */}
            <div className="fixed inset-0 z-[5]" onClick={handleMenuClose} />

            {/* 메뉴 팝업 */}
            <div className="absolute flex flex-col gap-[0.8rem] justify-between right-[-2.4rem] top-0 z-10 bg-white border border-cr-300 rounded-[1rem] w-[8rem] py-[1.2rem] px-[1.2rem] shadow-lg">
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

      {/* 호스트 태그와 닉네임 */}
      <div className="flex items-center gap-[0.8rem] mb-[1rem]">
        <span className="bg-cr-pink text-cr-red text-12-Regular px-[0.8rem] py-[0.4rem] rounded-[0.4rem]">
          호스트
        </span>
        <span className="text-14-SemiBold text-cr-black">
          {comment.hostNickname}
        </span>
        <span className="text-13-Medium text-cr-500">
          {formatRelativeTime(comment.reviewCommentCreatedAt)}
        </span>
      </div>

      {/* 호스트 답글 내용 */}
      <p className="text-14-Medium text-cr-black leading-[1.6]">
        {comment.reviewCommentContent}
      </p>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-cr-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-cr-white flex flex-col justify-between gap-[2rem] rounded-[1.6rem] p-[1.6rem] w-[30rem]">
            <div className="flex flex-col gap-[1.6rem]">
              <p className="text-16-SemiBold text-cr-black whitespace-pre-line leading-[2.6rem]">
                답글을 삭제하시겠어요?
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

      {/* 에러 메시지 표시 */}
      {error && (
        <div className="mt-[0.8rem] text-red-500 text-12-Medium">{error}</div>
      )}
    </div>
  );
};

export default WrittenReply;
