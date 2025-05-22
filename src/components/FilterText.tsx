const FilterText = () => {
  return (
    <div>
      <div className="my-[1rem]">
        <span className="text-[#818181] text-[1.3rem]">대여 일시</span>
      </div>
      <div className="my-[1rem]">
        <span className="text-[#818181] text-[1.3rem]">가격</span>
      </div>
      <div className="my-[1rem]">
        <span className="text-[#818181] text-[1.3rem]">지역</span>
      </div>
      <div className="my-[1rem]">
        <span className="text-[#818181] text-[1.3rem] pb-[1rem]">수용인원</span>
        <div className="text-[1.4rem] font-semibold">
          최대 3인 수용공간을 원해요
        </div>
      </div>
      <div className="my-[1rem]">
        <span className="text-[#818181] text-[1.3rem]">공간유형</span>
      </div>
      <div className="my-[1rem]">
        <span className="text-[#818181] text-[1.3rem]">용도</span>
      </div>
    </div>
  );
};
export default FilterText;
