type CategoryToggleProps = {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryToggle = ({ isToggled, setIsToggled }: CategoryToggleProps) => {
  return (
    <button
      onClick={() => setIsToggled((prev) => !prev)}
      className="relative w-full h-[38px] bg-[#C5C8CD] rounded-full p-1 transition-colors duration-300"
    >
      <div className="absolute inset-0 flex justify-around items-center px-[1rem] text-[1.3rem] font-semibold text-[#8D8D8D]">
        <span>공간유형별</span>
        <span>용도별</span>
      </div>

      <div
        className={`
          absolute top-[0.15rem] left-0
          w-1/2 h-[34px] 
          rounded-full bg-white
          flex items-center justify-center 
          text-[1.3rem] font-semibold 
          transition-all duration-200
          ${isToggled ? "translate-x-[calc(100%-0.2rem)]" : "translate-x-1"}`}
      >
        {isToggled ? "용도별" : "공간유형별"}
      </div>
    </button>
  );
};

export default CategoryToggle;
