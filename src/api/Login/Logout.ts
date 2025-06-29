import type { AxiosError } from "axios";
import { API_LOGOUT } from "../../constants/endpoint/endpoint";
import { api } from "../api";

interface LogoutResponse {
  message: string;
}

export const Logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await api.post(`${API_LOGOUT}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;

    // 에러 디버깅 시 콘솔 추가 가능
    console.error("로그아웃 오류:", error.response?.data || error.message);

    throw new Error("로그아웃 실패");
  }
};
