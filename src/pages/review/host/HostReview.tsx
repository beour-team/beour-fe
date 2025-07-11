import { useState } from "react";
import PageHeader from "../../../components/header/PageHeader";
import ReviewCard from "../../../components/review/ReviewCard";
import { useReviewList } from "../../../hooks/Review/useReviewList";
import type { ReviewCardData } from "../../../types/Review";

// 컴포넌트 imports
import ReviewTabBar from "../review-components/ReviewTabBar";
import ReviewStatistics from "../review-components/ReviewStatistics";
import ReviewEmptyState from "../review-components/ReviewEmptyState";
import ReviewLoadingState from "../review-components/ReviewLoadingState";

const HostReview = () => {
  const [activeTab, setActiveTab] = useState("guest");
  const { reviews: apiReviews, loading, error } = useReviewList();

  // API 데이터 변환
  const reviews: ReviewCardData[] = apiReviews.map((review) => ({
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
        <PageHeader>리뷰 관리</PageHeader>

        <ReviewTabBar activeTab={activeTab} onTabChange={setActiveTab} />

        <ReviewStatistics
          totalCount={reviews.length}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* 컨텐츠 영역 */}
      {isEmpty ? <ReviewEmptyState /> : <ReviewCard reviews={reviews} />}
    </div>
  );
};

export default HostReview;
