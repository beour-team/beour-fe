import { API_CHECK_LOGIN_ID } from "../../constants/endpoint/endpoint";
import { api } from "../api";

interface IdCheckParams {
  loginId: string;
}

export const IdCheck = async ({ loginId }: IdCheckParams) => {
  try {
    const response = await api.get(`${API_CHECK_LOGIN_ID}?login-id=${loginId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("로그인 중 에러 발생");
    }
  }
};
