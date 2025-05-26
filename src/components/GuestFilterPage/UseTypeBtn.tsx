import { useState } from "react";

const UseTypeBtn = () => {
  const buttonLabels = [
    "음식점",
    "파티룸",
    "오피스",
    "연습실",
    "공유주방",
    "게임방",
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSelection = (label: string) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label));
    } else {
      setSelected([...selected, label]);
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-4">
      {buttonLabels.map((label) => (
        <button
          key={label}
          onClick={() => toggleSelection(label)}
          className={`text-[1.3rem] px-7 py-[0.8rem] rounded-[1.4rem] ${
            selected.includes(label)
              ? "bg-black text-white"
              : "bg-[#E9EBEE] text-[#9296A1]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default UseTypeBtn;
