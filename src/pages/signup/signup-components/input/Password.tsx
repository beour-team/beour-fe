import type { UseFormRegister } from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";

interface PasswordInputProps {
  register: UseFormRegister<SignUpData>;
}
const Password: React.FC<PasswordInputProps> = ({ register }) => {
  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">비밀번호</label>
      <div className="flex flex-col gap-[0.8rem]">
        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          {...register("password")}
        />

        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100"
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          {...register("confirmPassword")}
        />
      </div>
    </div>
  );
};

export default Password;
