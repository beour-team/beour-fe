import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { minusIcon, plusIcon, warning } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface CapacityProps {
  register: UseFormRegister<HostSpaceInfo>;
  setValue: UseFormSetValue<HostSpaceInfo>;
  watch: UseFormWatch<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

const Capacity = ({ register, setValue, watch, errors }: CapacityProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">
        수용 인원<span className="text-cr-red">*</span>
      </label>

      {/* 숨겨진 input: register 연결 */}
      <input
        type="hidden"
        {...register("maxCapacity", {
          required: "수용 인원을 설정해주세요.",
          valueAsNumber: true,
        })}
      />

      <div className="flex items-center justify-between">
        <span className="text-16-SemiBold text-cr-black whitespace-nowrap">
          최대 {watch("maxCapacity") || 1} 인 수용 가능
        </span>

        <div className="flex items-center gap-[1.2rem] bg-cr-100 rounded-[1rem] px-[0.8rem] py-[0.4rem]">
          <button
            type="button"
            className="w-[3.2rem] h-[3.2rem] text-20-Regular text-cr-600 flex items-center justify-center"
            onClick={() =>
              setValue(
                "maxCapacity",
                Math.max(1, (watch("maxCapacity") || 1) - 1),
                { shouldValidate: true }
              )
            }
          >
            <img src={minusIcon} alt="minus" />
          </button>

          <div className="w-[4.8rem] h-[3.2rem] bg-cr-white rounded-[0.8rem] flex items-center justify-center">
            <span className="text-16-SemiBold text-cr-black font-medium">
              {watch("maxCapacity") || 1}
            </span>
          </div>

          <button
            type="button"
            className="w-[3.2rem] h-[3.2rem] text-20-Regular text-cr-600 flex items-center justify-center"
            onClick={() =>
              setValue("maxCapacity", (watch("maxCapacity") || 1) + 1, {
                shouldValidate: true,
              })
            }
          >
            <img src={plusIcon} alt="plus" />
          </button>
        </div>
      </div>

      {errors.maxCapacity && (
        <div className="flex gap-[0.6rem] items-center">
          <img src={warning} alt="경고 아이콘" />
          <span className="text-12-Medium text-red-500">
            {errors.maxCapacity.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Capacity;
