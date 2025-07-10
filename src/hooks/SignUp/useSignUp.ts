// src/hooks/auth/useSignUp.ts

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { signUp, type SignUpParams } from "../../api/SignUp/signup";

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    // 구조 분해해서 넘김
    mutationFn: ({
      name,
      nickname,
      email,
      loginId,
      password,
      phone,
      role,
    }: SignUpParams) =>
      signUp({ name, nickname, email, loginId, password, phone, role }),

    onSuccess: (data) => {
      console.log("✅ 회원가입 성공", data);

      navigate(PATHS.SIGNUPCOMPLETE);
    },

    onError: (error: AxiosError) => {
      alert("회원가입 실패: " + error.message);
    },
  });
};
