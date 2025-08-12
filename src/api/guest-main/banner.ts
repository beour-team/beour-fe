// api 요청 함수
import { API_BANNERS } from "../../constants/endpoint/endpoint";
import { api } from "../api";

export interface Banner {
  bannerId: number;
  imageUrl: string;
  linkUrl: string;
}

// 비동기 함수
export const fetchBanners = async (): Promise<Banner[]> => {
  const res = await api.get(API_BANNERS);
  // 명세서 구조 {code, httpStatus, data}여서

  return res.data.data;
};
