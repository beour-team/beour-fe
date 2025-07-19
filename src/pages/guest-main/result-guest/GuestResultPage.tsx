import { useNavigate, useLocation } from "react-router-dom";
import { SearchData } from "../../../constants/dummy-data/search-data";
import Searchbar from "../../../components/Searchbar";
import ResultToolbar from "./ResultToolbar";
import SearchResult from "./SearchResult";
import BackButton from "../../../components/BackButton";
import { PATHS } from "../../../routes/paths";

//임시데이터(삼성역으로만 검색해야 나옴)로 만든 결과화면
const GuestResultPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const region = params.get("region") || "";
  const min = Number(params.get("priceMin")) || 0;
  const max = Number(params.get("priceMax")) || 999999;
  const capacity = Number(params.get("capacity")) || 0;
  const spaceTypes = params.getAll("spaceType");
  const useTypes = params.getAll("useType");

  const keyword = params.get("request") || ""; // 검색어 추출
  const rawData = SearchData[keyword] || []; // 필터링

  const filteredData = rawData.filter((item) => {
    const matchRegion = region ? item.address.includes(region) : true;
    const matchPrice = item.price_per_hour >= min && item.price_per_hour <= max;
    const matchCapacity = item.max_capacity >= capacity;
    const matchSpaceType =
      spaceTypes.length > 0 ? spaceTypes.includes(item.category) : true;
    const matchUseType =
      useTypes.length > 0 ? useTypes.includes(item.use) : true;

    return (
      matchRegion &&
      matchPrice &&
      matchCapacity &&
      matchSpaceType &&
      matchUseType
    );
  });

  const nav = useNavigate();
  const handleSearch = (keyword: string) => {
    nav(`${PATHS.GUEST.RESULT}?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="ml-[1rem] mr-[2rem] my-[2rem]">
      <div className="flex items-center gap-2 flex-shrink-0">
        <BackButton />
        <div className="flex-grow">
          <Searchbar onSearch={handleSearch} />
        </div>
      </div>
      <div className="mx-[1rem]">
        <ResultToolbar totalCount={filteredData.length} />
        <SearchResult results={filteredData} />
      </div>
    </div>
  );
};
export default GuestResultPage;
