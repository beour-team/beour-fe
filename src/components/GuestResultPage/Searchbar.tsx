import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiChevronLeft, FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const [value, setValue] = useState("");
  const nav = useNavigate();

  const handleSearch = () => {
    if (value.trim()) {
      nav(`/spaces?tag=${encodeURIComponent(value)}`); //필터링 말고 검색했을 때 쿼리 파라미터 필요
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="text-[#A9A9A9] text-[3rem]">
          <FiChevronLeft
            className="cursor-pointer"
            onClick={() => nav("/guest")}
          />
        </div>
        <div className="relative w-full max-w-[95%]">
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="찾는 공간이 있나요?"
            className="bg-[#E9EBEE] rounded-[0.7rem] text-[1.3rem] w-full h-[3.6rem] px-5 font-regular appearance-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {value === "" && (
            <FiSearch
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9A9A9] cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Searchbar;
