import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface PriceGuideProps {
  register: UseFormRegister<HostSpaceInfo>;
  watch: UseFormWatch<HostSpaceInfo>;
}

const PriceGuide = ({ register, watch }: PriceGuideProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">기타 가격 안내</label>
      <textarea
        {...register("priceGuide")}
        placeholder="ex) 인원 추가시 5000원 추가"
        maxLength={500}
        className="w-full min-h-[12rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none"
      />
      <div className="text-right text-12-Regular text-cr-500">
        {watch("priceGuide")?.length || 0}/500자
      </div>
    </div>
  );
};

export default PriceGuide;
