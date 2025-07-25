interface ReviewStatisticsProps {
  totalCount: number;
  onFilterClick: () => void;
}

const ReviewStatistics = ({
  totalCount,
  onFilterClick,
}: ReviewStatisticsProps) => {
  return (
    <div className="flex justify-between items-center pt-[1.6rem] pb-[2rem]">
      <p className="text-13-Medium text-cr-600">총 {totalCount}개</p>
      <button
        onClick={onFilterClick}
        className="flex items-center gap-[0.4rem] text-13-Medium text-cr-600"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4H14M4 8H12M6 12H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        필터
      </button>
    </div>
  );
};

export default ReviewStatistics;
