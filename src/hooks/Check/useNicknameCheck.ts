import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { NicknameCheck } from "../../api/Check/NicknameCheck";
import type { UseFormSetError, UseFormClearErrors } from "react-hook-form";
import type { SignUpData } from "../../types/SignUp";
import type { EditProfile } from "../../types/EditProfile";

interface NicknameCheckParams {
  nickname: string;
  setError: UseFormSetError<SignUpData>;
  clearErrors: UseFormClearErrors<SignUpData>;
}

interface EditProfileNicknameCheckParams {
  nickname: string;
  setError: UseFormSetError<EditProfile>;
  clearErrors: UseFormClearErrors<EditProfile>;
}

export const useNicknameCheck = () => {
  return useMutation({
    mutationFn: ({ nickname }: NicknameCheckParams) =>
      NicknameCheck({ nickname }),

    onSuccess: (data, { setError, clearErrors }) => {
      console.log("닉네임 중복 체크 성공:", data);
      if (data.available === false) {
        setError("nickname", {
          type: "manual",
          message: "이미 사용 중인 닉네임입니다.",
        });
      } else {
        clearErrors("nickname");
        alert("사용 가능한 닉네임입니다.");
      }
    },

    onError: (error: AxiosError, { setError }) => {
      console.error("❌ 닉네임 중복 체크 에러:", error);
      setError("nickname", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다.",
      });
    },
  });
};

export const useEditProfileNicknameCheck = () => {
  return useMutation({
    mutationFn: ({ nickname }: EditProfileNicknameCheckParams) =>
      NicknameCheck({ nickname }),

    onSuccess: (data, { setError, clearErrors }) => {
      console.log("닉네임 중복 체크 성공:", data);
      if (data.available === false) {
        setError("nickName", {
          type: "manual",
          message: "이미 사용 중인 닉네임입니다.",
        });
      } else {
        clearErrors("nickName");
        alert("사용 가능한 닉네임입니다.");
      }
    },

    onError: (error: AxiosError, { setError }) => {
      console.error("❌ 닉네임 중복 체크 에러:", error);
      setError("nickName", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다.",
      });
    },
  });
};
