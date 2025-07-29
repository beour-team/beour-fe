import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import type { EditProfile } from "../../../../types/EditProfile";
import { useEffect } from "react";
import { warning } from "../../../../assets/theme";
import {
  PHONE_REQUIRED,
  PHONE_FORMAT,
} from "../../../../constants/validation.constants";

interface PhoneProps {
  register: UseFormRegister<EditProfile>;
  errors?: FieldErrors<EditProfile>;
  watch: UseFormWatch<EditProfile>;
  setError: UseFormSetError<EditProfile>;
  clearErrors: UseFormClearErrors<EditProfile>;
}
const Phone = ({
  register,
  errors,
  watch,
  setError,
  clearErrors,
}: PhoneProps) => {
  // 에러가 있을 경우
  const hasError = !!errors?.phone;

  // watch로 실시간 휴대폰 번호 값 감시
  const watchedPhone = watch("phone") || "";

  // 실시간 유효성 검사
  useEffect(() => {
    // 빈칸일 때도 에러 메시지 표시
    if (watchedPhone.trim() === "") {
      setError("phone", {
        type: "manual",
        message: PHONE_REQUIRED,
      });
      return;
    }

    // 휴대폰 번호 형식 검사 (01로 시작하고 10-11자리)
    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(watchedPhone)) {
      setError("phone", {
        type: "manual",
        message: PHONE_FORMAT,
      });
      return;
    }

    // 유효한 경우 에러 제거
    clearErrors("phone");
  }, [watchedPhone, setError, clearErrors]);

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">휴대폰 번호</label>
      <div className="flex gap-[0.8rem]">
        <input
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2] transition-colors ${
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
