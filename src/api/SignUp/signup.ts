import { API_SIGNUP } from "../../constants/endpoint/endpoint";
import { api } from "../api";

export interface SignUpParams {
  name: string;
  nickname: string;
  email: string;
  loginId: string;
  password: string;
  phone: string;
  role: "HOST" | "GUEST";
}

export const signUp = async ({
  name,
  nickname,
  email,
  loginId,
  password,
  phone,
  role,
}: SignUpParams) => {
  try {
    const response = await api.post(API_SIGNUP, {
      name,
      nickname,
      email,
      loginId,
      password,
      phone,
      role,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("회원가입 중 에러 발생");
    }
  }
};
