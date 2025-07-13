// api 요청 함수
import axios from "axios";

export interface Banner {
  bannerId: number;
  imageUrl: string;
  linkUrl: string;
}

// 비동기 함수
export const fetchBanners = async (): Promise<Banner[]> => {
  const res = await axios.get("/api/banners"); //http 요청
  // 명세서 구조 {code, httpStatus, data}여서
  console.log("axios 응답", res);
  return res.data.data;
};
