import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { EditProfile } from "../../../../types/EditProfile";

interface PhoneProps {
  register: UseFormRegister<EditProfile>;
  errors?: FieldErrors<EditProfile>;
}
const Phone = ({ register, errors }: PhoneProps) => {
  // 에러가 있을 경우
  const hasError = !!errors?.phone;
  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">휴대폰 번호</label>
      <div className="flex gap-[0.8rem]">
        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2]"
          placeholder="휴대폰 번호를 입력해주세요"
          type="text"
          {...register("phone")}
        />
      </div>
      {hasError && (
        <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
          <span>{errors.phone?.message}</span>
        </div>
      )}
    </div>
  );
};

export default Phone;
