import { FiChevronLeft } from "react-icons/fi";

const Filterbar = () => {
  return (
    <div className="mt-[3rem] mb-[1rem] flex items-center gap-3 ">
      <div className="text-[#A9A9A9] text-[4rem] cursor-pointer">
        <FiChevronLeft />
      </div>
      <div className="text-[#302F2F] text-[2rem] flex-1 text-center font-semibold">
        필터
      </div>
    </div>
  );
};

export default Filterbar;
