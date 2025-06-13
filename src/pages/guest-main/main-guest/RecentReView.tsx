import RecentReViewSlider from "./RecentReviewSlider";

const RecentReview = () => {
  return (
    <div>
      <div className="flex justify-between items-center  my-[1rem]">
        <div className="text-18-SemiBold py-[1.4rem]">최근 등록 리뷰</div>
      </div>
      <div>
        <RecentReViewSlider />
      </div>
    </div>
  );
};

export default RecentReview;
