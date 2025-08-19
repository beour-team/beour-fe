import { useState, useEffect } from "react";
import PageHeader from "../../../components/header/PageHeader";
import ReviewableReservationCard from "../review-components/ReviewableReservationCard";
import WrittenReviewCard from "../review-components/WrittenReviewCard";
import ReviewTabBar from "../review-components/ReviewTabBar";
import ReviewPagination from "../review-components/ReviewPagination";
import { useReviewableList } from "../../../hooks/Review/useReviewableList";
import { useWrittenReviews } from "../../../hooks/Review/useWrittenReviews";
import ReviewLoadingState from "../review-components/ReviewLoadingState";

const Review = () => {
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

  // 디버깅을 위한 콘솔 로그
  console.log("🔍 [Review 페이지] 현재 상태:", {
    activeTab,
    reviewableList: reviewableList?.length || 0,
    writtenReviewsData: writtenReviewsData?.reviews?.length || 0,
    isLoading,
    error: error?.message,
    writtenLoading,
    writtenError: writtenError?.message,
  });

  if (writtenReviewsData) {
    console.log("📋 [Review 페이지] 작성한 리뷰 데이터:", writtenReviewsData);
    console.log("📝 [Review 페이지] 리뷰 배열:", writtenReviewsData.reviews);
  } else {
    console.log("❌ [Review 페이지] writtenReviewsData가 없음");
  }

  // 탭 변경 디버깅
  console.log("🎯 [Review 페이지] 탭 조건 확인:", {
    "activeTab === 'guest'": activeTab === "guest",
    "activeTab === 'written'": activeTab === "written",
    activeTab,
  });

  // 작성한 리뷰 탭 렌더링 디버깅
  useEffect(() => {
    if (activeTab === "written") {
      console.log("🎯 [Review 페이지] 작성한 리뷰 탭 활성화됨");
      console.log("🔍 [Review 페이지] 작성한 리뷰 조건 확인:", {
        hasData: !!writtenReviewsData,
        reviewsLength: writtenReviewsData?.reviews?.length || 0,
        condition: writtenReviewsData && writtenReviewsData.reviews.length > 0,
        isLoading: writtenLoading,
        error: writtenError?.message,
      });

      if (writtenReviewsData?.reviews) {
        console.log(
          "📝 [Review 페이지] 실제 리뷰 데이터:",
          writtenReviewsData.reviews
        );
      }
    }
  }, [activeTab, writtenReviewsData, writtenLoading, writtenError]);

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

      {/* 탭 - 기존 호스트 리뷰 탭 스타일 활용 */}
      <ReviewTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 총 개수 */}
      <div className="mx-[2rem] mb-[1.6rem]">
        <p className="text-13-Medium text-cr-600">
          총{" "}
          {activeTab === "guest"
            ? reviewableList?.length || 0
            : writtenReviewsData?.reviews.length || 0}
          개
        </p>
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
      ) : activeTab === "written" ? (
        <div>
          {/* 디버깅 정보 표시 */}
          <div className="bg-yellow-100 p-[1rem] mb-[1rem] text-12-Medium">
            <p>🔍 디버깅 정보:</p>
            <p>activeTab: {activeTab}</p>
            <p>writtenReviewsData: {writtenReviewsData ? "O" : "X"}</p>
            <p>reviews 길이: {writtenReviewsData?.reviews?.length || 0}</p>
            <p>로딩 중: {writtenLoading ? "O" : "X"}</p>
            <p>에러: {writtenError?.message || "없음"}</p>
          </div>

          {/* 작성한 리뷰 목록 */}
          <div>
            {writtenReviewsData && writtenReviewsData.reviews.length > 0 ? (
              <>
                <div className="bg-green-100 p-[1rem] mb-[1rem] text-12-Medium">
                  ✅ 리뷰 데이터 있음: {writtenReviewsData.reviews.length}개
                </div>
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
              <>
                <div className="bg-red-100 p-[1rem] mb-[1rem] text-12-Medium">
                  ❌ 리뷰 데이터 없음 또는 조건 불만족
                </div>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <p className="text-16-Medium text-cr-600 mb-[0.8rem]">
                    작성한 리뷰가 없어요
                  </p>
                  <p className="text-14-Medium text-cr-500">
                    먼저 리뷰를 작성해보세요
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Review;
