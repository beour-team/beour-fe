import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { IdCheck } from "../../api/Check/IdCheck";

interface IdCheckParams {
  loginId: string;
}

export const useIdCheck = () => {
  return useMutation({
    mutationFn: ({ loginId }: IdCheckParams) => IdCheck({ loginId }),

    onSuccess: (data) => {
      console.log("✅ 아이디 중복 체크 성공:", data);
      if (data.available === false) {
        alert("이미 사용 중인 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    },

    onError: (error: AxiosError) => {
      console.error("❌ 아이디 중복 체크 에러:", error);
      alert("이미 사용 중인 아이디입니다.");
    },
  });
};
