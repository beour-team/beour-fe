//로고랑 알림창 있는 부분 (게스트,호스트 헤더)
import { useNavigate } from "react-router-dom";

import { notification } from "../assets/theme";

const GuestHeader = () => {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-between h-[9rem] mt-[0.5rem]">
      <div
        onClick={() => nav("/guest")}
        className="font-black text-[2rem] leading-none cursor-pointer"
        style={{ fontFamily: `"Poppins", sans-serif` }}
      >
        Be:our
      </div>

      <img
        src={notification}
        alt="알림"
        className="w-[2rem] object-contain cursor-pointer"
        onClick={() => nav("/")} //어디로 가야하죠
      />
    </div>
  );
};

export default GuestHeader;
