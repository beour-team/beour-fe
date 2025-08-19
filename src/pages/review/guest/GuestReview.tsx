import { useState } from "react";
import PageHeader from "../../../components/header/PageHeader";
import ReviewableReservationCard from "../review-components/ReviewableReservationCard";
import WrittenReviewCard from "../review-components/WrittenReviewCard";
import ReviewTabBar from "../review-components/ReviewTabBar";
import ReviewPagination from "../review-components/ReviewPagination";
import { useReviewableList } from "../../../hooks/Review/useReviewableList";
import { useWrittenReviews } from "../../../hooks/Review/useWrittenReviews";
import ReviewLoadingState from "../review-components/ReviewLoadingState";

const GuestReview = () => {
  const [activeTab, setActiveTab] = useState("guest");

  // 리뷰 작성 가능한 목록 불러오기 (페이징 지원)
  const {
    data: reviewableList,
    isLoading: reviewableLoading,
    error: reviewableError,
    currentPage,
    totalPages,
    isLastPage,
    goToPage,
    nextPage,
    prevPage,
  } = useReviewableList(10); // 페이지당 10개씩

  // 작성한 리뷰 목록 불러오기 (페이징 지원)
  const {
    data: writtenReviewsData,
    isLoading: writtenLoading,
    error: writtenError,
    currentPage: writtenCurrentPage,
    totalPages: writtenTotalPages,
    isLastPage: writtenIsLastPage,
    goToPage: writtenGoToPage,
    nextPage: writtenNextPage,
    prevPage: writtenPrevPage,
  } = useWrittenReviews(10); // 페이지당 10개씩

  // 현재 탭에 따른 로딩 상태 확인
  const isLoading = activeTab === "guest" ? reviewableLoading : writtenLoading;
  const error = activeTab === "guest" ? reviewableError : writtenError;

  if (isLoading) {
    return <ReviewLoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white px-[2rem] flex items-center justify-center">
        <div className="text-center">
          <p className="text-16-Medium text-red-500 mb-[0.8rem]">
            데이터를 불러오는 중 오류가 발생했습니다
          </p>
          <p className="text-14-Medium text-cr-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-[2rem]">
      {/* 헤더 */}
      <PageHeader>나의 리뷰</PageHeader>

      {/* 탭 */}
      <ReviewTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 총 개수 */}
      <div className="my-[1.6rem] text-13-Medium text-cr-600">
        총{" "}
        {activeTab === "guest"
          ? reviewableList?.length || 0
          : writtenReviewsData?.reviews?.length || 0}
        개
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "guest" ? (
        <div>
          {/* 리뷰 작성 가능한 예약 목록 */}
          <div>
            {reviewableList && reviewableList.length > 0 ? (
              <>
                {reviewableList.map((reservation) => (
                  <ReviewableReservationCard
                    key={reservation.reservationId}
                    reservation={reservation}
                  />
                ))}
                {/* 페이징 컴포넌트 */}
                <ReviewPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  isLastPage={isLastPage}
                  onPageChange={goToPage}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <p className="text-16-Medium text-cr-600 mb-[0.8rem]">
                  리뷰를 작성할 수 있는 예약이 없어요
                </p>
                <p className="text-14-Medium text-cr-500">
                  공간을 이용한 후 리뷰를 작성해보세요
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* 작성한 리뷰 목록 */}
          <div>
            {writtenReviewsData &&
            writtenReviewsData.reviews &&
            writtenReviewsData.reviews.length > 0 ? (
              <>
                {writtenReviewsData.reviews.map((review) => (
                  <WrittenReviewCard key={review.reviewId} review={review} />
                ))}
                {/* 페이징 컴포넌트 */}
                <ReviewPagination
                  currentPage={writtenCurrentPage}
                  totalPages={writtenTotalPages}
                  isLastPage={writtenIsLastPage}
                  onPageChange={writtenGoToPage}
                  onNextPage={writtenNextPage}
                  onPrevPage={writtenPrevPage}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <p className="text-16-Medium text-cr-600 mb-[0.8rem]">
                  작성한 리뷰가 없어요
                </p>
                <p className="text-14-Medium text-cr-500">
                  먼저 리뷰를 작성해보세요
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestReview;
