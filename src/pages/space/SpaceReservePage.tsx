// 예약 - 예약 신청 단계 페이지
import { DayPicker } from "react-day-picker";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { hours } from "../../constants/guest-main/hour-data";
import { ko } from "date-fns/locale";
import { formatTimeRanges } from "../../utils/format-time-range";
import UseTypeBtn from "../guest-main/filter/UseTypeBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import toast from "react-hot-toast";
import { warning } from "../../assets/theme";
import BackButton from "../../components/BackButton";

const SpaceReservePage = () => {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [useType, setUseType] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nav = useNavigate();
  const location = useLocation();
  const { name, maxCapacity, contact, pricePerHour } = location.state || {};

  const handleComplete = () => {
    if (!selectedDate || selectedTime.length === 0) {
      toast("날짜와 시간을 모두 선택해주세요.", {
        icon: <img src={warning} alt="경고" />,
        style: {
          borderRadius: "10px",
          background: "#2A2C32",
          color: "#FFFFFF",
          width: "35.4rem",
          height: "4rem",
          fontSize: "1.4rem",
          marginBottom: "8rem",
        },
        duration: 1000, //1초후 자동 사라짐
      });

      return;
    }

    nav(PATHS.GUEST.RESERVECOMPLETED, {
      state: {
        selectedDate,
        selectedTime,
        useType,
        text,
        name,
        maxCapacity,
        contact,
        pricePerHour,
      },
    });
  };

  const disabledTime = ["08:00", "15:00"]; //대여 불가 시간 더미데이터

  return (
    <div>
      <div className="flex items-center mx-[1rem] mt-[3rem]">
        <BackButton className="w-[2.5rem] text-cr-600" />
        <div className="text-14-SemiBold ">대여 일자를 선택해주세요</div>
      </div>
      <div className="mt-[1rem] mb-[2rem] mx-[1.5rem]">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={ko}
          weekStartsOn={0}
          disabled={{ before: new Date() }}
          className="w-full"
          modifiersClassNames={{
            selected: "bg-cr-blue text-white rounded-full",
            today: "text-cr-blue bg-cr-primary rounded-full font-bold",
          }}
          classNames={{
            caption_label: "py-[1rem] font-18-SemiBold",
            day: "w-[5.5rem] h-[5.5rem] text-[1.5rem]",
            day_button: " w-full h-full flex items-center justify-center",
            weekday: "text-[1.5rem] font-medium text-[#9296A1] py-[2rem]",
          }}
        />
      </div>
      <div className="border-cr-100 border-[0.4rem]" />

      <div className="mx-[1.5rem] my-[3rem]">
        <p className="text-14-SemiBold my-[1rem]">대여 시간을 선택해주세요</p>
        <div className="overflow-x-auto max-w-full mt-[3rem]">
          <div
            ref={scrollRef}
            className="flex gap-[0.5rem] mb-2 whitespace-nowrap overflow-x-auto scrollbar-hide"
          >
            {hours.map((hour) => {
              const isDisabled = disabledTime.includes(hour);
              const isSelected = selectedTime.includes(hour);

              return (
                <div key={hour} className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (!isDisabled) {
                        if (isSelected) {
                          setSelectedTime(
                            selectedTime.filter((t) => t !== hour)
                          );
                        } else {
                          setSelectedTime([...selectedTime, hour]);
                        }
                      }
                    }}
                    disabled={isDisabled}
                    className={`w-[6.7rem] h-[5.4rem] rounded-md text-12-Regular ${
                      isDisabled
                        ? "bg-cr-300 text-cr-500 cursor-not-allowed"
                        : isSelected
                        ? "bg-cr-blue text-white"
                        : "bg-cr-400"
                    }`}
                  >
                    {hour}
                  </button>
                  <span className="mt-[1rem] text-12-Regular text-cr-700">
                    {isDisabled ? "대여불가" : "30,000"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-[1.5rem] my-[3rem]">
        <p className="text-14-SemiBold my-[2rem]">이용 목적이 어떤 건가요?</p>
        <UseTypeBtn useType={useType} setUseType={setUseType} />
      </div>

      <div className="mx-[1.5rem] my-[3rem]">
        <p className="text-14-SemiBold my-[2rem]">요청 사항이 있나요?</p>
        <div className="relative w-full">
          <textarea
            className="bg-cr-100 w-full h-[16.4rem] rounded-[1rem] p-[1rem] leading-[2rem] text-14-Medium resize-none"
            placeholder="호스트에게 부탁할 요청 사항이 있다면 적어주세요. ex) 요리 연습을 할 건데 프라이팬을 준비해주실 수 있나요?"
            maxLength={199}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute bottom-[1rem] right-[1rem] text-12-Regular text-cr-400">
            {text.length}/200 자
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t">
        <div className="text-[1.4rem] my-[2rem] mx-[1.5rem]">
          <div className="pb-[1.4rem]">대여일시</div>
          {selectedDate
            ? `${format(selectedDate, "yyyy. MM. dd (E)", {
                locale: ko,
              })} ${formatTimeRanges(selectedTime)}`
            : "선택 안됨"}
        </div>
        <button
          className="bg-black text-white px-[2.8rem] py-[1.7rem] rounded-[1rem] text-16-Medium  whitespace-nowrap self-start mt-[1.5rem] mx-[1.5rem]"
          onClick={handleComplete}
        >
          예약 하기
        </button>
      </div>
    </div>
  );
};
export default SpaceReservePage;
