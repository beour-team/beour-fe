import React, { useState } from "react";
import { Calendar } from "@mantine/dates";
import { Select } from "@mantine/core";

const HostCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [spaceFilter, setSpaceFilter] = useState("전체");

  const reservations = [
    {
      name: "강유진",
      status: "승인 대기",
      number: "01234567",
      space: "스윗 라운지",
      time: "18:00 - 19:00",
      people: 3,
    },
  ];

  return (
    <div className="p-4 text-[1.4rem]">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[2rem] font-semibold">2025년 5월</h2>
        <button className="text-[#C1C1C1]">휴무일 설정 &gt;</button>
      </div>

      {/* Calendar */}
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        size="md"
        className="rounded-md shadow mb-4"
      />

      {/* Filters */}
      <div className="flex justify-between items-center mb-3">
        <p>총 4건</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full bg-black text-white">
            전체
          </button>
          <button className="px-3 py-1 rounded-full bg-[#F5F5F5]">
            미승인
          </button>
          <button className="px-3 py-1 rounded-full bg-[#F5F5F5]">승인</button>
          <Select
            data={["콩집치킨 서울대점", "온규", "스윗라운지"]}
            value={spaceFilter}
            onChange={(val) => setSpaceFilter(val || "전체")}
            placeholder="공간별"
            className="w-[120px] text-[1.3rem]"
          />
        </div>
      </div>

      {/* Reservation Card */}
      <div className="border rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              강유진 <span className="text-sm text-gray-500">승인 대기</span>
            </p>
            <p className="text-sm text-gray-500">
              예약번호 {reservations[0].number}
            </p>
            <p className="mt-1">[{reservations[0].space}] 주방</p>
            <p className="text-sm text-gray-500">
              {reservations[0].time}   |   {reservations[0].people}인
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-[#D9D9D9] px-4 py-1 rounded-md text-sm">
              승인 거부
            </button>
            <button className="bg-[#4158D0] text-white px-4 py-1 rounded-md text-sm">
              예약 승인
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-[60px] text-[1.3rem]">
        <button className="text-black font-semibold">홈</button>
        <button className="text-[#4158D0] font-semibold">예약 캘린더</button>
        <button className="text-black font-semibold">채팅</button>
        <button className="text-black font-semibold">마이페이지</button>
      </div>
    </div>
  );
};

export default HostCalendar;
