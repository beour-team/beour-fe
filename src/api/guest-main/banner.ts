// api 요청 함수
import { API_BANNERS,BASE_URL } from "../../constants/endpoint/endpoint";
import axios from "axios";

export interface Banner {
  bannerId: number;
  imageUrl: string;
  linkUrl: string;
}

// 비동기 함수
export const fetchBanners = async (): Promise<Banner[]> => {
  const res = await axios.get(BASE_URL + API_BANNERS); 

  // 명세서 구조 {code, httpStatus, data}여서

  console.log("axios 응답", JSON.stringify(res, null, 2));
  return res.data.data;
};
