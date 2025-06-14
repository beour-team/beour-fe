import { useState } from "react";
import GuestFooter from "../../components/GuestFooter";
import ReserveToggle from "./ReserveToggle";
import CurrentReservations from "./CurrentResrvations";
import PastReservations from "./PastReservations";
import CanceledReservations from "./CanceledReservations";
import { notification } from "../../assets/theme";

type ReservationCategory = "current" | "past" | "cancel";

const GuestReservePage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ReservationCategory>("current");

  return (
    <div>
      <div className="flex justify-between items-center ml-[2rem] mr-[2.1rem] mt-[3.9rem] mb-[3rem]">
        <div className="text-18-Bold">나의 예약</div>
        <img
          src={notification}
          alt="알림"
          className="w-[1.99rem] object-contain cursor-pointer"
        />
      </div>

      <div className="flex justify-center mb-[2rem]">
        <ReserveToggle
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>
      <div className="pb-[7rem]">
        {selectedCategory === "current" && <CurrentReservations />}
        {selectedCategory === "past" && <PastReservations />}
        {selectedCategory === "cancel" && <CanceledReservations />}
      </div>
      <GuestFooter />
    </div>
  );
};
export default GuestReservePage;
