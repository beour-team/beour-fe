import type {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import type { SignUpData } from "../../../../types/SignUp";
import { useIdCheck } from "../../../../hooks/Check/useIdCheck";

interface IdInputProps {
  register: UseFormRegister<SignUpData>;
  watch: UseFormWatch<SignUpData>;
  errors: FieldErrors<SignUpData>;
  setError: UseFormSetError<SignUpData>;
  clearErrors: UseFormClearErrors<SignUpData>;
}

const Id: React.FC<IdInputProps> = ({
  register,
  watch,
  errors,
  setError,
  clearErrors,
}) => {
  const loginId = watch("loginId") || "";
  const { mutate: checkIdMutate, isPending } = useIdCheck();

  const handleCheckId = () => {
    if (!loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    checkIdMutate({ loginId, setError, clearErrors });
  };

  const hasError = !!errors.loginId;

  return (
    <div className="flex flex-col">
      <label className="text-13-SemiBold leading-[2.6rem]">아이디</label>
      <div className="flex gap-[0.8rem]">
        <input
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 ${
            hasError ? "border-2 border-red-500" : ""
          }`}
          placeholder="아이디를 입력해주세요"
          type="text"
          {...register("loginId")}
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
      {hasError && (
        <span className="text-12-Medium text-red-500 mt-[0.4rem]">
          {errors.loginId?.message}
        </span>
      )}
    </div>
  );
};

export default Id;
