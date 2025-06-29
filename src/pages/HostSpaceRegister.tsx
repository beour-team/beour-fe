import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/header/PageHeader";
import {
  space_cafe,
  space_cloth,
  space_cooking,
  space_drawing,
  space_etc,
  space_food,
  space_leather,
  space_cafe_selected,
  space_cloth_selected,
  space_cooking_selected,
  space_drawing_selected,
  space_leather_selected,
  space_food_selected,
  space_etc_selected,
} from "../assets/theme";

const spaceTypes = [
  {
    label: "카페",
    image: space_cafe,
    selectedImage: space_cafe_selected,
  },
  {
    label: "식당",
    image: space_food,
    selectedImage: space_food_selected,
  },
  {
    label: "쿠킹 공방",
    image: space_cooking,
    selectedImage: space_cooking_selected,
  },
  {
    label: "가족 공방",
    image: space_leather,
    selectedImage: space_leather_selected,
  },
  {
    label: "의상 공방",
    image: space_cloth,
    selectedImage: space_cloth_selected,
  },
  {
    label: "아트 공방",
    image: space_drawing,
    selectedImage: space_drawing_selected,
  },
  {
    label: "기타",
    image: space_etc,
    selectedImage: space_etc_selected,
  },
];

const HostSpaceRegister = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-[100px] relative">
      <PageHeader>공간 등록</PageHeader>

      <h2 className="text-24-Bold font-bold mt-8">공간 유형을</h2>
      <br></br>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-24-Bold font-bold">입력해주세요.</h2>
      </div>

      <div className="grid grid-cols-2 gap-[1rem]">
        {spaceTypes.map(({ label, image, selectedImage }) => {
          const isSelected = selected === label;
          return (
            <button
              key={label}
              onClick={() => setSelected(label)}
              className={`relative w-full h-[10rem] rounded-xl border text-16-Bold text-left p-[1rem] transition-all
                ${
                  isSelected
                    ? "bg-[#4C8EFF] text-white border-[#4C8EFF]"
                    : "bg-[#F2F3F6] text-black border-transparent"
                }
              `}
            >
              <span className="text-[1rem] font-medium text-lg absolute top-[2rem] left-[2rem]">
                {label}
              </span>

              <div
                className={`absolute bottom-[2rem] right-[2rem] w-[5rem] h-[5rem] rounded-full transition
                  
                `}
              >
                <img
                  src={isSelected ? selectedImage : image}
                  alt={`${label} 아이콘`}
                  className="w-full h-full object-contain p-[0.5rem]"
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[40rem]">
        <button
          disabled={!selected}
          onClick={() => navigate("/hostspaceregisterinfo")}
          className={`w-full py-4 rounded-xl text-base font-semibold transition
            ${
              selected
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default HostSpaceRegister;
