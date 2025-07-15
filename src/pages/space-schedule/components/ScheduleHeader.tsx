import React from "react";
import { spot } from "../../../assets/theme";

interface ScheduleHeaderProps {
  spaceName: string;
}

const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ spaceName }) => {
  return (
    <div className="flex items-center gap-[0.8rem] my-[1.6rem]">
      <div className="w-[2.4rem] h-[2.4rem] flex items-center justify-center">
        <img src={spot} alt="spot" />
      </div>
      <div>
        <h1 className="text-14-SemiBold">{spaceName}</h1>
      </div>
    </div>
  );
};

export default ScheduleHeader;
