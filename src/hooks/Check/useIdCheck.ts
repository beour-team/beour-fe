import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { IdCheck } from "../../api/Check/IdCheck";
import type { UseFormSetError, UseFormClearErrors } from "react-hook-form";
import type { SignUpData } from "../../types/SignUp";

interface IdCheckParams {
  loginId: string;
  setError: UseFormSetError<SignUpData>;
  clearErrors: UseFormClearErrors<SignUpData>;
}

export const useIdCheck = () => {
  return useMutation({
    mutationFn: ({ loginId }: IdCheckParams) => IdCheck({ loginId }),

    onSuccess: (data, { setError, clearErrors }) => {
      console.log("✅ 아이디 중복 체크 성공:", data);
      if (data.available === false) {
        setError("loginId", {
          type: "manual",
          message: "이미 사용 중인 아이디입니다.",
        });
      } else {
        clearErrors("loginId");
        alert("사용 가능한 아이디입니다.");
      }
    },

    onError: (error: AxiosError, { setError }) => {
      console.error("❌ 아이디 중복 체크 에러:", error);
      setError("loginId", {
        type: "manual",
        message: "이미 사용 중인 아이디입니다.",
      });
    },
  });
};
