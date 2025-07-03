import type { AxiosError } from "axios";
import { API_MY_SPACES } from "../../constants/endpoint/endpoint";
import { api } from "../api";
import type { MySpaceList } from "../../types/MySpace";

export const getMySpaceList = async (): Promise<MySpaceList> => {
  try {
    const response = await api.get(`${API_MY_SPACES}`);
    return response.data.data || [];
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
      // 공간이 없는 경우 빈 배열 반환
      return [];
    }

    throw new Error("공간 목록을 가져오지 못했습니다.");
  }
};
