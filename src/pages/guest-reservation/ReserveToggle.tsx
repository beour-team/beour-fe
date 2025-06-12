type ReservationCategory = "current" | "past" | "cancel";
type CategoryToggleProps = {
  selected: ReservationCategory;
  setSelected: (value: ReservationCategory) => void;
};

const ReserveToggle = ({ selected, setSelected }: CategoryToggleProps) => {
  const options: ReservationCategory[] = ["current", "past", "cancel"];
  const selectedIndex = options.indexOf(selected);

  return (
    <div className="relative bg-[#E9ECF2] rounded-full w-full max-w-[38rem] p-[0.4rem] flex justify-between items-center h-[4rem]">
      <div
        className="absolute top-[0.2rem] left-1 w-[33%] h-[3.6rem] rounded-full bg-white transition-transform duration-300"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`flex-1 z-10 text-14-SemiBold transition-colors duration-300 ${
            selected === option ? "text-black" : "text-[#9296A1]"
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
