import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Searchbar from "../../../components/Searchbar";
import ResultToolbar from "./ResultToolbar";
import SearchResult from "./SearchResult";
import BackButton from "../../../components/BackButton";
import { PATHS } from "../../../routes/paths";
import useSpacesSearch from "../../../hooks/guest-result/useSpacesSearch";
import { leftArrow, rightArrow } from "../../../assets/theme";

const GuestResultPage = () => {
  const location = useLocation();
  const nav = useNavigate();
  const params = new URLSearchParams(location.search);

  const keyword = params.get("keyword") || ""; // 검색어 추출
  const spacecategory = params.get("spacecategory") || "";
  const usecategory = params.get("usecategory") || "";
  const pageParam = params.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 0;

  const [page, setPage] = useState(initialPage);

  const buildQuery = (pageNum: number) => {
    const q = new URLSearchParams();
    if (keyword) q.set("keyword", keyword);
    else if (spacecategory) q.set("spacecategory", spacecategory);
    else if (usecategory) q.set("usecategory", usecategory);
    q.set("page", pageNum.toString());
    return q.toString();
  };

  const { spaces, last, totalPage, loading } = useSpacesSearch({
    keyword,
    spacecategory,
    usecategory,
    page,
  });

  const handleSearch = (newKeyword: string) => {
    setPage(0); // 검색어 바뀌면 페이지 초기화
    nav(
      `${PATHS.GUEST.RESULT}?keyword=${encodeURIComponent(newKeyword)}&page=0`
    );
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    nav(`${PATHS.GUEST.RESULT}?${buildQuery(nextPage)}`);
  };

  const handlePrevPage = () => {
    if (page <= 0) return;
    const prevPage = page - 1;
    setPage(prevPage);
    nav(`${PATHS.GUEST.RESULT}?${buildQuery(prevPage)}`);
  };

  return (
    <div className="ml-[1rem] mr-[2rem] my-[2rem]">
      <div className="flex items-center gap-2 flex-shrink-0">
        <BackButton />
        <div className="flex-grow">
          <Searchbar onSearch={handleSearch} />
        </div>
      </div>

      {loading && <div>로딩 중...</div>}

      <div className="mx-[1rem]">
        <ResultToolbar totalCount={spaces.length} />
        <SearchResult results={spaces} />
      </div>

      <div className="flex justify-center gap-4 my-[1rem] text-16-Medium cursor-pointer">
        {totalPage > 1 && page > 0 && (
          <img src={leftArrow} onClick={handlePrevPage} />
        )}
        {totalPage > 1 && !last && (
          <img src={rightArrow} onClick={handleNextPage} />
        )}
      </div>
    </div>
  );
};
export default GuestResultPage;
