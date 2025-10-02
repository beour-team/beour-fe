import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormClearErrors,
  UseFormWatch,
} from "react-hook-form";
import type { EditProfile } from "../../../../types/EditProfile";
import { useEffect } from "react";
import { warning } from "../../../../assets/theme";
import {
  NICKNAME_REQUIRED,
  NICKNAME_FORMAT,
} from "../../../../constants/validation.constants";
import { useEditProfileNicknameCheck } from "../../../../hooks/Check/useNicknameCheck";

interface NicknameProps {
  register: UseFormRegister<EditProfile>;
  errors?: FieldErrors<EditProfile>;
  setError: UseFormSetError<EditProfile>;
  clearErrors: UseFormClearErrors<EditProfile>;
  watch: UseFormWatch<EditProfile>;
}

const Nickname = ({
  register,
  errors,
  setError,
  clearErrors,
  watch,
}: NicknameProps) => {
  // 에러가 있을 경우
  const hasError = !!errors?.nickName;

  // 닉네임 상태 관리

  // watch로 실시간 닉네임 값 감시
  const watchedNickname = watch("nickName") || "";

  // 닉네임 중복체크 훅
  const nicknameCheckMutation = useEditProfileNicknameCheck();

  // 실시간 유효성 검사
  useEffect(() => {
    // 빈칸일 때도 에러 메시지 표시
    if (watchedNickname.trim() === "") {
      setError("nickName", {
        type: "manual",
        message: NICKNAME_REQUIRED,
      });
      return;
    }

    // 닉네임 길이 검사 (1-8자)
    if (watchedNickname.length < 1 || watchedNickname.length > 8) {
      setError("nickName", {
        type: "manual",
        message: NICKNAME_REQUIRED,
      });
      return;
    }

    // 닉네임 형식 검사 (한글, 영문, 숫자만, 공백 없음)
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    if (!nicknameRegex.test(watchedNickname)) {
      setError("nickName", {
        type: "manual",
        message: NICKNAME_FORMAT,
      });
      return;
    }

    // 유효한 경우 에러 제거 (중복체크는 별도로 처리)
    if (errors?.nickName?.message !== "이미 사용 중인 닉네임입니다.") {
      clearErrors("nickName");
    }
  }, [watchedNickname, setError, clearErrors, errors?.nickName?.message]);

  // 중복 체크 요청
  const handleNicknameCheck = () => {
    if (!watchedNickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // 형식 검사 먼저 수행
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    if (watchedNickname.length < 1 || watchedNickname.length > 8) {
      alert("닉네임을 1~8자로 입력해주세요.");
      return;
    }

    if (!nicknameRegex.test(watchedNickname)) {
      alert("닉네임은 공백 없이 한글, 영문, 숫자만 입력해주세요.");
      return;
    }

    // 중복체크 API 호출
    nicknameCheckMutation.mutate({
      nickname: watchedNickname,
      setError,
      clearErrors,
    });
  };

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">닉네임</label>
      <div className="flex gap-[0.8rem]">
        <input
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2] transition-colors ${
            hasError ? "border-2 border-red-500" : ""
          }`}
          placeholder="닉네임을 입력해주세요"
          type="text"
          {...register("nickName")}
        />
        <button
          onClick={handleNicknameCheck}
          type="button"
          disabled={nicknameCheckMutation.isPending}
          className={`px-[2rem] py-[1.2rem] rounded-[1rem] min-w-[9.2rem] text-14-Medium transition-colors ${
            nicknameCheckMutation.isPending
              ? "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
              : "bg-[#D0D0D0] text-[#868686] hover:bg-[#C0C0C0]"
          }`}
        >
          {nicknameCheckMutation.isPending ? "확인 중..." : "중복 확인"}
        </button>
      </div>
      {hasError && (
        <div className="flex gap-[0.6rem] items-center mt-[0.8rem]">
          <img src={warning} alt="경고 아이콘" />
          <span className="text-12-Medium text-red-500">
            {errors.nickName?.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Nickname;
