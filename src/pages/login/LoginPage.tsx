import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginData } from "../../types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodLogin } from "../../utils/zod/zodValidation";
import { warning } from "../../assets/theme";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/Login/useLogin";
import PageHeader from "../../components/header/PageHeader";
import Title from "../../components/title/Title";
import HostLoginForm from "./login-components/loginForm/HostLoginForm";
import GuestLoginForm from "./login-components/loginForm/GuestLoginForm";
import LoginTab from "./login-components/loginTab/LoginTab";
import ToolTip from "./login-components/toolTip/ToolTip";
import ErrorMessage from "./login-components/errorMessage/ErrorMessage";
import { PATHS } from "../../routes/paths";

// 탭 타입
export type TabType = "guest" | "host";

const LoginPage: React.FC = () => {
  // 게스트와 호스트 폼을 나누는 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>("guest");

  // 로그인 mutation과 에러 상태
  const { mutate: loginMutate, loginError, clearError } = useLogin();

  // react-hook-form 과 zod 연결
  // 유효성 검사를 위한 스키마는 utils > zod > zodValidation 에 저장
  // mode: onChange 는 로그인 버튼 비활성화때 쓰임
  // isValid 역시 로그인 비활성화때 쓰임
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<LoginData>({ resolver: zodResolver(zodLogin), mode: "onChange" });

  // SubmitHandler 는 type Helper 로 폼에서 제출하는 데이터를 검사하는 함수
  // React-Hook-Form 이 typeScript 에서 타입을 검사할때 쓰라고 만든 규칙
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log("입력된 로그인 데이터:", data);

    // 이전 에러 초기화
    clearError();

    // 역할 가져오기
    const role = activeTab === "guest" ? "GUEST" : "HOST";

    // 로그인에 필요한 데이터 입력
    loginMutate({
      loginId: data.id,
      password: data.password,
      role,
    });
  };

  return (
    <div className="h-screen w-full px-[2rem] flex flex-col pb-[2.5rem] justify-between">
      <div>
        <PageHeader>로그인</PageHeader>
        <div className="flex justify-between flex-col pt-[1.6rem]">
          <Title>
            서비스 이용을 위해
            <br />
            로그인 해주세요
          </Title>

          <LoginTab setActiveTab={setActiveTab} activeTab={activeTab} />

          <ToolTip>로그인 유형을 선택해주세요</ToolTip>

          {activeTab === "guest" ? (
            <GuestLoginForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              isValid={isValid}
              setValue={setValue}
              watch={watch}
            />
          ) : (
            <HostLoginForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              isValid={isValid}
              setValue={setValue}
              watch={watch}
            />
          )}

          <div className="flex gap-[0.8rem] w-full justify-center pt-[3rem]">
            <p className="text-12-Regular ">아직 Be:our 회원이 아니신가요?</p>

            <Link
              to={PATHS.SIGNUP}
              className="text-12-Bold underline font-bold cursor-pointer"
            >
              회원가입 하기 &gt;
            </Link>
          </div>
        </div>
      </div>
      <ErrorMessage errors={errors} warning={warning} apiError={loginError} />
    </div>
  );
};

export default LoginPage;
