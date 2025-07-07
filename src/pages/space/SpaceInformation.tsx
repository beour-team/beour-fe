import { car, nopet, size, stairs, wifi } from "../../assets/theme";

const SpaceInformation = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="bg-cr-100 flex items-center justify-start pl-[1rem] gap-7 w-[17.3rem] h-[3.8rem] rounded-[0.5rem]">
        <img src={size} alt="규격" className="w-[1.6rem]" />
        <p className="text-13-Medium text-cr-800">99㎡</p>
      </div>
      <div className="bg-cr-100 flex items-center justify-start pl-[1rem] gap-3 w-[17.3rem] h-[3.8rem] rounded-[0.5rem]">
        <img src={stairs} alt="계단" className="w-[2.4rem]" />
        <p className="text-13-Medium text-cr-800">지상 6층</p>
      </div>
      <div className="bg-cr-100 flex items-center justify-start pl-[1rem] gap-3 w-[17.3rem] h-[3.8rem] rounded-[0.5rem]">
        <img src={car} alt="주차" className="w-[2.4rem]" />
        <p className="text-13-Medium text-cr-800">주차 가능</p>
      </div>
      <div className="bg-cr-100 flex items-center justify-start pl-[1rem] gap-3 w-[17.3rem] h-[3.8rem] rounded-[0.5rem]">
        <img src={nopet} alt="반려동물불가" className="w-[2.4rem]" />
        <p className="text-13-Medium text-cr-800">반려동물 동반 불가</p>
      </div>
      <div className="bg-cr-100 flex items-center justify-start pl-[1rem] gap-3 w-[17.3rem] h-[3.8rem] rounded-[0.5rem]">
        <img src={wifi} alt="와이파이" className="w-[2.4rem]" />
        <p className="text-13-Medium text-cr-800">와이파이</p>
      </div>
    </div>
  );
};
export default SpaceInformation;
