import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/Login/login";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useState } from "react";

// 로그인에 필요한 데이터 타입 정의
interface LoginParams {
  loginId: string;
  password: string;
  role: string;
}

// 서버 에러 응답 타입 정의 (백엔드 응답 구조에 맞춤)
interface ErrorResponse {
  code?: number;
  codeName?: string;
  message?: string;
}

// React-Query의 useMutation을 활용해 커스텀 훅 생성 => 호출 편리
export const useLogin = () => {
  // 로그인 성공시 페이지 이동
  const navigate = useNavigate();
  // 로그인 에러 상태 관리
  const [loginError, setLoginError] = useState<string | null>(null);

  const mutation = useMutation({
    // 로그인 호출 기능
    mutationFn: ({ loginId, password, role }: LoginParams) =>
      login({ loginId, password, role }),

    // 로그인 성공 시
    onSuccess: (data) => {
      // 에러 상태 초기화
      setLoginError(null);

      // 액세스 토큰 로컬스토리지에 저장
      localStorage.setItem("accessToken", data.accessToken);

      // 역할도 로컬스토리지에 저장
      localStorage.setItem("role", data.role);

      // 액세스 토큰 출력 확인용
      console.log(localStorage.getItem("accessToken"));
      console.log(localStorage.getItem("role"));

      // 로그인시 로그인 정보 출력 확인용
      console.log(data);

      // 역할에 따라 이동할 페이지
      if (data.role === "HOST") {
        navigate(PATHS.HOST.MAIN);
      } else if (data.role === "GUEST") {
        navigate(PATHS.GUEST.MAIN);
      }
    },

    // 에러시 에러 상태 설정
    onError: (error: AxiosError) => {
      console.error("로그인 에러:", error.response?.data);

      // 서버에서 받은 에러 메시지가 있으면 사용, 없으면 기본 메시지
      if (error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        setLoginError(
          errorData.message || "아이디 또는 비밀번호가 잘못되었습니다."
        );
      } else if (error.message) {
        setLoginError(error.message);
      } else {
        setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return {
    ...mutation,
    loginError,
    clearError: () => setLoginError(null), // 에러 초기화 함수
  };
};
