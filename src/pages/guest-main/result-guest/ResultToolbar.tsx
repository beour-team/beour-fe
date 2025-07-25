import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { SlArrowDown } from "react-icons/sl";
import { PATHS } from "../../../routes/paths";

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
      <div className="text-13-Medium text-cr-600">총 {totalCount}개</div>
      <div className="relative flex items-center space-x-4">
        <div className="relative inline-block">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center cursor-pointer rounded-[2rem] bg-cr-200 px-[1.2rem] py-[1.2rem]"
          >
            <span className="text-cr-800 text-13-SemiBold pl-[0.5rem]">
              {selected}
            </span>
            <SlArrowDown
              size={13}
              className="ml-2 text-cr-500 pointer-events-none"
            />
          </button>

          {open && (
            <div className="absolute mt-[1rem] w-full rounded-[1rem] bg-white z-10 border border-cr-300 ">
              <div
                onClick={() => handleSelect("추천순")}
                className="px-4 py-[1rem] hover:bg-cr-100 cursor-pointer text-14-Medium"
              >
                추천순
              </div>
              <div
                onClick={() => handleSelect("인기순")}
                className="px-4 py-[1rem] hover:bg-cr-100 cursor-pointer text-14-Medium"
              >
                인기순
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center cursor-pointer rounded-[2rem] bg-cr-200 px-[1.2rem] py-[0.7rem]"
          onClick={() => nav(PATHS.GUEST.FILTER)}
        >
          <HiAdjustmentsHorizontal
            size={22}
            className="text-cr-500 mr-[0.2rem]"
          />
          <span className="text-cr-800 text-13-SemiBold">필터</span>
        </div>
      </div>
    </div>
  );
};

export default ResultToolbar;
