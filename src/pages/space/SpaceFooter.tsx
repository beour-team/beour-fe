import { chat } from "../../assets/theme";

const SpaceFooter = () => {
  return (
    <div className="flex items-center justify-around mb-[1rem] mt-[2rem] rounded-t-[1rem]">
      <div className="text-center cursor-pointer ml-[1rem]">
        <img src={chat} alt="문의" className="w-[2.4rem] mx-auto" />
        <div className="text-[1.3rem] text-[#3D3D3D] mt-[0.4rem]">문의하기</div>
      </div>
      <button className="bg-black text-white text-16-Medium px-[13rem] py-[1.8rem] rounded-[1rem]">
        예약하기
      </button>
    </div>
  );
};

export default SpaceFooter;
