import { api } from "../api";
import { API_MYPAGE_DETAIL } from "../../constants/endpoint/endpoint";

export const getUserDetail = async () => {
  const res = await api.get(API_MYPAGE_DETAIL);
  return res.data.data;
};
