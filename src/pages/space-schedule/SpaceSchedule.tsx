import React, { useState } from "react";
import {
  DragHandle,
  ScheduleHeader,
  CalendarSection,
  HolidayCheckbox,
  TimeSelection,
  ApplyAllCheckbox,
  ApplyButton,
} from "./components";
import {
  useGetSpaceAvailableTimes,
  useUpdateSpaceAvailableTimes,
} from "../../hooks/space/useSpaceSchedule";

// 팝업창에 필요한 데이터 타입 정의
interface SpaceScheduleProps {
  isOpen: boolean; // 팝업이 열려있는지 여부
  onClose: () => void; // 팝업을 닫는 함수
  spaceName?: string; // 공간 이름 (선택사항)
  spaceId: number; // 공간 ID (API 호출용)
}

// 스케줄 팝업 컴포넌트 시작
const SpaceSchedule: React.FC<SpaceScheduleProps> = ({
  isOpen, // 팝업 열림/닫힘 상태
  onClose, // 팝업 닫기 함수
  spaceName = "게임 파티룸 플레이에 상성역점", // 기본 공간 이름
  spaceId, // 공간 ID
}) => {
  // 공간 대여 가능 시간 조회 훅
  const { data: spaceScheduleData } = useGetSpaceAvailableTimes(spaceId);

  console.log("🌟 spaceScheduleData", spaceScheduleData);

  // 공간 대여 가능 시간 업데이트 훅
  const { mutateAsync: updateAvailableTimes, isPending: isUpdating } =
    useUpdateSpaceAvailableTimes(spaceId);

  console.log("🌟 isUpdating", isUpdating);

  // 선택된 날짜를 저장하는 상태 (단일 선택 모드)
  const [selectedDates, setSelectedDates] = useState<Date | undefined>(
    undefined
  );

  // 선택된 시간들을 저장하는 상태 (기본값: 9시, 10시, 11시)
  const [selectedTime, setSelectedTime] = useState<string[]>([
    "09:00",
    "10:00",
    "11:00",
  ]);

  // 휴무일 설정 여부를 저장하는 상태
  const [isHoliday, setIsHoliday] = useState(false);

  // 모든 일자에 적용할지 여부를 저장하는 상태
  const [applyToAll, setApplyToAll] = useState(false);

  // 드래그 시작 위치를 저장하는 상태
  const [dragStartY, setDragStartY] = useState(0);

  // 현재 드래그 위치를 저장하는 상태
  const [dragCurrentY, setDragCurrentY] = useState(0);

  // 현재 드래그 중인지 여부를 저장하는 상태
  const [isDragging, setIsDragging] = useState(false);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // 배경을 클릭하면 팝업창 닫기
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]; // 첫 번째 터치 포인트
    setDragStartY(touch.clientY); // 시작 위치 저장
    setDragCurrentY(touch.clientY); // 현재 위치 저장
    setIsDragging(true); // 드래그 중 상태로 변경
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return; // 드래그 중이 아니면 무시
    const touch = e.touches[0]; // 첫 번째 터치 포인트
    setDragCurrentY(touch.clientY); // 현재 위치 업데이트
  };

  const handleTouchEnd = () => {
    if (!isDragging) return; // 드래그 중이 아니면 무시

    const dragDistance = dragCurrentY - dragStartY; // 드래그한 거리 계산
    const threshold = 100; // 팝업을 닫기 위한 최소 드래그 거리 (100px)

    if (dragDistance > threshold) {
      onClose(); // 충분히 드래그했으면 팝업창 닫기
    }

    // 드래그 상태 초기화
    setIsDragging(false);
    setDragStartY(0);
    setDragCurrentY(0);
  };

  // YYYY-MM-DD (로컬)
  const formatDateLocal = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // "HH:mm:ss" → ["13:00","14:00", ...]  (정시 기준, [start,end) 반개구간)
  const expandAnchors = (start: string, end: string) => {
    const sh = Number(start.slice(0, 2));
    const eh = Number(end.slice(0, 2));
    const out: string[] = [];
    for (let h = sh; h < eh; h++) out.push(String(h).padStart(2, "0") + ":00");
    return out;
  };

  const toHHMMSS = (t: string) => `${t}:00`;

  // 하루 기본 표시 시간대
  const ALL_HOURS = React.useMemo(() => {
    const arr: string[] = [];
    for (let h = 8; h <= 22; h++) arr.push(String(h).padStart(2, "0") + ":00"); // ✅ 22까지
    return arr;
  }, []);

  const [disabledTimes, setDisabledTimes] = useState<string[]>([]);

  // 날짜나 서버 데이터가 바뀔 때마다 세팅
  React.useEffect(() => {
    if (!spaceScheduleData || !selectedDates) {
      setSelectedTime([]);
      setDisabledTimes([]);
      return;
    }

    const dateKey = formatDateLocal(selectedDates);

    const editable = (spaceScheduleData.editableTimeSlots ?? []).filter(
      (s) => s.date === dateKey
    );
    const nonEditable = (spaceScheduleData.nonEditableTimeSlots ?? []).filter(
      (s) => s.date === dateKey
    );

    const allowed = new Set<string>();
    editable.forEach((s) =>
      expandAnchors(s.startTime, s.endTime).forEach((t) => allowed.add(t))
    );
    const blocked = new Set<string>();
    nonEditable.forEach((s) =>
      expandAnchors(s.startTime, s.endTime).forEach((t) => blocked.add(t))
    );

    // 예약된 시간은 최우선으로 막기
    blocked.forEach((t) => allowed.delete(t));

    setSelectedTime(Array.from(allowed)); // 기본 선택값
    setDisabledTimes(Array.from(blocked)); // 비활성 목록
  }, [spaceScheduleData, selectedDates]);

  // [NEW] 적용(업데이트) 핸들러 ---------------------------------------
  const handleApply = async () => {
    if (!selectedDates) {
      alert("날짜를 먼저 선택해주세요.");
      return;
    }
    if (selectedTime.length === 0) {
      alert("열어줄 시간을 선택해주세요.");
      return;
    }

    const date = formatDateLocal(selectedDates);

    // 간단 버전: 1시간 단위로 그대로 전송 (필요하면 연속 구간 병합 가능)
    const availableTimes = [...selectedTime].sort().map((start) => {
      // ✅ 복사 후 정렬
      const [h, mm] = start.split(":").map(Number);
      const end = `${String(h + 1).padStart(2, "0")}:${String(mm).padStart(
        2,
        "0"
      )}`;
      return { date, startTime: toHHMMSS(start), endTime: toHHMMSS(end) }; // ✅ 헬퍼 사용
    });

    try {
      await updateAvailableTimes({
        availableTimes,
        isHoliday,
        applyToAll,
      });
      onClose();
    } catch (e) {
      console.error("❌ 대여 가능 시간 업데이트 실패:", e);
      alert("업데이트에 실패했습니다.");
    }
  };

  // 팝업이 닫혀있으면 아무것도 보여주지 않음
  if (!isOpen) return null;

  return (
    // 팝업 전체를 감싸는 배경 (반투명 검은색)
    <div
      className="absolute bottom-0 inset-0 z-50 bg-black bg-opacity-50 flex items-end"
      onClick={handleBackgroundClick} // 배경 클릭 시 팝업 닫기
    >
      {/* 실제 팝업 내용이 들어가는 흰색 박스 */}
      <div
        className={`w-full h-[95vh] px-[2rem] overflow-y-auto bg-cr-white rounded-t-[2rem] transform ${
          !isDragging ? "transition-transform duration-300" : "" // 드래그 중이 아닐 때만 애니메이션
        } ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{
          // 드래그 중일 때 팝업 위치 조정
          transform: isDragging
            ? `translateY(${Math.max(0, dragCurrentY - dragStartY)}px)` // 드래그 거리만큼 아래로 이동
            : isOpen
            ? "translateY(0)" // 팝업 열림: 원래 위치
            : "translateY(100%)", // 팝업 닫힘: 화면 아래로 숨김
        }}
        onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭 시 이벤트 전파 방지
        onTouchStart={handleTouchStart} // 터치 시작 이벤트
        onTouchMove={handleTouchMove} // 터치 이동 이벤트
        onTouchEnd={handleTouchEnd} // 터치 종료 이벤트
      >
        {/* 드래그 핸들러 */}
        <DragHandle />

        {/* 헤더 - 공간 이름과 위치 아이콘 */}
        <ScheduleHeader spaceName={spaceName} />

        {/* 팝업 내용 영역 */}
        <div className="w-full relative">
          {/* 달력 영역 - 날짜 선택 */}
          <CalendarSection
            selectedDates={selectedDates}
            onSelect={setSelectedDates}
          />

          {/* 휴무일 설정 체크박스 */}
          <HolidayCheckbox
            isHoliday={isHoliday}
            onToggle={() => setIsHoliday(!isHoliday)}
          />

          {/* 시간 선택 영역 - 대여 가능한 시간 선택 */}
          <TimeSelection
            options={ALL_HOURS} // 항상 보일 시간대
            selectedTime={selectedTime} // 기본 선택값 (editable)
            onTimeSelect={(times) => {
              // 비활성 시간 선택 방지 (이중 안전장치)
              const filtered = times.filter((t) => !disabledTimes.includes(t));
              setSelectedTime(filtered);
            }}
            disabledTimes={disabledTimes} // 예약되어 비활성
          />

          {/* 모든 일자 적용 체크박스 */}
          <ApplyAllCheckbox
            applyToAll={applyToAll}
            onToggle={() => setApplyToAll(!applyToAll)}
          />

          {/* 적용하기 버튼 - 설정 완료 */}
          <ApplyButton
            onApply={handleApply}
            disabled={isUpdating || !selectedDates || selectedTime.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceSchedule;
