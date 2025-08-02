import { useQuery } from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
// import { RecentReviews } from "../../../constants/dummy-data/recent-reviews-data";
import RecentReviewCard from "./RecentReviewCard";
import { fetchRecentReview } from "../../../api/guest-main/recent-review";
import type { RecentReview } from "../../../types/guest-main/RecentReview";

const RecentReViewSlider = () => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery<RecentReview[]>({
    queryKey: ["recentReviews"],
    queryFn: fetchRecentReview,
  });

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    mode: "free",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>최근 등록된 리뷰가 없습니다.</div>;

  return (
    <div ref={sliderRef} className="keen-slider">
      {reviews?.map((review) => (
        <div className="keen-slider__slide" key={review.reviewId}>
          <RecentReviewCard review={review} />
        </div>
      ))}
    </div>
  );
};

export default RecentReViewSlider;
