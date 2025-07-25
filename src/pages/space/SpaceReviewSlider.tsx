import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { RecentReviews } from "../../constants/dummy-data/recent-reviews-data";
import SpaceReview from "./SpaceReview";

const SpaceReviewSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    mode: "free",
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {RecentReviews.map((review) => (
        <div className="keen-slider__slide" key={review.id}>
          <SpaceReview {...review} />
        </div>
      ))}
    </div>
  );
};
export default SpaceReviewSlider;
