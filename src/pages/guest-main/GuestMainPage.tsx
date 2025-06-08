import { useNavigate } from "react-router-dom";
import GuestHeader from "../../components/GuestHeader";
import HelloProfile from "../../components/GuestMainPage/HelloProfile";
import Banner from "../../components/GuestMainPage/Banner";
import SpaceType from "../../components/GuestMainPage/SpaceType";
import NewSpace from "../../components/GuestMainPage/NewSpace";
import GuestFooter from "../../components/GuestFooter";
import Searchbar from "../../components/GuestResultPage/Searchbar";

const GuestMainPage = () => {
  const nav = useNavigate();
  const handleSearch = (keyword: string) => {
    nav(`/spaces?tag=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="px-[2rem] pb-[8rem] overflow-x-hidden">
      <GuestHeader /> {/*헤더*/}
      <HelloProfile />
      {/*안녕하세요 인사부분-호스트 같이 사용가능할 것 같아요!*/}
      <Searchbar onSearch={handleSearch} />
      <Banner /> {/* 배너부분  */}
      <SpaceType /> {/* 공간 둘러보기  */}
      <NewSpace /> {/* 내 주변 새 공간 */}
      <GuestFooter />
    </div>
  );
};

export default GuestMainPage;
