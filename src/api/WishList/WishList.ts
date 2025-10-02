import type { AxiosError } from "axios";
import { API_WISHLIST_ALL } from "../../constants/endpoint/endpoint";
import { api } from "../api";
import type { WishSpaceResponse } from "../../types/WishSpace";

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: WishSpaceResponse;
}

export const getWishList = async (
  page: number = 0
): Promise<WishSpaceResponse> => {
  try {
    const response = await api.get<ApiResponse>(
      `${API_WISHLIST_ALL}?page=${page}`
    );

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      return response.data.data || { spaces: [], totalPage: 0, last: true };
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
      // 찜한 공간이 없는 경우 빈 응답 반환
      return { spaces: [], totalPage: 0, last: true };
    }

    throw new Error("찜 목록을 가져오지 못했습니다.");
  }
};
