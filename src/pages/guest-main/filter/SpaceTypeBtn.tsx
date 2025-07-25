// import { useState } from "react";

interface SpaceTypeBtnProps {
  spaceType: string[];
  setSpaceType: React.Dispatch<React.SetStateAction<string[]>>;
}

const SpaceTypeBtn = ({ spaceType, setSpaceType }: SpaceTypeBtnProps) => {
  const buttonLabels = [
    "카페",
    "식당",
    "쿠킹 공방",
    "가죽 공방",
    "의상 공방",
    "기타",
  ];
  // const [spaceType, setspaceType] = useState<string[]>([]); //여러 개 선택되게
  const toggleSelection = (label: string) => {
    if (spaceType.includes(label)) {
      setSpaceType(spaceType.filter((item) => item !== label)); // 이미 선택된 항목이면 제거
    } else {
      setSpaceType([...spaceType, label]); // 선택된 항목이 아니면 추가
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-5">
      {buttonLabels.map((label) => (
        <button
          key={label}
          onClick={() => toggleSelection(label)}
          className={`text-14-Medium px-[2rem] py-[0.8rem] rounded-[1.4rem] ${
            spaceType.includes(label)
              ? "bg-cr-blue text-white"
              : "bg-cr-100 text-cr-500"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SpaceTypeBtn;
