import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { SlArrowDown } from "react-icons/sl";

const ResultToolbar = ({ totalCount }: { totalCount: number }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("추천순");
  const nav = useNavigate();

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div className="text-[#656565] text-[1.1rem]">총 {totalCount}개</div>
      <div className="relative flex items-center space-x-4">
        <div className="relative inline-block">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center cursor-pointer rounded-[2rem] bg-[#E9EBEE] px-[1.2rem] py-[0.7rem] min-w-[6rem]"
          >
            <span className="text-[#313131] text-[1.1rem]">{selected}</span>
            <SlArrowDown
              size={13}
              className="ml-2 text-[#A9A9A9] pointer-events-none"
            />
          </button>

          {open && (
            <div className="absolute mt-2 w-full rounded-md bg-white shadow-md z-10">
              <div
                onClick={() => handleSelect("추천순")}
                className="px-7 py-3 hover:bg-[#d8d9da] cursor-pointer text-[1.1rem] text-[#313131]"
              >
                추천순
              </div>
              <div
                onClick={() => handleSelect("인기순")}
                className="px-7 py-3 hover:bg-[#d8d9da] cursor-pointer text-[1.1rem] text-[#313131]"
              >
                인기순
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center cursor-pointer rounded-[2rem] bg-[#E9EBEE] px-[1.2rem] py-[0.7rem]"
          onClick={() => nav("/filter")}
        >
          <HiAdjustmentsHorizontal
            size={15}
            className="text-[#9D9D9D] mr-[0.2rem]"
          />
          <span className="text-[#313131] text-[1.1rem]">필터</span>
        </div>
      </div>
    </div>
  );
};

export default ResultToolbar;
