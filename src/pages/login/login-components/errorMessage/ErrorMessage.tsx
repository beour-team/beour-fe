import type { FieldErrors } from "react-hook-form";
import type { LoginData } from "../../../../types/Login";

interface ErrorMessageProps {
  errors: FieldErrors<LoginData>;
  warning: string;
  apiError?: string | null; // API 에러를 받기 위한 prop 추가
}

const ErrorMessage = ({ errors, warning, apiError }: ErrorMessageProps) => {
  // form validation 에러가 있는지 확인
  const hasFormError = errors.id || errors.password;
  // API 에러가 있는지 확인
  const hasApiError = apiError && apiError.trim().length > 0;

  // 표시할 에러가 있는지 확인
  const shouldShowError = hasFormError || hasApiError;

  if (!shouldShowError) {
    return null;
  }

  return (
    <div className="bg-cr-800 text-14-Medium w-full h-[4rem] flex justify-center items-center text-cr-white rounded-[1rem] gap-[0.8rem]">
      <img src={warning} alt="경고 표시 아이콘" />
      {/* API 에러가 있으면 API 에러를 우선 표시, 없으면 form validation 에러 표시 */}
      {hasApiError ? apiError : errors.id?.message || errors.password?.message}
    </div>
  );
};

export default ErrorMessage;
