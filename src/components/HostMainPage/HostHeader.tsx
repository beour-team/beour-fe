import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const GuestHeader = () => {
  const nav = useNavigate();

  return (
    <div className="px-[2rem]">
      <div className="flex items-center justify-between h-[9rem] mt-[0.5rem]">
        <div className="flex items-center gap-[1vw]">
          <div
            onClick={() => nav("/guest")}
            className="font-black text-[2.4rem] leading-none cursor-pointer"
          >
            Be:our
          </div>
          <div className="inline-block font-regular text-[0.9rem] mx-[1rem] px-[1.3rem] py-[1rem] bg-black rounded-full text-white">
            호스트 모드
          </div>
        </div>
        <IoIosSearch
          size={25}
          className="cursor-pointer"
          onClick={() => nav("/search")}
        />
      </div>
    </div>
  );
};

export default GuestHeader;
