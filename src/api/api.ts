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
    // 🔥 중요: 리프레시 토큰 재발급 요청에서는 헤더에 액세스 토큰을 넣지 않음
    // 재발급 API는 쿠키의 refresh 토큰만 사용하고, 헤더의 액세스 토큰은 필요 없음
    if (config.url && config.url.includes("/api/users/reissue")) {
      console.log("🔄 리프레시 토큰 재발급 요청 - 헤더에 액세스 토큰 제외");
      return config;
    }

    // 저장된 액세스 토큰 가져오기
    const token = localStorage.getItem("accessToken");

    // 토큰이 있다면 headers에 Authorization 추가 (일반 API 요청용)
    if (token) {
      config.headers = config.headers || {};
      // localStorage에 저장된 토큰은 이미 Bearer 접두사를 포함하고 있으므로 그대로 사용
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

    // 401 에러이고 아직 재시도 안했을 때만 재발급 시도
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 반복 방지용 플래그

      console.log("🔄 액세스 토큰 만료 감지 - 재발급 시도");

      // 재발급 요청
      try {
        // 🔥 중요: 재발급 요청할 때는 헤더에 액세스 토큰을 넣지 않음
        // 오직 쿠키의 refresh 토큰만 사용
        const res = await api.post(`/api/token/reissue`, {
          withCredentials: true, // 쿠키에 담긴 refresh 토큰 보내기
          headers: {}, // Authorization 헤더 명시적으로 비우기
        });

        // 새로 발급받은 토큰 가져오기
        const newAccessToken = res.data.data.accessToken;

        // 콘솔로 확인!!
        console.log("✅ 새로 발급 받은 액세스 토큰 :", res.data);

        // 새로 발급받은 토큰을 localStorage에 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 재요청 시 새 토큰으로 Authorization 헤더 갱신
        // 새로 발급받은 토큰도 이미 Bearer 접두사를 포함하고 있으므로 그대로 사용
        originalRequest.headers["Authorization"] = newAccessToken;

        console.log("🚀 새로운 액세스 토큰으로 원래 요청 재시도");
        // 이제 원래 api 다시 시도
        return api(originalRequest);

        // 에러나면 아래 코드 실행
      } catch (refreshError) {
        console.log("❌ 리프레시 토큰 재발급 실패 - 로그아웃 처리");
        // refresh 실패 시 로그아웃 등 처리
        // 액세스 토큰과 역할 정보 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        // 로그인 화면으로 강제 이동
        window.location.href = "/login";

        // 실패처리
        return Promise.reject(refreshError);
      }
    }
    // 만일 다른 에러라면 그대로 실패처리
    return Promise.reject(error);
  }
);
