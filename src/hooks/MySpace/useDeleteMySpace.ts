import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMySpace } from "../../api/MySpace/DeleteMySpace";
import type { AxiosError } from "axios";

export const useDeleteMySpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (spaceId: number) => deleteMySpace(spaceId),

    onSuccess: (data) => {
      console.log("✅ 공간 삭제 성공:", data);

      // 공간 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ["mySpaceList"] });

      // 성공 메시지 표시
      alert(data.message || "공간이 성공적으로 삭제되었습니다.");
    },

    onError: (error: AxiosError) => {
      console.error("❌ 공간 삭제 실패:", error);

      // 에러 메시지 표시
      if (error.message) {
        alert(error.message);
      } else {
        alert("공간 삭제에 실패했습니다.");
      }
    },
  });
};
