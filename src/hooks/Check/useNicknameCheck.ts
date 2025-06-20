import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { NicknameCheck } from "../../api/Check/NicknameCheck";

interface NicknameCheckParams {
  nickname: string;
}

export const useNicknameCheck = () => {
  return useMutation({
    mutationFn: ({ nickname }: NicknameCheckParams) =>
      NicknameCheck({ nickname }),

    onSuccess: (data) => {
      console.log("닉네임 중복 체크 성공:", data);
      if (data.available === false) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    },

    onError: (error: AxiosError) => {
      console.error("❌ 닉네임 중복 체크 에러:", error);
      alert("이미 사용 중인 닉네임입니다.");
    },
  });
};
