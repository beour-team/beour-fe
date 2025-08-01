import type { AxiosError } from "axios";
import { API_MY_SPACES } from "../../constants/endpoint/endpoint";
import { api } from "../api";
import type { MySpaceListResponse } from "../../types/MySpace";

interface ApiResponse {
  code: number;
  httpStatus: string;
  data: MySpaceListResponse;
}

export const getMySpaceList = async (
  page: number = 0
): Promise<MySpaceListResponse> => {
  try {
    const response = await api.get<ApiResponse>(
      `${API_MY_SPACES}?page=${page}`
    );

    console.log("🔍 MySpaceList API 응답:", response.data);

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      const responseData = response.data.data;
      console.log("✅ 공간 목록:", responseData.spaces);
      console.log("📄 페이징 정보:", {
        currentPage: page,
        isLast: responseData.last,
        totalPage: responseData.totalPage,
      });
      return responseData;
    } else {
      throw new Error("공간 목록을 가져오지 못했습니다.");
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
      // 공간이 없는 경우 빈 응답 반환
      return { spaces: [], last: true, totalPage: 1 };
    }

    throw new Error("공간 목록을 가져오지 못했습니다.");
  }
};
