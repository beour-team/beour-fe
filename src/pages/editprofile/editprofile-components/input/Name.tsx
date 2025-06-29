import type { UseFormRegister } from "react-hook-form";
import type { EditProfile } from "../../../../types/EditProfile";

interface NameProps {
  register: UseFormRegister<EditProfile>;
  readOnly?: boolean;
}

const Name = ({ register, readOnly }: NameProps) => {
  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">이름</label>
      <div className="flex gap-[0.8rem]">
        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2]"
          placeholder="실명을 입력해주세요"
          readOnly={readOnly}
          type="text"
          {...register("name")}
        />
      </div>
    </div>
  );
};

export default Name;
