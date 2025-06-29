// src/pages/EditProfile/input/Password.tsx

import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { cancel, err, eyeOpen } from "../../../../assets/theme";
import type { EditProfile } from "../../../../types/EditProfile";
import { useState } from "react";

interface PasswordProps {
  register: UseFormRegister<EditProfile>;
  setValue: UseFormSetValue<EditProfile>;
  watch: (field: keyof EditProfile) => string;
  errors?: FieldErrors<EditProfile>;
}

const Password = ({ register, setValue, watch, errors }: PasswordProps) => {
  // 에러가 있을 경우
  const hasError = !!errors?.password || !!errors?.confirmPassword;

  // 비밀번호 보이기 기능
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // 비밀번호 보이기 기능
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);

  // password 인풋 값 실시간 감지
  const passwordWatch = watch("password");

  // password 인풋 값 실시간 감지
  const confirmPasswordWatch = watch("confirmPassword");
  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">비밀번호</label>
      <div className="flex flex-col gap-[0.8rem]">
        {/* 비밀번호 */}
        <div className="relative">
          <input
            className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2] transition-colors ${
              hasError ? "border-2 border-cr-red" : ""
            }`}
            placeholder="비밀번호를 입력해주세요"
            type={showPassword ? "password" : "text"}
            {...register("password")}
          />
          {passwordWatch && (
            <div className="flex gap-[0.8rem] items-center absolute top-[1.4rem] right-[1.3rem]">
              <img
                src={cancel}
                alt="취소 아이콘"
                onClick={() => setValue("password", "")}
              />
              <img
                className="pt-[0.2rem] cursor-pointer"
                src={eyeOpen}
                alt="눈 아이콘"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative">
          <input
            className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2] transition-colors ${
              hasError ? "border-2 border-cr-red" : ""
            }`}
            placeholder="비밀번호를 다시 입력해주세요"
            type={showConfirmPassword ? "password" : "text"}
            {...register("confirmPassword")}
          />
          {confirmPasswordWatch && (
            <div className="flex gap-[0.8rem] items-center absolute top-[1.4rem] right-[1.3rem]">
              <img
                src={cancel}
                alt="취소 아이콘"
                onClick={() => setValue("confirmPassword", "")}
              />
              <img
                className="pt-[0.2rem] cursor-pointer"
                src={eyeOpen}
                alt="눈 아이콘"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            </div>
          )}
        </div>
      </div>

      {hasError && (
        <div className="flex items-center gap-[0.4rem] mt-[0.4rem] text-cr-red text-12-Regular">
          <img src={err} alt="에러아이콘" />
          <span>
            {errors.confirmPassword?.message || errors.password?.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Password;
