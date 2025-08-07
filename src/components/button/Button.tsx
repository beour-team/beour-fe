type ButtonProps = {
  children: React.ReactNode;
  isValid: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button = ({
  children,
  isValid,
  disabled = false,
  onClick,
  type = "submit",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || !isValid}
      onClick={onClick}
      className={`h-[5.6rem] w-full rounded-[1rem] text-16-SemiBold transition-colors duration-200 ${
        isValid && !disabled
          ? "bg-cr-black text-cr-white"
          : "bg-cr-200 text-cr-600 cursor-not-allowed"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
