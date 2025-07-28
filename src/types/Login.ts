import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

// 로그인 폼의 제출된 data 타입 지정
export interface LoginData {
  id: string;
  password: string;
}

// Login 컴포넌트에서 자식 컴포넌트인 LoginForm 으로 전달하는 props의 타입 정의
export interface LoginFormProps {
  onSubmit: SubmitHandler<LoginData>;
  handleSubmit: UseFormHandleSubmit<LoginData>;
  register: UseFormRegister<LoginData>;
  errors: FieldErrors<LoginData>;
  isValid: boolean;
  setValue: UseFormSetValue<LoginData>;
  watch: UseFormWatch<LoginData>;
}
