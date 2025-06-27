import { useMutation } from "@tanstack/react-query";
import { updateMypageDetail } from "../../api/Mypage/MypageDetail";

interface UpdateMypagePayload {
  newNickname?: string;
  newPhone?: string;
}
export const useUpdateMypageDetail = () => {
  return useMutation({
    mutationFn: (updateData: UpdateMypagePayload) =>
      updateMypageDetail(updateData),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
