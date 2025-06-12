// yarn add axios
// yarn add -D @types/axios

import axios from "axios";
import { BASE_URL } from "../constants/endpoint/endpoint";

// api 세팅
export const api = axios.create({
  // 주소 자동으로 보내주는 마법의 코드
  baseURL: BASE_URL,
  // 쿠키 자동으로 보내주는 마법의 코드
  withCredentials: true,
});

// 요청 인터셉터: accessToken 자동 헤더 추가
api.interceptors.request.use(
  (config) => {
    // 저장된 액세스 토큰 가져오기
    const token = localStorage.getItem("accessToken");
    // 토큰이 있다면 headers에 Authorization 추가
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = token;
    }
    // 다시 요청
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: accessToken 만료 시 refresh로 재발급 및 재요청
api.interceptors.response.use(
  // 정상인 경우엔 패스
  (response) => response,
  // 비정상인 경우에 실행 (만료된 경우)
  async (error) => {
    const originalRequest = error.config;
    // 401 에러(만료 에러) & 재시도 플래그 없을 때만
    if (error?.response?.status === 401 && !originalRequest._retry) {
      // 무한 반복 막기
      originalRequest._retry = true;
      // 재발급 요청
      try {
        const res = await axios.post(
          `${BASE_URL}/api/users/reissue`,
          {},
          // 쿠키로 보낼때
          { withCredentials: true }
        );
        // 새로 발급받은 토큰 가져오기
        const newAccessToken = res.data.token;
        // 새로 발급받은거 담기
        localStorage.setItem("accessToken", newAccessToken);
        // 재요청 시 새 토큰으로 Authorization 헤더 갱신
        originalRequest.headers["Authorization"] = newAccessToken;
        // 이제 원래 api 다시 시도
        return api(originalRequest);
        // 에러나면 아래 코드 실행
      } catch (refreshError) {
        // refresh 실패 시 로그아웃 등 처리
        // 토큰 뺏기
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // 로그인 화면으로 강제 추방
        window.location.href = "/login";
        // 실패처리
        return Promise.reject(refreshError);
      }
    }
    // 만일 다른 에러라면 그대로 실패처리
    return Promise.reject(error);
  }
);
