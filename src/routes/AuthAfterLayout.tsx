import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthAfterLayout: React.FC = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (isAuthenticated) {
    // 이미 로그인된 사용자는 메인 페이지로 리디렉션
    return <Navigate to="" />;
  }

  // 로그인되지 않은 사용자만 하위 페이지를 렌더링
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthAfterLayout;
