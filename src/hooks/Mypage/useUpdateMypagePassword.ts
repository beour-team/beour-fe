import { useMutation } from "@tanstack/react-query";
import { updateMypagePassword } from "../../api/Mypage/MypageDetail";

interface UpdateMypagePasswordPayload {
  newPassword?: string;
}

export const useUpdateMypagePassword = () => {
  return useMutation({
    mutationFn: (updateData: UpdateMypagePasswordPayload) =>
      updateMypagePassword(updateData),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
