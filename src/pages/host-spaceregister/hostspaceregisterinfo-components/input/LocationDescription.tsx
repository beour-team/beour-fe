import type { UseFormRegister } from "react-hook-form";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface LocationDescriptionProps {
  register: UseFormRegister<HostSpaceInfo>;
}

const LocationDescription = ({ register }: LocationDescriptionProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">위치 정보</label>
      <input
        {...register("locationDescription")}
        placeholder="위치 정보를 입력해주세요 (ex. 강남역 4번 출구 도보 5분)"
        className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500"
      />
    </div>
  );
};

export default LocationDescription;
