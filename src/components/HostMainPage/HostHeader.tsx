import { useNavigate } from "react-router-dom";

const HostHeader = () => {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-between h-[9vh] mt-[0.5vh] px-[2vw]">
      <div className="flex items-center gap-[1vw]">
        <div
          onClick={() => nav("/hostmain")}
          className="font-black text-[2.4rem] leading-none cursor-pointer"
        >
          Be:our
        </div>
        <div className="inline-block font-regular text-[0.9rem] mx-[1rem] px-[2.5vw] py-[1vh] bg-black rounded-full text-white">
          호스트 모드
        </div>
        {/* 메뉴 아이콘 넣기 */}
      </div>
    </div>
  );
};

export default HostHeader;