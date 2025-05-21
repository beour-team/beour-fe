import { useLocation } from "react-router-dom";
import { SearchData } from "../constants/SearchData";
import Searchbar from "../components/Searchbar";

//임시데이터(삼성역으로만 검색해야 나옴)로 만든 결과화면
const GuestResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("tag");

  const results = query ? SearchData[query] : undefined;

  return (
    <div>
      <Searchbar />
      <div>총 개수</div>
      <div>추천순</div>
      <div>필터</div>
      <div>
        {results ? (
          results.map((item, index) => (
            <div key={index}>
              <img src={item.thumbnail_url} alt={item.name} />
              <div>{item.name}</div>
              <div>{item.address}</div>
              <div>{item.guest_count}</div>
              <div>{item.rating}</div>
              <div>{item.category}</div>
              <div>{item.price_per_hour} 원/시간</div>
            </div>
          ))
        ) : (
          <div>검색결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
export default GuestResultPage;
