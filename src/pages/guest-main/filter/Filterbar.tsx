import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Filterbar = () => {
  const nav = useNavigate();

  return (
    <div className="mb-[1rem] flex items-center gap-3 ">
      <div className="text-[#A9A9A9] text-[3rem] cursor-pointer">
        <FiChevronLeft
          className="cursor-pointer mt-1"
          onClick={() => nav(-1)}
        />
      </div>
      <div className="text-[#302F2F] text-[2rem] flex-1 text-center font-semibold">
        필터
      </div>
    </div>
  );
};

export default Filterbar;
