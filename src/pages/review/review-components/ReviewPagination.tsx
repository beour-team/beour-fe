interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const ReviewPagination = ({
  currentPage,
  totalPages,
  isLastPage,
  onPageChange,
  onNextPage,
  onPrevPage,
}: ReviewPaginationProps) => {
  if (totalPages <= 1) {
    return null; // 페이지가 1개 이하면 페이징 숨김
  }

  // 페이지 번호 배열 생성 (최대 5개 페이지 버튼 표시)
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-[0.8rem] py-[2rem]">
      {/* 이전 버튼 */}
      <button
        onClick={onPrevPage}
        disabled={currentPage === 0}
        className={`px-[1.2rem] py-[0.8rem] rounded-lg text-14-Medium transition-colors ${
          currentPage === 0
            ? "text-cr-400 bg-cr-100 cursor-not-allowed"
            : "text-cr-600 bg-cr-200 hover:bg-cr-300"
        }`}
      >
        이전
      </button>

      {/* 페이지 번호 버튼들 */}
      <div className="flex gap-[0.4rem]">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-[3.6rem] h-[3.6rem] rounded-lg text-14-Medium transition-colors ${
              currentPage === pageNum
                ? "bg-cr-500 text-white"
                : "bg-cr-200 text-cr-600 hover:bg-cr-300"
            }`}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={onNextPage}
        disabled={isLastPage}
        className={`px-[1.2rem] py-[0.8rem] rounded-lg text-14-Medium transition-colors ${
          isLastPage
            ? "text-cr-400 bg-cr-100 cursor-not-allowed"
            : "text-cr-600 bg-cr-200 hover:bg-cr-300"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default ReviewPagination;
