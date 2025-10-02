import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface FacilityNoticeProps {
  register: UseFormRegister<HostSpaceInfo>;
  watch: UseFormWatch<HostSpaceInfo>;
}

const FacilityNotice = ({ register, watch }: FacilityNoticeProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">공간 안내</label>
      <textarea
        {...register("facilityNotice")}
        placeholder="ex) 재활용 쓰레기 구비 되어있습니다"
        maxLength={500}
        className="w-full leading-[2.2rem] min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none"
      />
      <div className="flex justify-end text-12-Regular text-cr-500">
        {watch("facilityNotice")?.length || 0}/500자
      </div>
    </div>
  );
};

export default FacilityNotice;
