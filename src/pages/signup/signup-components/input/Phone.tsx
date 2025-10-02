import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";
import { warning } from "../../../../assets/theme";

interface PhoneInputProps {
  register: UseFormRegister<SignUpData>;
  errors: FieldErrors<SignUpData>;
}

const Phone: React.FC<PhoneInputProps> = ({ register, errors }) => {
  const hasError = !!errors.phone;

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">휴대폰 번호</label>
      <div className="flex gap-[0.8rem]">
        <input
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 ${
            hasError ? "border-2 border-red-500" : ""
          }`}
          placeholder="휴대폰 번호를 입력해주세요"
          type="text"
          {...register("phone")}
        />
      </div>
      {hasError && (
        <div className="flex gap-[0.6rem] items-center mt-[0.8rem]">
          <img src={warning} alt="경고 아이콘" />
          <span className="text-12-Medium text-red-500">
            {errors.phone?.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Phone;
