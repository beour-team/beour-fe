import type { AxiosError } from "axios";
import { API_WISHLIST_ALL } from "../../constants/endpoint/endpoint";
import { api } from "../api";
import type { WishSpaceItem } from "../../types/WishSpace";

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: WishSpaceItem[];
}

export const getWishList = async (): Promise<WishSpaceItem[]> => {
  try {
    const response = await api.get<ApiResponse>(`${API_WISHLIST_ALL}`);

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      return response.data.data || [];
    } else {
      throw new Error("찜 목록을 가져오지 못했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    console.error("API 에러 상세:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 404) {
      // 찜한 공간이 없는 경우 빈 배열 반환
      return [];
    }

    throw new Error("찜 목록을 가져오지 못했습니다.");
  }
};
