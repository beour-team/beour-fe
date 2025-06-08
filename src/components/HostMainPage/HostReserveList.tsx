import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceListDown from "./SpaceListDown";
import ReservationCard from "./ReservationCard";

const HostReserveList = () => {
  const nav = useNavigate();
  const today = "2025년 5월 7일";
  const options: string[] = ["스윗라운지", "회의실", "전체"];

  const [selected, setSelected] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="px-[2rem] min-h-screen bg-[#ECEEF1] px-4 py-6">
      <div className="pb-[2rem]">
        {/* 상단: 제목, 날짜, 라운지 버튼 */}
        <div className="flex items-center">
          <h2 className="text-lg font-bold mr-2">오늘의 예약</h2>
          <span className="text-sm font-medium mr-2">{today}</span>
          <SpaceListDown selected={selected} onSelect={handleSelect} />
        </div>

        {/* 하단: 총 건수, 필터 아이콘 */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-500">총 3건</p>
          <button>
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18M6 10h12M10 16h4"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <ReservationCard />
        <ReservationCard />
      </div>
    </div>
  );
};

export default HostReserveList;
