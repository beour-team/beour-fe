import type { AxiosError } from "axios";
import { API_WISHLIST_DELETE } from "../../constants/endpoint/endpoint";
import { api } from "../api";

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: string;
}

export const deleteWishList = async (spaceId: number): Promise<string> => {
  try {
    // URL에서 {id} 플레이스홀더를 실제 spaceId로 치환
    const url = API_WISHLIST_DELETE.replace("{id}", spaceId.toString());
    const response = await api.delete<ApiResponse>(url);

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      return response.data.data;
    } else {
      throw new Error("찜 삭제에 실패했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    console.error("찜 삭제 API 에러:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 404) {
      throw new Error("찜한 공간을 찾을 수 없습니다.");
    }

    throw new Error("찜 삭제에 실패했습니다.");
  }
};
