type ReservationCategory = "current" | "past" | "cancel";
type CategoryToggleProps = {
  selected: ReservationCategory;
  setSelected: (value: ReservationCategory) => void;
};

const ReserveToggle = ({ selected, setSelected }: CategoryToggleProps) => {
  const options: ReservationCategory[] = ["current", "past", "cancel"];
  const selectedIndex = options.indexOf(selected);

  return (
    <div className="relative bg-cr-200 rounded-full w-full max-w-[38rem] p-[0.4rem] flex justify-between items-center h-[5rem]">
      <div
        className="absolute top-[0.4rem] left-3 w-[32%] h-[4rem] rounded-full bg-white transition-transform duration-300"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`flex-1 z-10 transition-colors duration-300 ${
            selected === option
              ? "text-black text-14-SemiBold"
              : "text-cr-500 text-14-Medium"
          }`}
        >
          {option === "current"
            ? "예약 현황"
            : option === "past"
            ? "지난 예약"
            : "취소 예약"}
        </button>
      ))}
    </div>
  );
};

export default ReserveToggle;
