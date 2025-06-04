import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchData } from "../../constants/searh-data";
import Searchbar from "../../components/GuestResultPage/Searchbar";
import ResultToolbar from "../../components/GuestResultPage/ResultToolbar";
import SearchResult from "../../components/GuestResultPage/SearchResult";
import BackButton from "../../components/BackButton";

//임시데이터(삼성역으로만 검색해야 나옴)로 만든 결과화면
const GuestResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("tag");
  const results = query ? SearchData[query] : undefined;

  const nav = useNavigate();
  const handleSearch = (keyword: string) => {
    nav(`/spaces?tag=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="ml-[1rem] mr-[2rem] my-[2rem]">
      <div className="flex items-center gap-2 flex-shrink-0">
        <BackButton to="/guest" />
        <div className="flex-grow">
          <Searchbar onSearch={handleSearch} />
        </div>
      </div>
      <div className="mx-[1rem]">
        <ResultToolbar totalCount={results?.length ?? 0} />
        <SearchResult results={results} />
      </div>
    </div>
  );
};
export default GuestResultPage;
