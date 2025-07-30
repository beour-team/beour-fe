import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Searchbar from "../../../components/Searchbar";
import ResultToolbar from "./ResultToolbar";
import SearchResult from "./SearchResult";
import BackButton from "../../../components/BackButton";
import { PATHS } from "../../../routes/paths";
import useSpacesSearch from "../../../hooks/guest-result/useSpacesSearch";

const GuestResultPage = () => {
  const location = useLocation();
  const nav = useNavigate();
  const params = new URLSearchParams(location.search);

  const keyword = params.get("keyword") || ""; // 검색어 추출
  const pageParam = params.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 0;

  const [page, setPage] = useState(initialPage);

  const { spaces, last, loading } = useSpacesSearch({ keyword, page });
 

  const handleSearch = (keyword: string) => {
    setPage(0); // 검색어 바뀌면 페이지 초기화
    nav(`${PATHS.GUEST.RESULT}?keyword=${encodeURIComponent(keyword)}&page=0`);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    nav(`${PATHS.GUEST.RESULT}?keyword=${encodeURIComponent(keyword)}&page=${nextPage}`);
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
        {/* 대충 */}
      {!last && (
        <button onClick={handleNextPage}>다음 페이지</button>
      )}
    </div>
  );
};
export default GuestResultPage;
