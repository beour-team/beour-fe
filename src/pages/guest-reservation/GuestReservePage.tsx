import { useState } from "react";
import GuestFooter from "../../components/GuestFooter";
import ReserveToggle from "../../components/GuestReservePage/ReserveToggle";
import CurrentReservations from "../../components/GuestReservePage/CurrentResrvations";
import PastReservations from "../../components/GuestReservePage/PastReservations";
import CancelledReservations from "../../components/GuestReservePage/CancelledReservations";

type ReservationCategory = "current" | "past" | "cancel";

const GuestReservePage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ReservationCategory>("current");

  return (
    <div className="">
      <div className="text-18-SemiBold text-[#302F2F] my-[2rem] mx-[2rem]">
        공간 예약 내역
      </div>

      <div className="flex justify-center mb-[2rem]">
        <ReserveToggle
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>
      <div>
        {selectedCategory === "current" && <CurrentReservations />}
        {selectedCategory === "past" && <PastReservations />}
        {selectedCategory === "cancel" && <CancelledReservations />}
      </div>

      <GuestFooter />
    </div>
  );
};
export default GuestReservePage;
