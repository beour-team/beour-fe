import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 포트 3000번으로 변경
    port: 3000,
    proxy: {
      // '/api'로 시작하는 요청을 백엔드 서버(예: localhost:8080)로 전달
      "/api": {
        target: "http://localhost:8080", // 백엔드 서버 주소
        changeOrigin: true,
      },
    },
  },
});
