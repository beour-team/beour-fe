import { useState } from "react";
import DateTimePicker from "./DateTimePicker";

const FilterText = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateTimeText, setDateTimeText] =
    useState("대여 날짜/시간을 선택해주세요");

  return (
    <div className="my-[2rem]">
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">대여 일시</div>
        <input
          type="search"
          placeholder="대여 날짜/시간을 선택해주세요"
          value={dateTimeText}
          onClick={() => setShowPicker(true)}
          readOnly
        />
        {showPicker && (
          <DateTimePicker
            onComplete={(text) => {
              setDateTimeText(text);
              setShowPicker(false);
            }}
          />
        )}
      </div>
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">가격</div>
      </div>
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem]">지역</div>
      </div>
      <div className="my-[1rem]">
        <div className="text-[#818181] text-[1.3rem] pb-[1rem]">수용인원</div>
        <div className="text-[1.4rem] font-semibold">
          최대 3인 수용공간을 원해요
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
