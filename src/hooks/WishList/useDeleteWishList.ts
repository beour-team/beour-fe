import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWishList } from "../../api/WishList/DeleteWishList";
import type { AxiosError } from "axios";

export const useDeleteWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (spaceId: number) => deleteWishList(spaceId),

    onSuccess: (data) => {
      console.log("✅ 찜 삭제 성공:", data);

      // 찜 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ["wishList"] });

      // 성공 메시지는 따로 표시하지 않음 (UX 고려)
    },

    onError: (error: AxiosError) => {
      console.error("❌ 찜 삭제 실패:", error);

      // 에러 메시지 표시
      if (error.message) {
        alert(error.message);
      } else {
        alert("찜 삭제에 실패했습니다.");
      }
    },
  });
};
