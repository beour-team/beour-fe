import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import DateTimePicker from "./DateTimePicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import PriceSlider from "./PriceSlider";
import CapacitySelector from "./CapacitySelector";
import SpaceTypeBtn from "./SpaceTypeBtn";
import UseTypeBtn from "./UseTypeBtn";
import RegionInput from "./RegionInput";

interface FilterTextProps {
  dateTimeText: string;
  setDateTimeText: Dispatch<SetStateAction<string>>;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  region: string;
  setRegion: Dispatch<SetStateAction<string>>;
  capacity: number;
  setCapacity: Dispatch<SetStateAction<number>>;
  spaceType: string[];
  setSpaceType: Dispatch<SetStateAction<string[]>>;
  useType: string[];
  setUseType: Dispatch<SetStateAction<string[]>>;
}

const FilterText = ({
  dateTimeText,
  setDateTimeText,
  priceRange,
  setPriceRange,
  region,
  setRegion,
  capacity,
  setCapacity,
  spaceType,
  setSpaceType,
  useType,
  setUseType,
}: FilterTextProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showRegionInput, setShowRegionInput] = useState(false);
  return (
    <div className="my-[2rem]">
      {/* 뒤에 배경 어두워지게 */}
      {(showRegionInput || showPicker) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setShowRegionInput(false);
            setShowPicker(false);
          }}
        />
      )}

      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">대여 일시</div>
        <div className="relative w-full py-5">
          <input
            type="search"
            placeholder="대여 날짜/시간을 선택해주세요"
            value={dateTimeText}
            onClick={() => {
              setShowPicker(true);
              setShowRegionInput(false);
            }}
            readOnly
            className={`bg-[#F2F2F2] rounded-[0.7rem] text-[1.3rem] w-full h-[4.5rem] cursor-pointer px-8 font-regular appearance-none placeholder:text-[#B0B0B0]
  ${dateTimeText ? "text-[#000000]" : "text-[#B0B0B0]"} `} // 선택 시 검정색 글자로 바뀌게
          />
          <FaRegCalendarAlt className="absolute right-7 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] text-[1.6rem] pointer-events-none" />
          {showPicker && (
            <DateTimePicker
              onComplete={(text) => {
                setDateTimeText(text);
                setShowPicker(false);
              }}
            />
          )}
        </div>
      </div>
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">가격</div>
        <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
      </div>
      <div className="mt-[2rem] mb-[4rem]">
        <div className="text-[#818181] text-[1.3rem] py-[1rem]">지역</div>
        <input
          type="search"
          placeholder="지역을 선택해주세요"
          value={region}
          onClick={() => {
            setShowRegionInput(true);
            setShowPicker(false);
          }}
          readOnly
          className="bg-[#F2F2F2] w-full py-5 px-8 rounded-[0.5rem] text-[1.2rem]"
        />
        {showRegionInput && (
          <RegionInput
            initialValue={region}
            onComplete={(selected) => {
              setRegion(selected);
              setShowRegionInput(false);
            }}
          />
        )}
      </div>
      <div className="mb-[4rem]">
        <div className="text-[#818181] text-[1.3rem] pb-[2rem]">수용인원</div>
        <div className="">
          <CapacitySelector capacity={capacity} setCapacity={setCapacity} />
        </div>
      </div>
      <div className="mt-[1rem] mb-[5rem]">
        <div className="text-[#818181] text-[1.3rem] pb-[1.5rem]">공간유형</div>
        <SpaceTypeBtn spaceType={spaceType} setSpaceType={setSpaceType} />
      </div>
      <div className="my-[1rem] mb-[5rem]">
        <div className="text-[#818181] text-[1.3rem] pb-[1.5rem]">용도</div>
        <UseTypeBtn useType={useType} setUseType={setUseType} />
      </div>
    </div>
  );
};
export default FilterText;
