// api/host/host.ts

import { api } from "../api";
import { API_HOST_SPACES } from "../../constants/endpoint/endpoint";
import axios from "axios";

// 호스트 공간 목록 조회
export const getHostSpaces = async (): Promise<string[]> => {
  try {
    const response = await api.get(API_HOST_SPACES);
    const data = response.data.data;

    // spaceName만 추출해서 반환
    return data.map((space: { spaceName: string }) => space.spaceName);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ API 응답 에러:", error.response?.data);
    } else {
      console.log("❌ 알 수 없는 에러:", error);
    }
    throw error;
  }
};
