import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";

const spaceTypes = [
  "카페",
  "식당",
  "쿠킹 공방",
  "가족 공방",
  "의상 공방",
  "아트 공방",
  "기타",
];

const HostSpaceRegister = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-[100px] relative">
      {/* 1. 상단: 뒤로가기 + 공간 등록 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            // 다음 단계로 이동
            navigate(PATHS.HOST.MAIN);
          }}
          className="p-1"
        >
          {/* 뒤로가기 아이콘 (SVG) */}
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">공간 등록</h1>
      </div>

      {/* 2. 설명 문구 */}
      <h2 className="text-xl font-bold mt-8">공간 유형을</h2>
      <h2 className="text-xl font-bold mb-8">선택해주세요.</h2>

      {/* 3. 공간 선택 버튼들 */}
      <div className="grid grid-cols-2 gap-[1rem]">
        {spaceTypes.map((type) => {
          const isSelected = selected === type;
          return (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`relative w-full h-[10rem] rounded-xl border text-lg text-left p-[1rem] transition-all
                ${
                  isSelected
                    ? "bg-[#4C8EFF] text-white border-[#4C8EFF]"
                    : "bg-[#F2F3F6] text-black border-transparent"
                }
              `}
            >
              <span className="text-[1rem] font-medium text-lg absolute top-[2rem] left-[2rem]">
                {type}
              </span>

              {/* 오른쪽 아래 동그라미 */}
              <div
                className={`absolute bottom-[2rem] right-[2rem] w-[5rem] h-[5rem] rounded-full border transition
                  ${
                    isSelected
                      ? "bg-white border-white"
                      : "bg-white border-white"
                  }
                `}
              />
            </button>
          );
        })}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[40rem]">
        <button
          disabled={!selected}
          onClick={() => {
            navigate(PATHS.HOST.SPACE_REGISTER_INFO);
          }}
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
