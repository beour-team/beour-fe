// yarn add react-day-picker date-fns 라이브러리 설치 필요
import { DayPicker } from "react-day-picker"; //react-day-picker 라이브러리 사용
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface DateTimePickerProps {
  onComplete: (text: string) => void;
}

const DateTimePicker = ({ onComplete }: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(); // 선택한 날짜 저장
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // 선택한 시간 저장
  const [allDay, setAllDay] = useState(false); // 일정 무관 체크박스 상태
  const [anyTime, setAnyTime] = useState(false); // 시간 무관 체크박스 상태

  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
  const handleComplete = () => {
    let text = "날짜 무관";
    if (!allDay && selectedDate) {
      const formatted = format(selectedDate, "yyyy. MM. dd (E)", {
        locale: ko,
      });
      text = `${formatted} ${anyTime ? "시간 무관" : selectedTime || ""}`;
    }
    onComplete(text);
  };

  return (
    // 임시로 색깔지정해둠 바꾸기
    <div className="fixed bottom-0  bg-[#ffe0e0] rounded-t-2xl shadow-xl p-4 text-sm">
      <span className="text-[1.5rem] font-semibold mb-2">
        대여 일자를 선택해주세요
      </span>

      <div className="flex items-center justify-between mb-2">
        {/* 일정무관 체크박스 */}
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
          />
          일정 무관
        </label>
      </div>

      {/* 캘린더 */}
      {!allDay && (
        <DayPicker
          mode="single"
          selected={selectedDate} // 선택한 날짜 하이라이트
          onSelect={setSelectedDate}
          locale={ko}
          weekStartsOn={0}
          modifiersClassNames={{
            selected: "bg-black text-white",
            today: "text-black font-bold",
          }}
          styles={{
            caption: { textAlign: "start", marginBottom: "0.5rem" },
            day: {
              width: "2.2rem",
              height: "2.2rem",
              lineHeight: "2.2rem",
              margin: "0.2rem",
            },
          }}
        />
      )}

      {/* 시간 선택 버튼 */}
      {!allDay && (
        <>
          <h3 className="font-semibold mt-4 mb-2">대여 시간을 선택해주세요</h3>
          <div className="flex gap-2 overflow-x-auto mb-2">
            {hours.map((hour) => (
              <button
                key={hour}
                onClick={() => {
                  setSelectedTime(hour);
                  setAnyTime(false); //시간 무관 해제
                }}
                className={`min-w-[60px] px-3 py-2 rounded-md text-sm ${
                  selectedTime === hour ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {hour}
              </button>
            ))}
          </div>

          {/* 시간 무관 체크박스 */}
          <label className="flex items-center gap-1 text-xs mb-4">
            <input
              type="checkbox"
              checked={anyTime}
              onChange={(e) => {
                setAnyTime(e.target.checked);
                if (e.target.checked) setSelectedTime(null);
              }}
            />
            시간 무관
          </label>
        </>
      )}

      <div className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-gray-600">
          대여일시:
          {allDay
            ? " 날짜 무관"
            : selectedDate
            ? ` ${format(selectedDate, "yyyy. MM. dd (E)", {
                locale: ko,
              })} ${anyTime ? "시간 무관" : selectedTime || ""}`
            : " 선택 안됨"}
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded text-sm"
          onClick={handleComplete}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default DateTimePicker;
