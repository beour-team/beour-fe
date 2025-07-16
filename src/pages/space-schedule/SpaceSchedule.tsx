/**
 * SpaceSchedule 컴포넌트 (메인 팝업)
 *
 * 📝 역할: 공간 스케줄을 설정할 수 있는 팝업 전체를 관리하는 메인 컴포넌트
 * 🎯 목적: 호스트가 자신의 공간을 언제, 몇 시에 대여할 수 있는지 설정할 수 있게 하기
 * 📱 기능:
 *   - 모바일 친화적 팝업 (하단에서 올라오는 형태)
 *   - 드래그로 팝업 닫기
 *   - 날짜 선택 (달력)
 *   - 시간 선택 (8시~22시)
 *   - 휴무일 설정
 *   - 모든 날짜 적용 옵션
 * 🏗️ 구조:
 *   - 각 기능별로 별도 컴포넌트로 분리
 *   - 상태 관리는 이 메인 컴포넌트에서 담당
 *   - 하위 컴포넌트들은 props로 데이터와 함수를 전달받음
 *
 * @author 개발팀
 * @since 2024
 */

// React와 필요한 라이브러리들을 가져오기
import React, { useState } from "react";
// 분리된 컴포넌트들을 가져오기
import {
  DragHandle,
  ScheduleHeader,
  CalendarSection,
  HolidayCheckbox,
  TimeSelection,
  ApplyAllCheckbox,
  ApplyButton,
} from "./components";

// 팝업창에 필요한 데이터 타입 정의
interface SpaceScheduleProps {
  isOpen: boolean; // 팝업이 열려있는지 여부
  onClose: () => void; // 팝업을 닫는 함수
  spaceName?: string; // 공간 이름 (선택사항)
}

// 스케줄 팝업 컴포넌트 시작
const SpaceSchedule: React.FC<SpaceScheduleProps> = ({
  isOpen, // 팝업 열림/닫힘 상태
  onClose, // 팝업 닫기 함수
  spaceName = "게임 파티룸 플레이에 상성역점", // 기본 공간 이름
}) => {
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

  const handleApply = () => {
    // 선택된 데이터들을 콘솔에 출력
    console.log("적용하기", {
      selectedDates, // 선택된 날짜들
      selectedTime, // 선택된 시간들
      isHoliday, // 휴무일 설정 여부
      applyToAll, // 모든 일자 적용 여부
    });
    onClose(); // 팝업창 닫기
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
      className="fixed bottom-0 inset-0 z-50 bg-black bg-opacity-50 flex items-end"
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
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />

          {/* 모든 일자 적용 체크박스 */}
          <ApplyAllCheckbox
            applyToAll={applyToAll}
            onToggle={() => setApplyToAll(!applyToAll)}
          />

          {/* 적용하기 버튼 - 설정 완료 */}
          <ApplyButton onApply={handleApply} />
        </div>
      </div>
    </div>
  );
};

export default SpaceSchedule;
