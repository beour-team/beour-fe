import GuestFooter from "../components/GuestFooter";
import Filterbar from "../components/Filterbar";
import FilterText from "../components/FilterText";

const GuestFilterPage = () => {
  return (
    <div className="mx-[1vw] my-[2vh]">
      <Filterbar />
      <div className="mx-[2vw]">
        <FilterText />
        <div>재설정, 적용버튼</div>
        <GuestFooter />
      </div>
    </div>
  );
};

export default GuestFilterPage;
