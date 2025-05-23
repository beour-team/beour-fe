import Searchbar from "../components/GuestResultPage/Searchbar";

//최근 검색어랑 검색어 자동완성은 나중에 구현할게요
const GuestSearchPage = () => {
  return (
    <div className="mx-[1vw] my-[2vh] ">
      <div>
        <Searchbar />
      </div>
      {/* <div>최근 검색어</div>
      <div>전체 삭제</div> */}
    </div>
  );
};

export default GuestSearchPage;
