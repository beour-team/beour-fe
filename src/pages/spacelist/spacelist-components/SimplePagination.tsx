interface SimplePaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  // 페이지가 1개 이하면 페이징 UI 숨김
  if (totalPage <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPage;

  return (
    <div className="flex justify-center items-center gap-[0.8rem] mt-[3rem] mb-[2rem]">
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`
          w-[4rem] h-[4rem] flex items-center justify-center rounded-[0.8rem] text-16-Medium border
          ${
            isFirstPage
              ? "bg-cr-200 text-cr-400 border-cr-300 cursor-not-allowed"
              : "bg-cr-600 text-white border-cr-600 hover:bg-cr-700"
          }
        `}
      >
        ‹‹
      </button>

      {/* 현재 페이지 */}
      <div className="bg-cr-600 text-white px-[2rem] py-[1rem] rounded-[0.8rem] text-16-Medium border border-cr-600">
        {currentPage} 페이지
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`
          w-[4rem] h-[4rem] flex items-center justify-center rounded-[0.8rem] text-16-Medium border
          ${
            isLastPage
              ? "bg-cr-200 text-cr-400 border-cr-300 cursor-not-allowed"
              : "bg-cr-600 text-white border-cr-600 hover:bg-cr-700"
          }
        `}
      >
        ››
      </button>
    </div>
  );
};

export default SimplePagination;
