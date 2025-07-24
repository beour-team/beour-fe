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
import { useSpaceSchedule } from "../../hooks/space/useSpaceSchedule";

// 팝업창에 필요한 데이터 타입 정의
interface SpaceScheduleProps {
  isOpen: boolean; // 팝업이 열려있는지 여부
  onClose: () => void; // 팝업을 닫는 함수
  spaceName?: string; // 공간 이름 (선택사항)
  spaceId?: number; // 공간 ID (API 호출용)
}

// 스케줄 팝업 컴포넌트 시작
const SpaceSchedule: React.FC<SpaceScheduleProps> = ({
  isOpen, // 팝업 열림/닫힘 상태
  onClose, // 팝업 닫기 함수
  spaceName = "게임 파티룸 플레이에 상성역점", // 기본 공간 이름
  spaceId, // 공간 ID
}) => {
  // 🌟 API 데이터를 가져오는 훅
  const {
    data: spaceScheduleData,
    loading,
    error,
    updateAvailableTimes,
    updating,
    // refetch, // 나중에 데이터 새로고침이 필요할 때 사용
  } = useSpaceSchedule(spaceId);

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

  const handleApply = async () => {
    // 선택된 데이터들과 API 데이터를 콘솔에 출력
    console.log("🎯 적용하기 - 선택된 설정:", {
      selectedDates, // 선택된 날짜들
      selectedTime, // 선택된 시간들
      isHoliday, // 휴무일 설정 여부
      applyToAll, // 모든 일자 적용 여부
    });

    // spaceId가 없으면 업데이트 불가능
    if (!spaceId) {
      console.error("❌ spaceId가 없어서 업데이트 불가능");
      alert("공간 정보를 찾을 수 없어요. 다시 시도해주세요.");
      return;
    }

    // 선택된 날짜와 시간으로 업데이트할 데이터 생성
    const availableTimes: {
      date: string;
      startTime: string;
      endTime: string;
    }[] = [];

    if (selectedDates && selectedTime.length > 0) {
      // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
      const dateString = selectedDates.toISOString().split("T")[0];

      // 선택된 각 시간을 시간대로 변환 (예: 09:00 → 09:00-10:00)
      selectedTime.forEach((time) => {
        const [hours, minutes] = time.split(":");
        const startTime = `${hours}:${minutes}`;
        const endHour = parseInt(hours) + 1;
        const endTime = `${endHour.toString().padStart(2, "0")}:${minutes}`;

        availableTimes.push({
          date: dateString,
          startTime,
          endTime,
        });
      });
    }

    console.log("📝 서버에 전송할 데이터:", { availableTimes });

    try {
      // API 호출로 대여 가능 시간 업데이트
      const result = await updateAvailableTimes({ availableTimes });
      console.log("✅ 대여 가능 시간 업데이트 성공:", result);

      // 성공 시 팝업 닫기
      onClose();
    } catch (err) {
      console.error("❌ 대여 가능 시간 업데이트 실패:", err);
      // 에러 발생 시 팝업은 닫지 않고 사용자가 다시 시도할 수 있도록 함
    }
  };

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
          {/* 🔄 로딩 상태 표시 */}
          {loading && (
            <div className="text-center py-4 text-gray-500">
              공간 스케줄 정보를 불러오는 중...
            </div>
          )}

          {/* ❌ 에러 상태 표시 */}
          {error && (
            <div className="text-center py-4 text-red-500 bg-red-50 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* 📊 API 데이터 정보 표시 (개발용) */}
          {spaceScheduleData && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              <div>📊 현재 공간 ID: {spaceScheduleData.spaceId}</div>
              <div>
                ✅ 수정 가능한 시간:{" "}
                {spaceScheduleData.editableTimeSlots?.length ?? 0}개
              </div>
              <div>
                🔒 수정 불가능한 시간:{" "}
                {spaceScheduleData.nonEditableTimeSlots?.length ?? 0}개
              </div>
            </div>
          )}

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
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />

          {/* 모든 일자 적용 체크박스 */}
          <ApplyAllCheckbox
            applyToAll={applyToAll}
            onToggle={() => setApplyToAll(!applyToAll)}
          />

          {/* 업데이트 중일 때 로딩 표시 */}
          {updating && (
            <div className="text-center py-4 text-blue-500">
              📝 대여 가능 시간을 업데이트 중...
            </div>
          )}

          {/* 적용하기 버튼 - 설정 완료 */}
          <ApplyButton onApply={handleApply} />
        </div>
      </div>
    </div>
  );
};

export default SpaceSchedule;
