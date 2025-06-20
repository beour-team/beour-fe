import { API_CHECK_NICKNAME } from "../../constants/endpoint/endpoint";
import { api } from "../api";

interface NicknameCheckParams {
  nickname: string;
}

export const NicknameCheck = async ({ nickname }: NicknameCheckParams) => {
  try {
    const response = await api.get(
      `${API_CHECK_NICKNAME}?nickname=${nickname}`
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("로그인 중 에러 발생");
    }
  }
};
