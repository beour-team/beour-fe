import { useNavigate } from "react-router-dom";
import ReservationCard from "./ReservationCard";
import { filter, underArrow, topArrow } from "../../assets/theme";
import { useState } from "react";

// API 연동 킬때는 이 부분 주석 해제
// import { useEffect, useState } from "react";
// import { getHostSpaces } from "../../api/Host/hostmainspace";

const HostReserveList = () => {
  const nav = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const today = "2025년 5월 7일";

  //dummy data;
  const categories = [
    "전체",
    "콩집 키친 서..",
    "온귤",
    "스윗라운지",
    "폴인테이블",
  ];

  //API 연동 부분
  // const [categories, setCategories] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const spaceNames = await getHostSpaces();
  //       setCategories(["전체", ...spaceNames]);
  //     } catch (error) {
  //       console.error("공간 목록을 불러오는데 실패했습니다.", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const [cards] = useState([
    {
      id: 1,
      name: "강유진",
      place: "[스윗 라운지] 주방",
      time: "18:00 - 19:00",
      people: 3,
      reserveId: "01234567",
      initialStatus: "pending",
    },
    {
      id: 2,
      name: "김철수",
      place: "[온귤] 작업실",
      time: "15:00 - 17:00",
      people: 8,
      reserveId: "49926365",
      initialStatus: "pending",
    },
  ]);

  const [active, setActive] = useState("온귤");

  return (
    <div className="px-[2rem] min-h-screen bg-cr-100 px-4 py-6 pb-[2rem]">
      <div className="pb-[2rem]">
        {/* 상단: 제목, 날짜, 라운지 버튼 */}
        <div className="flex items-center pb-[1.5rem]">
          <h2 className="text-20-Bold font-bold mr-2">오늘의 예약</h2>
          <span className="text-16-Medium font-medium mr-2">{today}</span>
          <button
            className="text-12-Regular text-cr-500 flex items-center gap-1"
            onClick={() => setShowCategories(!showCategories)}
          >
            <img
              src={showCategories ? topArrow : underArrow}
              alt="더보기"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* 중간: 공간 버튼 */}
        {showCategories && (
          <div className="flex gap-2 py-2 pb-[1.5rem] flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`px-4 h-[32px] rounded-full text-14-Medium whitespace-nowrap transition
        ${
          active === category
            ? "bg-cr-blue text-white"
            : "bg-cr-300 text-cr-500"
        }
      `}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* 하단: 총 건수, 필터 아이콘 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center justify-between">
            <p className="text-13-Medium text-gray-500">총 {cards.length}건</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button>
              <img src={filter} alt="필터 아이콘" className="w-6 h-6" />
            </button>
            <p className="text-14-semibold">필터</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        {cards.map((card) => (
          <ReservationCard key={card.id} {...card} />
        ))}
      </div>

      <button
        onClick={() => nav("/hostspaceregister")}
        className="fixed bottom-[10%] left-[60%] -translate-x-1/2 bg-cr-black text-white rounded-full shadow-lg px-10 py-5 text-14-Medium z-50"
      >
        + 공간 추가
      </button>
    </div>
  );
};

export default HostReserveList;
