import { useNavigate } from "react-router-dom";
import Searchbar from "../../components/GuestResultPage/Searchbar";
import BackButton from "../../components/BackButton";

//최근 검색어랑 검색어 자동완성은 나중에 구현할게요
const GuestSearchPage = () => {
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
      {/* <div>최근 검색어</div>
      <div>전체 삭제</div> */}
    </div>
  );
};

export default GuestSearchPage;
