const ReviewEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-[2rem]">
      <div className="w-[6rem] h-[6rem] bg-blue-100 rounded-full flex items-center justify-center mb-[2rem]">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V16C24 18.2091 22.2091 20 20 20H16L12 24V20H12C9.79086 20 8 18.2091 8 16V12Z"
            fill="#6B7280"
          />
          <circle cx="13" cy="14" r="1" fill="white" />
          <circle cx="16" cy="14" r="1" fill="white" />
          <circle cx="19" cy="14" r="1" fill="white" />
        </svg>
      </div>
      <h3 className="text-18-SemiBold text-cr-800 mb-[1.2rem]">
        답글을 작성할 리뷰가 없어요
      </h3>
      <p className="text-14-Medium text-cr-600 text-center leading-[2.2rem]">
        아미 답글을 작성 안료한 리뷰는 우측의
        <br />
        [작성한 답글] 탭을 눌러주세요.
      </p>
    </div>
  );
};

export default ReviewEmptyState;
