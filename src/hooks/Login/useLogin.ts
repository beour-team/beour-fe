import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/Login/login";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// 로그인에 필요한 데이터 타입 정의
interface LoginParams {
  loginId: string;
  password: string;
  role: string;
}

// React-Query의 useMutation을 활용해 커스텀 훅 생성 => 호출 편리
export const useLogin = () => {
  // 로그인 성공시 페이지 이동
  const navigate = useNavigate();

  return useMutation({
    // 로그인 호출 기능
    mutationFn: ({ loginId, password, role }: LoginParams) =>
      login({ loginId, password, role }),

    // 로그인 성공 시
    onSuccess: (data) => {
      // 액세스 토큰 로컬스토리지에 저장
      const accessToken = data.accessToken.replace("Bearer ", ""); // `Bearer ` 삭제
      localStorage.setItem("accessToken", accessToken);

      // 액세스 토큰 출력 확인용
      console.log(localStorage.getItem("accessToken"));

      // 로그인시 로그인 정보 출력 확인용
      console.log(data);

      // 역할에 따라 이동할 페이지
      if (data.role === "HOST") {
        navigate("/hostmain");
      } else if (data.role === "GUEST") {
        navigate("/guest");
      }
    },

    // 에러시 에러 반환
    onError: (error: AxiosError) => {
      alert(error);
    },
  });
};
