import type {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";
import { useNicknameCheck } from "../../../../hooks/Check/useNicknameCheck";
import { warning } from "../../../../assets/theme";

interface NickNameInputProps {
  register: UseFormRegister<SignUpData>;
  watch: UseFormWatch<SignUpData>;
  errors: FieldErrors<SignUpData>;
  setError: UseFormSetError<SignUpData>;
  clearErrors: UseFormClearErrors<SignUpData>;
}

const Nickname: React.FC<NickNameInputProps> = ({
  register,
  watch,
  errors,
  setError,
  clearErrors,
}) => {
  const nickname = watch("nickname") || "";
  const { mutate: checkNicknameMutate, isPending } = useNicknameCheck();

  const handleCheckNickname = () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    checkNicknameMutate({ nickname, setError, clearErrors });
  };

  const hasError = !!errors.nickname;

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">닉네임</label>
      <div className="flex gap-[0.8rem]">
        <input
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 ${
            hasError ? "border-2 border-red-500" : ""
          }`}
          placeholder="닉네임을 입력해주세요"
          type="text"
          {...register("nickname")}
        />
        <button
          type="button"
          onClick={handleCheckNickname}
          disabled={isPending}
          className="bg-cr-300 text-14-Medium text-cr-600 px-[2rem] py-[1.2rem] rounded-[1rem] min-w-[9.2rem]"
        >
          {isPending ? "확인 중..." : "중복 확인"}
        </button>
      </div>
      {hasError && (
        <div className="flex gap-[0.6rem] items-center mt-[0.8rem]">
          <img src={warning} alt="경고 아이콘" />
          <span className="text-12-Medium text-red-500">
            {errors.nickname?.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Nickname;
