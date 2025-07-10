import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const isAuthenticated = localStorage.getItem("accessToken"); // 액세스 토큰 확인
  const role = localStorage.getItem("role"); // 역할 확인

  console.log("isAuthenticated:", isAuthenticated); // 디버깅용 로그
  console.log("role:", role); // 디버깅용 로그

  if (!isAuthenticated) {
    // 인증되지 않은 경우 로그인 페이지로 리디렉션
    return <Navigate to="/login" />;
  }

  // 호스트일 경우
  if (role === "HOST") {
    return (
      <div>
        <div>
          <Outlet /> {/* 호스트 관련 하위 페이지 렌더링 */}
        </div>
      </div>
    );
  }

  // 게스트일 경우
  if (role === "GUEST") {
    return (
      <div>
        <div>
          <Outlet /> {/* 게스트 관련 하위 페이지 렌더링 */}
        </div>
      </div>
    );
  }

  // 역할이 없으면 로그인 페이지로 리디렉션
  return <Navigate to="/login" />;
};

export default AuthLayout;
