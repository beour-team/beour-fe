export interface SignUpData {
  loginId: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  emailDomain: string;
}

// 요청시 실제 보내는 데이터 타입
export interface SignUpRequest {
  name: string;
  nickname: string;
  email: string;
  loginId: string;
  password: string;
  phone: string;
  role: "HOST" | "GUEST";
}
