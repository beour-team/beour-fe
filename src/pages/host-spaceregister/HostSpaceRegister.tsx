import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/header/PageHeader";
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
} from "../../assets/theme";

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
    label: "가죽 공방",
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
  // 이제 한글 값을 직접 사용하므로 spaceTypeMap 제거
  return (
    <div className="min-h-screen bg-white px-[2rem] relative">
      <PageHeader>공간 등록</PageHeader>

      <h2 className="text-24-Bold font-bold leading-[3.5rem] mb-[3.6rem] mt-[1.8rem]">
        공간 유형을
        <br />
        입력해주세요.
      </h2>

      <div className="grid grid-cols-2 gap-[1rem]">
        {spaceTypes.map(({ label, image, selectedImage }) => {
          const isSelected = selected === label;
          return (
            <button
              key={label}
              onClick={() => setSelected(label)}
              className={`relative w-full h-[8rem] flex  justify-between rounded-[1rem] text-16-Bold  py-[1.2rem] px-[1.2rem] transition-all
                ${
                  isSelected
                    ? "bg-cr-blue text-cr-white "
                    : "bg-cr-100 text-cr-black "
                }
              `}
            >
              <span className="text-16-SemiBold">{label}</span>

              <div
                className={`absolute bottom-[2rem] right-[2rem] rounded-full transition`}
              >
                <img
                  src={isSelected ? selectedImage : image}
                  alt={`${label} 아이콘`}
                  className="w-[3.2rem] h-[3.2rem] object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>

      <button
        disabled={!selected}
        onClick={() =>
          navigate("/hostspaceregisterinfo", {
            state: {
              spaceCategory: selected,
            },
          })
        }
        className={`max-w-[40rem] w-full h-[5rem] rounded-xl font-semibold transition fixed left-1/2 -translate-x-1/2 bottom-[2rem] text-16-SemiBold
            ${
              selected
                ? "bg-cr-black text-cr-white"
                : "bg-cr-100 text-cr-black cursor-not-allowed"
            }
          `}
      >
        선택 완료
      </button>
    </div>
  );
};

export default HostSpaceRegister;
