import { useState } from "react";

const SpaceTypeBtn = () => {
  const buttonLabels = [
    "음식점",
    "파티룸",
    "오피스",
    "연습실",
    "공유주방",
    "게임방",
  ];
  const [selected, setSelected] = useState<string[]>([]); //여러 개 선택되게
  const toggleSelection = (label: string) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label)); // 이미 선택된 항목이면 제거
    } else {
      setSelected([...selected, label]); // 선택된 항목이 아니면 추가
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-5">
      {buttonLabels.map((label) => (
        <button
          key={label}
          onClick={() => toggleSelection(label)}
          className={`text-[1.3rem] px-7 py-[0.8rem] rounded-[1.4rem] ${
            selected.includes(label)
              ? "bg-[#6B96F9] text-white"
              : "bg-[#E9EBEE] text-[#9296A1]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SpaceTypeBtn;
