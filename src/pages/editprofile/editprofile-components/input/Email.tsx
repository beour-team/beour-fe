// components/input/Email.tsx
import { topArrow } from "../../../../assets/theme"; // 드롭다운은 동작 안하지만 아이콘은 유지
import type { EditProfile } from "../../../../types/EditProfile";
import type { UseFormWatch } from "react-hook-form";

interface EmailProps {
  watch: UseFormWatch<EditProfile>;
  readOnly?: boolean;
}

const Email = ({ watch }: EmailProps) => {
  const emailId = watch("email");
  const emailDomain = watch("emailDomain");

  return (
    <div className="flex flex-col">
      <label className="text-13-SemiBold leading-[2.6rem]">이메일</label>
      <div className="flex gap-[0.8rem] items-center">
        <input
          type="text"
          readOnly
          value={emailId}
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2] text-[#000]"
        />
        <span className="text-[1.4rem]">@</span>
        <div className="relative">
          <button
            className="flex justify-between items-center w-[16rem] h-[5.6rem] bg-[#f2f2f2] rounded-[1rem] text-14-Medium text-left px-[1.6rem] text-[#000] cursor-default"
            type="button"
            disabled
          >
            {emailDomain}
            <img src={topArrow} alt="화살표 아이콘" className="ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Email;
