import type { FieldErrors } from "react-hook-form";
import type { LoginData } from "../../../../types/Login";

interface ErrorMessageProps {
  errors: FieldErrors<LoginData>;
  warning: string;
}

const ErrorMessage = ({ errors, warning }: ErrorMessageProps) => {
  return (
    <div>
      {(errors.id || errors.password) && (
        <div className="bg-cr-800 text-14-Medium w-full h-[4rem] flex justify-center items-center text-cr-white rounded-[1rem] gap-[0.8rem]">
          <img src={warning} alt="경고 표시 아이콘" />
          {errors.id?.message || errors.password?.message}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
