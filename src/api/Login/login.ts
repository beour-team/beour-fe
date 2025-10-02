import { API_LOGIN } from "../../constants/endpoint/endpoint";
import { api } from "../api";

interface LoginParams {
  loginId: string;
  password: string;
  role: string;
}

export const login = async ({ loginId, password, role }: LoginParams) => {
  const response = await api.post(`${API_LOGIN}`, {
    loginId,
    password,
    role,
  });
  return response.data;
};
