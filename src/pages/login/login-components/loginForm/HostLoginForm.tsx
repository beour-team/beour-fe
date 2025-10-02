import { useState } from "react";
import { Link } from "react-router-dom";
import {
  checkBox,
  checkedBox,
  eyeOpen,
  cancel,
} from "../../../../assets/theme";
import type { LoginFormProps } from "../../../../types/Login";

const HostLoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  handleSubmit,
  register,
  isValid,
  setValue,
  watch,
}) => {
  // 체크박스 이미지 상태 관리
  const [checkValue, setCheckValue] = useState<boolean>(false);
  // 비밀번호 보기/숨기기 상태관리
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 비밀번호 입력값 실시간 감지
  const passwordValue = watch("password");
  const hasPassword = passwordValue && passwordValue.length > 0;

  // 비밀번호 입력칸 비우기 함수
  const clearPassword = () => {
    setValue("password", "");
  };

  return (
    <div>
      <form
        className="flex flex-col gap-[1.3rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-[8px]">
          <input
            type="text"
            className="w-full h-[56px] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100"
            placeholder="아이디를 입력해주세요"
            {...register("id")}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full h-[56px] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 ${
                hasPassword ? "pr-[6rem]" : ""
              }`}
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />

            {/* 비밀번호가 입력되었을 때만 아이콘들 표시 */}
            {hasPassword && (
              <div>
                {/* Cancel 아이콘 - 비밀번호 지우기 */}
                <button
                  type="button"
                  className="absolute right-[4rem] top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={clearPassword}
                >
                  <img
                    src={cancel}
                    alt="비밀번호 지우기"
                    className="w-[2rem] h-[2rem]"
                  />
                </button>

                {/* Eye 아이콘 - 비밀번호 보기/숨기기 */}
                <button
                  type="button"
                  className="absolute right-[1.2rem] top-1/2 transform -translate-y-1/2 cursor-pointer w-[2.4rem] h-[2.4rem]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img
                    src={eyeOpen}
                    alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                    className="w-[24px] h-[24px]"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-[0.7rem]">
            <label
              onClick={() => setCheckValue((prev) => !prev)}
              className="cursor-pointer"
            >
              <img
                src={checkValue ? checkedBox : checkBox}
                alt="자동 로그인 체크박스"
              />
            </label>

            <input
              type="checkbox"
              className="hidden"
              checked={checkValue}
              onChange={() => setCheckValue((prev) => !prev)}
            />

            <p
              className={`text-12-Regular ${
                checkValue ? "text-cr-black" : "text-cr-500"
              }`}
            >
              자동 로그인
            </p>
          </div>

          <div className="flex gap-[1.6rem] items-center text-12-Regular ">
            <Link to="">아이디 찾기</Link>
            <p className="text-cr-300">|</p>
            <Link to="">비밀번호 찾기</Link>
          </div>
        </div>

        <button
          type="submit"
          className={`h-[5rem] w-full rounded-[1rem] text-16-Medium transition-colors duration-200 ${
            isValid
              ? "bg-cr-black text-cr-white"
              : "bg-cr-400 text-cr-white cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default HostLoginForm;
