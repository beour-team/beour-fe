import type { UseFormRegister, UseFormWatch } from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";
import { useNicknameCheck } from "../../../../hooks/Check/useNicknameCheck";

interface NickNameInputProps {
  register: UseFormRegister<SignUpData>;
  watch: UseFormWatch<SignUpData>;
}

const Nickname: React.FC<NickNameInputProps> = ({ register, watch }) => {
  const nickname = watch("nickname") || "";
  const { mutate: checkIdMutate, isPending } = useNicknameCheck();

  const handleCheckId = () => {
    if (!nickname) {
      alert("아이디를 입력해주세요.");
      return;
    }
    checkIdMutate({ nickname });
  };

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">닉네임</label>
      <div className="flex gap-[0.8rem]">
        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100"
          placeholder="닉네임을 입력해주세요"
          type="text"
          {...register("nickname")}
        />
        <button
          type="button"
          onClick={handleCheckId}
          disabled={isPending}
          className="bg-cr-300 text-14-Medium text-cr-600 px-[2rem] py-[1.2rem] rounded-[1rem] min-w-[9.2rem]"
        >
          {isPending ? "확인 중..." : "중복 확인"}
        </button>
      </div>
    </div>
  );
};

export default Nickname;
