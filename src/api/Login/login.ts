import { API_LOGIN } from "../../constants/endpoint/endpoint";
import { api } from "../api";

interface LoginParams {
  loginId: string;
  password: string;
  role: string;
}

export const login = async ({ loginId, password, role }: LoginParams) => {
  try {
    const response = await api.post(`${API_LOGIN}`, {
      loginId,
      password,
      role,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("로그인 중 에러 발생");
    }
  }
};
