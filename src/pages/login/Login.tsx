import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginData } from "../../types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodLogin } from "../../utils/zod/zodValidation";
import { warning } from "../../assets/theme";
import { Link } from "react-router-dom";
import HostLoginForm from "./HostLoginForm";
import GuestLoginForm from "./GuestLoginForm";
import { useLogin } from "../../hooks/Login/useLogin";
import { PATHS } from "../../routes/paths";

const Login: React.FC = () => {
  // 게스트와 호스트 폼을 나누는 탭 상태 관리
  const [activeTab, setActiveTab] = useState("guest");

  // 로그인 mutation
  const loginMutation = useLogin();

  // react-hook-form 과 zod 연결
  // 유효성 검사를 위한 스키마는 utils > zod > zodValidation 에 저장
  // mode: onChange 는 로그인 버튼 비활성화때 쓰임
  // isValid 역시 로그인 비활성화때 쓰임
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginData>({ resolver: zodResolver(zodLogin), mode: "onChange" });

  // SubmitHandler 는 type Helper 로 폼에서 제출하는 데이터를 검사하는 함수
  // React-Hook-Form 이 typeScript 에서 타입을 검사할때 쓰라고 만든 규칙
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log("입력된 로그인 데이터:", data);

    // 역할 가져오기
    const role = activeTab === "guest" ? "GUEST" : "HOST";

    // 로그인에 필요한 데이터 입력
    loginMutation.mutate({
      loginId: data.id,
      password: data.password,
      role,
    });
  };

  return (
    <div className="h-screen w-full px-[2rem] flex flex-col justify-between pt-[7.6rem] pb-[2.5rem]">
      <div className="flex justify-between flex-col">
        <div className=" pb-[2.4rem]">
          <h2 className="text-[2.4rem] font-bold">
            서비스 이용을 위해
            <br />
            로그인 해주세요
          </h2>
        </div>

        <div className="h-[4.8rem] w-full bg-[#E9E9E9] flex items-center justify-between rounded-full">
          <div
            onClick={() => {
              setActiveTab("guest");
            }}
            className={`text-[1.4rem] font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full ml-[0.8rem] cursor-pointer ${
              activeTab === "guest"
                ? "bg-[#3C3C3C] text-[#fff]"
                : "bg-none text-[#000]"
            }`}
          >
            대여자
          </div>

          <div
            onClick={() => {
              setActiveTab("host");
            }}
            className={`text-[1.4rem] font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full mr-[0.8rem] cursor-pointer ${
              activeTab === "host"
                ? "bg-[#3C3C3C] text-[#fff]"
                : "bg-none text-[#000]"
            }`}
          >
            호스트
          </div>
        </div>

        <div className="relative flex justify-center py-[2.5rem]">
          <div className="bg-[#3C3C3C] text-white text-[1.4rem] flex items-center px-4 py-2 rounded-[1rem] w-[22rem] justify-center h-[5.4rem] ">
            로그인 유형을 선택해주세요
          </div>

          <div className="absolute top-[1.1rem]  border-l-[1rem] border-r-[1rem] border-b-[1.4rem] border-transparent border-b-[#3C3C3C]" />
        </div>

        {activeTab === "guest" ? (
          <HostLoginForm
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            isValid={isValid}
          />
        ) : (
          <GuestLoginForm
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            isValid={isValid}
          />
        )}

        <div className="flex gap-[0.8rem] w-full justify-center pt-[3rem]">
          <p className="text-[1.2rem] ">아직 Be:our 회원이 아니신가요?</p>

          <Link
            to={PATHS.SIGNUP}
            className="text-[1.2rem] underline font-bold cursor-pointer"
          >
            회원가입 하기 &gt;
          </Link>
        </div>
      </div>

      <div>
        {(errors.id || errors.password) && (
          <div className="bg-[#3C3C3C] text-[1.4rem] w-full h-[4rem] flex justify-center items-center text-[#fff] rounded-[1rem] gap-[0.8rem]">
            <img src={warning} alt="경고 표시 아이콘" />
            {errors.id?.message || errors.password?.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
