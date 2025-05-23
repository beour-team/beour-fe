import { useState } from "react";
import DateTimePicker from "./DateTimePicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import PriceSlider from "./PriceSlider";
import CapacitySelector from "./CapacitySelector";

const FilterText = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateTimeText, setDateTimeText] =
    useState("대여 날짜/시간을 선택해주세요");

  return (
    <div className="my-[2rem]">
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">대여 일시</div>
        <div className="relative w-full py-5">
          <input
            type="search"
            placeholder="대여 날짜/시간을 선택해주세요"
            value={dateTimeText}
            onClick={() => setShowPicker(true)}
            readOnly
            className={`bg-[#F2F2F2] rounded-[0.7rem] text-[1.3rem] w-full h-[4.5rem] cursor-pointer px-8 font-regular appearance-none
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
        <PriceSlider />
      </div>
      <div className="mt-[2rem] mb-[4rem]">
        <div className="text-[#818181] text-[1.3rem] py-[1rem]">지역</div>
        <input
          type="search"
          placeholder="지역을 선택해주세요"
          className="bg-[#F2F2F2] w-full py-5 px-8 rounded-[0.5rem] text-[1.2rem]"
        />
      </div>
      <div className="mb-[4rem]">
        <div className="text-[#818181] text-[1.3rem] pb-[2rem]">수용인원</div>
        <div className="">
          <CapacitySelector />
        </div>
      </div>
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">공간유형</div>
      </div>
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">용도</div>
      </div>
    </div>
  );
};
export default FilterText;
