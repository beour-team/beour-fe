import React from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import "react-day-picker/style.css";

interface CalendarSectionProps {
  selectedDates: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({
  selectedDates,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <DayPicker
        mode="single"
        animate
        selected={selectedDates}
        onSelect={onSelect}
        locale={ko}
        formatters={{
          formatCaption: (date) => format(date, "yyyy년 M월", { locale: ko }),
        }}
        weekStartsOn={0}
        disabled={{ before: new Date() }}
        className="w-full"
        navLayout="around"
        classNames={{
          nav: "flex items-center justify-between",
          caption_label: "font-18-SemiBold flex items-center",
          day: "w-[6rem] h-[6rem] text-[1.5rem] bg-[radial-gradient(circle_2rem,theme(colors.cr-200)_100%,transparent_100%)]",
          day_button: "w-full h-full flex items-center justify-center",
          weekday: "text-[1.5rem] font-medium text-[#9296A1] py-[2rem]",
        }}
        modifiersClassNames={{
          selected:
            "!bg-[radial-gradient(circle_2rem,theme(colors.cr-blue)_100%,transparent_100%)] !text-cr-white",
          today:
            "!bg-[radial-gradient(circle_2rem,theme(colors.cr-primary)_100%,transparent_100%)] !text-cr-blue",
        }}
      />
    </div>
  );
};

export default CalendarSection;
