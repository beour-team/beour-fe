import type {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { warning } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface SpaceDescriptionProps {
  register: UseFormRegister<HostSpaceInfo>;
  watch: UseFormWatch<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

const SpaceDescription = ({
  register,
  watch,
  errors,
}: SpaceDescriptionProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">
        공간 설명<span className="text-cr-red">*</span>
      </label>
      <textarea
        {...register("description")}
        placeholder="공간에 대한 설명을 자세하게 적어주세요 (ex. 공간 분위기, 구비 물품, 위치, 용도 등)"
        maxLength={2000}
        className={`w-full leading-[2.2rem] min-h-[15rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none
          ${
            errors.description
              ? "border border-cr-red"
              : "border border-transparent"
          }`}
      />
      <div className="flex justify-between text-12-Regular text-cr-500">
        <div>
          {errors.description && (
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.description.message}
              </span>
            </div>
          )}
        </div>
        <div>{watch("description")?.length || 0}/2000자</div>
      </div>
    </div>
  );
};

export default SpaceDescription;
