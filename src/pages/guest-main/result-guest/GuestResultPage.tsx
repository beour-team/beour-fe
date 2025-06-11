import { useNavigate, useLocation } from "react-router-dom";
import { SearchData } from "../../../constants/searh-data";
import Searchbar from "../../../components/Searchbar";
import ResultToolbar from "./ResultToolbar";
import SearchResult from "./SearchResult";
import BackButton from "../../../components/BackButton";

//임시데이터(삼성역으로만 검색해야 나옴)로 만든 결과화면
const GuestResultPage = () => {
  const location = useLocation();
  // const query = new URLSearchParams(location.search).get("request");
  // const results = query ? SearchData[query] : undefined;

  const params = new URLSearchParams(location.search);
  const region = params.get("region") || "";
  const min = Number(params.get("priceMin")) || 0;
  const max = Number(params.get("priceMax")) || 999999;
  const capacity = Number(params.get("capacity")) || 0;
  const spaceTypes = params.getAll("spaceType");
  const useTypes = params.getAll("useType");

  const nav = useNavigate();
  const handleSearch = (keyword: string) => {
    nav(`/space/search?request=${encodeURIComponent(keyword)}`);
  };

  // const location = useLocation();

  const rawData = SearchData["삼성역"] || [];

  const filteredData = rawData.filter((item) => {
    const matchRegion = region ? item.address.includes(region) : true;
    const matchPrice = item.price_per_hour >= min && item.price_per_hour <= max;
    const matchCapacity = item.guest_count >= capacity;
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

  return (
    <div className="ml-[1rem] mr-[2rem] my-[2rem]">
      <div className="flex items-center gap-2 flex-shrink-0">
        <BackButton to="/guest" />
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
