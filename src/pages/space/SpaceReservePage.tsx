import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
// import { format } from "date-fns";
import { ko } from "date-fns/locale";
// import { formatTimeRanges } from "../../../utils/format-time-range";
import UseTypeBtn from "../guest-main/filter/UseTypeBtn";

const SpaceReservePage = () => {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  // const [selectedTime, setSelectedTime] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className="text-14-SemiBold mx-[1.5rem] my-[3rem]">
        대여 일자를 선택해주세요
      </div>
      <div className="mx-[1.5rem]">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={ko}
          weekStartsOn={0}
          disabled={{ before: new Date() }}
          modifiersClassNames={{
            selected: "bg-cr-blue text-white rounded-full",
            today: "text-cr-blue bg-cr-primary rounded-full font-bold",
          }}
          styles={{
            caption: { textAlign: "start", marginBottom: "0.5rem" },
            day: {
              width: "w-full",
              height: "3rem",
              lineHeight: "3rem",
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
      <div className="border-cr-100 border-[0.4rem]" />

      <div className="mx-[1.5rem] my-[3rem]">
        <p className="text-14-SemiBold my-[1rem]">대여 시간을 선택해주세요</p>
        <div>시간, 금액</div>
      </div>

      <div className="mx-[1.5rem] my-[3rem]">
        <p className="text-14-SemiBold my-[2rem]">이용 목적이 어떤 건가요?</p>
        <UseTypeBtn />
      </div>

      <div className="mx-[1.5rem] my-[3rem]">
        <p className="text-14-SemiBold my-[2rem]">요청 사항이 있나요?</p>
        <div className="relative w-full">
          <textarea
            className="bg-cr-100 w-full h-[16.4rem] rounded-[1rem] p-[1rem] leading-[2rem] text-14-Medium resize-none"
            placeholder="호스트에게 부탁할 요청 사항이 있다면 적어주세요. ex) 요리 연습을 할 건데 프라이팬을 준비해주실 수 있나요?"
            maxLength={199}
            value={text}
            onChange={handleChange}
          />
          <div className="absolute bottom-[1rem] right-[1rem] text-12-Regular text-cr-400">
            {text.length}/200 자
          </div>
        </div>
      </div>

      <div>대여일시, 예약하기</div>
    </div>
  );
};
export default SpaceReservePage;
