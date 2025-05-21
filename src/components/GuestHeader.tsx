import { useNavigate } from "react-router-dom";
import menuIcon from "../assets/menuIcon.png";

const GuestHeader = () => {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-between h-[9vh] mt-[0.5vh]">
      <div className="flex items-center gap-[1vw]">
        <div className="font-black text-[2.4rem] leading-none cursor-pointer">
          Be:our
        </div>
        <div className="inline-block font-regular text-[0.9rem] mx-[1rem] px-[2.5vw] py-[1vh] bg-black rounded-full text-white">
          게스트 모드
        </div>
      </div>
      <img
        src={menuIcon}
        alt="메뉴 아이콘"
        className="w-[25px] cursor-pointer"
        onClick={() => nav("/search")}
      />
    </div>
  );
};

export default GuestHeader;
