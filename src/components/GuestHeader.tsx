import menuIcon from "../assets/menuIcon.png";

const GuestHeader = () => {
  return (
    <div className="flex items-center justify-between h-[9vh] mt-[0.5vh]">
      <div className="flex items-center gap-[1vw]">
        <div className="font-black text-[2.4rem] leading-none cursor-pointer">
          Be:our
        </div>
        <div className="inline-block font-regular text-[0.9rem] px-[1.1vw] py-[0.8vh] bg-black rounded-full text-white">
          게스트 모드
        </div>
      </div>
      <img
        src={menuIcon}
        alt="메뉴 아이콘"
        className="w-[25px] cursor-pointer"
      />
    </div>
  );
};

export default GuestHeader;
