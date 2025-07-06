import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { EditProfile } from "../../../../types/EditProfile";
import { err } from "../../../../assets/theme";
import { useState } from "react";
import { useNicknameCheck } from "../../../../hooks/Check/useNicknameCheck";

interface NicknameProps {
  register: UseFormRegister<EditProfile>;
  errors?: FieldErrors<EditProfile>;
}

const Nickname = ({ register, errors }: NicknameProps) => {
  // 에러가 있을 경우
  const hasError = !!errors?.nickName;

  // 닉네임 상태 관리
  const [nickname, setNickname] = useState<string>("");

  // 중복 체크 훅
  const { mutate: checkNickname } = useNicknameCheck();

  // 중복 체크 요청
  const handleNicknameCheck = () => {
    checkNickname({ nickname });
  };

  return (
    <div className="flex flex-col ">
      <label className="text-13-SemiBold leading-[2.6rem]">닉네임</label>
      <div className="flex gap-[0.8rem]">
        <input
          className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-[#f2f2f2] transition-colors ${
            hasError ? "border-2 border-cr-red" : ""
          }`}
          placeholder="닉네임을 입력해주세요"
          type="text"
          {...register("nickName", {
            onChange: (e) => {
              setNickname(e.target.value); // 상태 업데이트
            },
          })}
        />
        <button
          onClick={handleNicknameCheck} // 중복 체크 버튼 클릭 시
          type="button"
          className="bg-[#D0D0D0] text-14-Medium text-[#868686] px-[2rem] py-[1.2rem] rounded-[1rem] min-w-[9.2rem]"
        >
          중복 확인
        </button>
      </div>
      {hasError && (
        <div className="flex items-center gap-[0.4rem] mt-[0.4rem] text-cr-red text-12-Regular">
          <img src={err} alt="에러아이콘" />
          <span>{errors.nickName?.message}</span>
        </div>
      )}
    </div>
  );
};

export default Nickname;
