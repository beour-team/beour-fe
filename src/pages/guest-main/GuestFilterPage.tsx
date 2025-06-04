import { useState } from "react";
import Filterbar from "../../components/GuestFilterPage/Filterbar";
import FilterText from "../../components/GuestFilterPage/FilterText";
import FilterFooter from "../../components/GuestFilterPage/FilterFooter";

const GuestFilterPage = () => {
  //필터 재설정 위한 상태 관리
  const [dateTimeText, setDateTimeText] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [region, setRegion] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [spaceType, setSpaceType] = useState<string[]>([]);
  const [useType, setUseType] = useState<string[]>([]);

  //전체 리셋 함수
  const handleResetAll = () => {
    setDateTimeText("");
    setPriceRange([0, 150000]);
    setRegion("");
    setCapacity(1);
    setSpaceType([]);
    setUseType([]);
  };

  return (
    <div className="my-[2rem]">
      <div className="mx-[1rem]">
        <Filterbar /> {/* < 필터 */}
        <div className="mx-[1rem]">
          <FilterText
            dateTimeText={dateTimeText}
            setDateTimeText={setDateTimeText}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            region={region}
            setRegion={setRegion}
            capacity={capacity}
            setCapacity={setCapacity}
            spaceType={spaceType}
            setSpaceType={setSpaceType}
            useType={useType}
            setUseType={setUseType}
          />{" "}
          {/* 필터 내용 */}
        </div>
      </div>
      <div className="w-full h-px bg-[#E0E0E0]" />
      <FilterFooter onReset={handleResetAll} />
    </div>
  );
};

export default GuestFilterPage;
