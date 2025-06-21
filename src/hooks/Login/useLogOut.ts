import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { Logout } from "../../api/Login/Logout";

export const useLogOut = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: Logout,

    onSuccess: (data) => {
      console.log("✅ 로그아웃 성공", data);

      // 토큰 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 로그인 페이지로 이동
      navigate(PATHS.LOGIN);
    },

    onError: (error: AxiosError) => {
      alert("로그아웃 실패: " + error.message);
    },
  });
};
