import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { warning } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface PriceProps {
  register: UseFormRegister<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

const Price = ({ register, errors }: PriceProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">
        가격<span className="text-cr-red">*</span>
      </label>
      <div className="flex items-center gap-[0.8rem]">
        <input
          {...register("pricePerHour", { valueAsNumber: true })}
          placeholder="시간당 가격을 입력해주세요"
          type="text"
          min={0}
          step={1000}
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 ${
            errors.pricePerHour
              ? "border border-cr-red"
              : "border border-transparent"
          }`}
        />
        <span className="text-14-SemiBold text-cr-black whitespace-nowrap">
          원/시간
        </span>
      </div>
      {errors.pricePerHour && (
        <div className="flex gap-[0.6rem] items-center">
          <img src={warning} alt="경고 아이콘" />
          <span className="text-12-Medium text-red-500">
            {errors.pricePerHour.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Price;
