import { useState } from "react";

type Props = {
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
};

const SpaceListDown: React.FC<Props> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["스윗라운지", "달콤회의실", "전체"];

  const handleSelect = (option: string) => {
    onSelect(option); // 부모 상태 업데이트
    setIsOpen(false);
  };

  return (
    <div className="relative ml-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2F2F2F] text-white text-14-Medium px-4 py-2 rounded-full flex items-center space-x-1"
      >
        <span>{selected}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-14-Medium cursor-pointer hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpaceListDown;
