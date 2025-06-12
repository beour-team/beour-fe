import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filterbar from "./Filterbar";
import FilterText from "./FilterText";
import FilterFooter from "./FilterFooter";

const GuestFilterPage = () => {
  const nav = useNavigate();

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

  //적용하기 버튼 누른 후
  const handleApply = () => {
    const params = new URLSearchParams();
    if (region) params.set("region", region);
    params.set("capacity", capacity.toString());
    params.set("priceMin", priceRange[0].toString());
    params.set("priceMax", priceRange[1].toString());
    spaceType.forEach((type) => params.append("spaceType", type));
    useType.forEach((type) => params.append("useType", type));

    nav(`/space/search?${params.toString()}`);
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
      <FilterFooter onReset={handleResetAll} onApply={handleApply} />
    </div>
  );
};

export default GuestFilterPage;
