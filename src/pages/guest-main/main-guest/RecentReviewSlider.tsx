import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { RecentReviews } from "../../../constants/recent-reviews-data";
import RecentReviewCard from "./RecentReviewCard";

type Review = {
  space_id: number;
  id: number;
  name: string;
  nickname: string;
  rating: number;
  comment: string;
  created_at: string;
  review_images: { image_url: string }[];
};

const RecentReViewSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    mode: "free",
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {RecentReviews.map((review: Review) => (
        <div className="keen-slider__slide" key={review.id}>
          <RecentReviewCard {...review} />
        </div>
      ))}
    </div>
  );
};

export default RecentReViewSlider;
