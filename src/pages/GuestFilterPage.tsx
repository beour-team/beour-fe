import Filterbar from "../components/GuestFilterPage/Filterbar";
import FilterText from "../components/GuestFilterPage/FilterText";
import FilterFooter from "../components/GuestFilterPage/FilterFooter";

const GuestFilterPage = () => {
  return (
    <div className="mx-[0.3rem] my-[2rem]">
      <Filterbar /> {/* < 필터 */}
      <div className="mx-[1rem]">
        <FilterText /> {/* 필터 내용 */}
      </div>
      <div className="w-full h-px bg-[#E0E0E0]" />
      <FilterFooter />
    </div>
  );
};

export default GuestFilterPage;
