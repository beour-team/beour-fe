import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";

interface PasswordInputProps {
  register: UseFormRegister<SignUpData>;
  errors: FieldErrors<SignUpData>;
}

const Password: React.FC<PasswordInputProps> = ({ register, errors }) => {
  const hasPasswordError = !!errors.password;
  const hasConfirmPasswordError = !!errors.confirmPassword;

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">비밀번호</label>
      <div className="flex flex-col gap-[0.8rem]">
        <div className="flex flex-col">
          <input
            className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 ${
              hasPasswordError ? "border-2 border-red-500" : ""
            }`}
            placeholder="비밀번호를 입력해주세요"
            type="password"
            {...register("password")}
          />
          {hasPasswordError && (
            <span className="text-12-Medium text-red-500 mt-[0.4rem]">
              {errors.password?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 ${
              hasConfirmPasswordError ? "border-2 border-red-500" : ""
            }`}
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            {...register("confirmPassword")}
          />
          {hasConfirmPasswordError && (
            <span className="text-12-Medium text-red-500 mt-[0.4rem]">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
