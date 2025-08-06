import { useState } from "react";
import HostReservationCard from "./HostReservationCard";
import SpaceListDown from "../../components/HostMainPage/SpaceListDown";
import HostFooter from "../../components/footer/HostFooter";
import { CalendarSection } from "../space-schedule/components";

const HostCalendar = () => {
  const [selected, setSelected] = useState("스윗라운지");
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "강유진",
      place: "[스윗 라운지] 주방",
      time: "18:00 - 19:00",
      people: "3",
      reserveId: "01234567",
      initialStatus: "pending" as const,
    },
  ]);

  const handleDelete = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // 선택된 날짜를 저장하는 상태 (단일 선택 모드)
  const [selectedDates, setSelectedDates] = useState<Date | undefined>(
    undefined
  );

  return (
    <div>
      <div className="w-full mt-[2rem] relative px-[2rem] overflow-y-auto bg-cr-white rounded-t-[2rem]">
        <CalendarSection
          selectedDates={selectedDates}
          onSelect={setSelectedDates}
        />
      </div>
      <div className="px-[2rem] min-h-screen bg-[#ECEEF1] px-4 py-6">
        <div className="pb-[2rem]">
          <div className="flex items-center">
            <p className="text-13-Medium text-gray-500">총 {cards.length}건</p>
            <SpaceListDown selected={selected} onSelect={setSelected} />
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          {cards.map((card) => (
            <HostReservationCard
              key={card.id}
              {...card}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </div>
      </div>
      <HostFooter />
    </div>
  );
};

export default HostCalendar;
