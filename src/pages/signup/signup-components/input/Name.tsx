import type { UseFormRegister } from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";

interface NameInputProps {
  register: UseFormRegister<SignUpData>;
}

const Name: React.FC<NameInputProps> = ({ register }) => {
  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">이름</label>
      <div className="flex gap-[0.8rem]">
        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100"
          placeholder="실명을 입력해주세요"
          type="text"
          {...register("name")}
        />
      </div>
    </div>
  );
};

export default Name;
