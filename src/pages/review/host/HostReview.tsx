import { useState } from "react";
import PageHeader from "../../../components/header/PageHeader";
import ReviewCard from "../../../components/review/ReviewCard";
import { useReviewList } from "../../../hooks/Review/useReviewList";
import { useCommentableReviews } from "../../../hooks/Review/useCommentableReviews";
import { useWrittenComments } from "../../../hooks/Review/useWrittenComments";
import type { ReviewCardData, HostReviewTab } from "../../../types/Review";

// 컴포넌트 imports
import ReviewTabBar from "../review-components/ReviewTabBar";
import ReviewStatistics from "../review-components/ReviewStatistics";
import ReviewEmptyState from "../review-components/ReviewEmptyState";
import ReviewLoadingState from "../review-components/ReviewLoadingState";
import SimplePagination from "../../spacelist/spacelist-components/SimplePagination";
import { PATHS } from "../../../routes/paths";

const HostReview = () => {
  const [activeTab, setActiveTab] = useState<HostReviewTab>("guest");

  // 기존 리뷰 목록 (더미 데이터 - 실제로는 사용하지 않음)
  const {
    reviews: apiReviews,
    loading: existingLoading,
    error: existingError,
  } = useReviewList();

  // 작성한 답글 목록 (호스트가 이미 작성한 답글들)
  const {
    comments: writtenComments,
    loading: writtenLoading,
    error: writtenError,
    currentPage: writtenCurrentPage,
    totalPages: writtenTotalPages,
    goToPage: writtenGoToPage,
    refetch: writtenRefetch,
  } = useWrittenComments(10);

  // 답글 작성 가능한 리뷰 목록 (게스트가 작성한 리뷰 중 답글이 없는 것들)
  const {
    reviews: commentableReviews,
    loading: commentableLoading,
    error: commentableError,
    currentPage: commentableCurrentPage,
    totalPages: commentableTotalPages,
    goToPage: commentableGoToPage,
    refetch: commentableRefetch,
  } = useCommentableReviews(10);

  // 현재 활성 탭에 따라 데이터와 상태 결정
  const isGuestTab = activeTab === "guest";
  const isHostTab = activeTab === "host";

  // 탭에 따른 로딩, 에러 상태
  const loading = isGuestTab
    ? commentableLoading
    : isHostTab
    ? writtenLoading
    : existingLoading;

  const error = isGuestTab
    ? commentableError
    : isHostTab
    ? writtenError
    : existingError;

  // 탭에 따른 페이징 정보
  const currentPage = isGuestTab
    ? commentableCurrentPage
    : isHostTab
    ? writtenCurrentPage
    : 0;

  const totalPages = isGuestTab
    ? commentableTotalPages
    : isHostTab
    ? writtenTotalPages
    : 0;

  // API 데이터를 ReviewCardData 형태로 변환
  const reviews: ReviewCardData[] = isGuestTab
    ? // 게스트 탭: 답글 작성 가능한 리뷰들
      commentableReviews.map((review) => ({
        id: review.reviewId,
        nickname: review.guestNickname,
        rating: review.reviewRating,
        comment: review.reviewContent,
        created_at: review.reviewCreatedAt,
        place_name: review.spaceName,
        image_count: review.reviewImages.length,
      }))
    : isHostTab
    ? // 호스트 탭: 작성한 답글들 (리뷰 + 답글 형태로 표시)
      writtenComments.map((comment, index) => ({
        id: index + 1, // 임시 ID (실제로는 reviewId가 필요하지만 API 응답에 없음)
        nickname: comment.guestNickname,
        rating: comment.reviewRating,
        comment: comment.reviewContent,
        created_at: comment.reviewCreatedAt,
        place_name: comment.spaceName,
        image_count: comment.reviewImages.length,
      }))
    : // 기존 탭 (사용하지 않음)
      apiReviews.map((review) => ({
        id: review.reviewId,
        nickname: review.guestNickname,
        rating: review.reviewRating,
        comment: review.reviewContent,
        created_at: review.reviewCreatedAt,
        place_name: review.spaceName,
        image_count: review.reviewImages.length,
      }));

  // 필터 핸들러
  const handleFilterClick = () => {
    console.log("필터 클릭됨");
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as HostReviewTab);
    console.log(`탭 변경: ${tab}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (isGuestTab) {
      commentableGoToPage(page - 1); // SimplePagination은 1부터 시작, 우리 API는 0부터 시작
    } else if (isHostTab) {
      writtenGoToPage(page - 1); // SimplePagination은 1부터 시작, 우리 API는 0부터 시작
    }
  };

  // 답글 작성 성공 시 호출될 콜백
  const handleCommentCreated = () => {
    console.log("답글 작성 성공 - 데이터 새로고침");
    if (isGuestTab) {
      commentableRefetch(); // 게스트 탭인 경우 답글 작성 가능한 리뷰 목록 새로고침
    }
    // 답글 작성 후에는 작성한 답글 목록도 새로고침
    writtenRefetch();
  };

  // 답글 삭제 성공 시 호출될 콜백
  const handleCommentDeleted = () => {
    console.log("답글 삭제 성공 - 데이터 새로고침");
    // 작성한 답글 목록 새로고침
    writtenRefetch();
  };

  // 로딩 상태
  if (loading) {
    return <ReviewLoadingState />;
  }

  // 빈 상태 확인
  const isEmpty = error || reviews.length === 0;

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="px-[2rem] border-b border-cr-200">
        <PageHeader backTo={PATHS.HOST.MYPAGE}>리뷰 관리</PageHeader>

        <ReviewTabBar activeTab={activeTab} onTabChange={handleTabChange} />

        <ReviewStatistics
          totalCount={reviews.length}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* 컨텐츠 영역 */}
      {isEmpty ? (
        <ReviewEmptyState />
      ) : (
        <>
          <ReviewCard
            reviews={reviews}
            onCommentCreated={isGuestTab ? handleCommentCreated : undefined}
            writtenComments={isHostTab ? writtenComments : undefined}
            showWrittenReplies={isHostTab}
            onCommentDeleted={isHostTab ? handleCommentDeleted : undefined}
          />

          {/* 페이징 (게스트 탭과 호스트 탭에서 표시) */}
          {(isGuestTab || isHostTab) && totalPages > 1 && (
            <SimplePagination
              currentPage={currentPage + 1} // API는 0부터 시작, UI는 1부터 시작
              totalPage={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HostReview;
