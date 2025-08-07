import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { warning } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface SpaceNameProps {
  register: UseFormRegister<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

const SpaceName = ({ register, errors }: SpaceNameProps) => {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-13-SemiBold">
        공간명<span className="text-cr-red">*</span>
      </label>
      <input
        {...register("name")}
        placeholder="공간명을 입력해주세요"
        className={`w-full h-[5rem] rounded-[1rem] px-[1.8rem] text-14-Medium bg-cr-100 placeholder:text-cr-500
          ${
            errors.name ? "border border-cr-red" : "border border-transparent"
          }`}
        maxLength={30}
      />
      {errors.name && (
        <div className="flex gap-[0.6rem] items-center">
          <img src={warning} alt="경고 아이콘" />
          <span className="text-12-Medium text-red-500">
            {errors.name.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default SpaceName;
