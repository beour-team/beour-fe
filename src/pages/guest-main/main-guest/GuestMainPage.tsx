import { useNavigate } from "react-router-dom";
import GuestHeader from "../../../components/GuestHeader";
import HelloProfile from "../../../components/HelloProfile";
import Banner from "./Banner";
import SpaceType from "./SpaceType";
import NewSpace from "./NewSpace";
import GuestFooter from "../../../components/GuestFooter";
import Searchbar from "../../../components/Searchbar";
import RecentReview from "./RecentReView";
// import { guestLogo } from "../../../assets/theme";

const GuestMainPage = () => {
  const nav = useNavigate();
  const handleSearch = (keyword: string) => {
    nav(`/space/search?request=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="px-[2rem] pb-[8rem] overflow-x-hidden">
      <GuestHeader /> {/*로고 부분*/}
      <HelloProfile userType="guest" /> {/*안녕하세요 부분*/}
      {/* <img src={guestLogo} alt="게스트 로고" className=" " /> */}
      <Searchbar onSearch={handleSearch} />
      <Banner /> {/* 배너부분  */}
      <SpaceType /> {/* 공간 둘러보기  */}
      <NewSpace /> {/* 내 주변 새 공간 */}
      <GuestFooter />
      <RecentReview />
    </div>
  );
};

export default GuestMainPage;
