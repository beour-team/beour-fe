// yarn add react-day-picker date-fns 라이브러리 설치 필요
import { DayPicker } from "react-day-picker"; //react-day-picker 라이브러리 사용
import "react-day-picker/dist/style.css";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { formatTimeRanges } from "../../../utils/format-time-range";

interface DateTimePickerProps {
  onComplete: (text: string) => void;
}

const DateTimePicker = ({ onComplete }: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(); // 선택한 날짜 저장
  const [selectedTime, setSelectedTime] = useState<string[]>([]); // 선택한 시간 저장
  const [allDay, setAllDay] = useState(false); // 일정 무관 체크박스 상태
  const [anyTime, setAnyTime] = useState(false); // 시간 무관 체크박스 상태

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
  ];
  const handleComplete = () => {
    let text = "날짜 무관";
    if (!allDay && selectedDate) {
      const formatted = format(selectedDate, "yyyy. MM. dd (E)", {
        locale: ko,
      });
      const timeText = anyTime ? "시간 무관" : formatTimeRanges(selectedTime);
      text = `${formatted} ${timeText}`;
    }
    onComplete(text);
  };

  return (
    // 임시로 색깔지정해둠 바꾸기 (흰색으로 하면 안보임)
    <div className="fixed bottom-0 bg-white rounded-t-2xl shadow-xl p-[3rem] h-[79rem] overflow-y-auto w-[39rem] left-[51%] -translate-x-1/2 z-50">
      <div className="flex items-center justify-between mb-[1.7rem]">
        <span className="text-14-SemiBold">
          원하는 대여 일자를 선택해주세요
        </span>

        {/* 일정무관 체크박스 */}
        <div className="">
          <label className=" flex items-end gap-2 text-12-Medium text-cr-600">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="w-6 h-6 border-[#8D8D93] accent-[#000000] transition"
            />
            일정 무관
          </label>
        </div>
      </div>

      {/* 캘린더 */}
      {!allDay && (
        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate} // 선택한 날짜 하이라이트
            onSelect={setSelectedDate}
            locale={ko}
            weekStartsOn={0}
            disabled={{ before: new Date() }}
            modifiersClassNames={{
              selected: "bg-cr-blue text-white rounded-full",
              today: "text-black font-bold",
            }}
            styles={{
              caption: { textAlign: "start", marginBottom: "0.5rem" },
              day: {
                width: "w-full",
                height: "3rem",
                lineHeight: "2.2rem",
                fontSize: "1.5rem",
              },
              weekday: {
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "#9296A1",
              },
            }}
          />
        </div>
      )}

      {/* 시간 선택 버튼 */}
      {!allDay && (
        <div className="mb-[5rem]">
          <div className="flex items-center justify-between">
            <div className="text-14-SemiBold my-[3rem]">
              원하는 대여 시간을 선택해주세요
            </div>
            {/* 시간 무관 체크박스 */}
            <label className="flex items-end gap-2 text-12-Medium text-cr-600">
              <input
                type="checkbox"
                checked={anyTime}
                onChange={(e) => {
                  setAnyTime(e.target.checked);
                  if (e.target.checked) setSelectedTime([]);
                }}
                className="w-6 h-6 border-[#8D8D93] accent-[#000000] transition"
              />
              시간 무관
            </label>
          </div>
          <div className="overflow-x-auto max-w-full">
            <div
              ref={scrollRef}
              className="flex gap-2 mb-2 whitespace-nowrap overflow-x-auto scrollbar-hide"
            >
              {hours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => {
                    if (selectedTime.includes(hour)) {
                      setSelectedTime(selectedTime.filter((t) => t !== hour));
                    } else {
                      setSelectedTime([...selectedTime, hour]);
                    }
                    setAnyTime(false); //시간 무관 해제
                  }}
                  className={`min-w-[6rem] px-[1.2rem] py-[1.7rem] rounded-md text-12-Medium ${
                    selectedTime.includes(hour)
                      ? "bg-cr-blue text-white"
                      : "bg-cr-300"
                  }`}
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center border-t">
        <div className="text-[1.4rem] my-[2rem]">
          <div className="pb-[1.4rem]">대여일시</div>
          {allDay
            ? " 날짜 무관"
            : selectedDate
            ? ` ${format(selectedDate, "yyyy. MM. dd (E)", {
                locale: ko,
              })} ${anyTime ? "시간 무관" : formatTimeRanges(selectedTime)}`
            : " 선택 안됨"}
        </div>
        <button
          className="bg-black text-white px-[2.8rem] py-[1.7rem] rounded-[1rem] text-16-Medium  whitespace-nowrap self-start mt-[1.5rem]"
          onClick={handleComplete}
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default DateTimePicker;
