type ButtonProps = {
  children: React.ReactNode;
  isValid: boolean;
};

const Button = ({ children, isValid }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`h-[5rem] w-full rounded-[1rem] text-16-Medium transition-colors duration-200 ${
        isValid
          ? "bg-[#000] text-white"
          : "bg-[#D9D9D9] text-black cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
