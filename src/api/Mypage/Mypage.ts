import type { AxiosError } from "axios";
import { API_MYPAGE } from "../../constants/endpoint/endpoint";
import { api } from "../api";

export const Mypage = async () => {
  try {
    const response = await api.get(`${API_MYPAGE}`);
    return response.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError;

    // 인증 관련 에러는 그냥 null로 흘려보냄
    // 왜 그래야되냐? 마이페이지는 로그인을 안해도 볼수 있어야 되기 때문에
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return null;
    }
    throw new Error("사용자 정보를 가져오지 못했습니다.");
  }
};
