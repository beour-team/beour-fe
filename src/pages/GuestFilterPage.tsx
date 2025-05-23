import Filterbar from "../components/GuestFilterPage/Filterbar";
import FilterText from "../components/GuestFilterPage/FilterText";

const GuestFilterPage = () => {
  return (
    <div className="mx-[1vw] my-[2vh]">
      <Filterbar /> {/* < 필터 */}
      <div className="mx-[2vw]">
        <FilterText /> {/* 필터 내용 */}
      </div>
      <div>재설정, 적용버튼</div> {/* 재설정, 적용하기 */}
    </div>
  );
};

export default GuestFilterPage;
