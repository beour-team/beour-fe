import React from "react";

interface ToolTipProps {
  children: React.ReactNode;
}

const ToolTip = ({ children }: ToolTipProps) => {
  return (
    <div className="relative flex justify-center py-[2.4rem]">
      <div className="bg-cr-blue text-white text-14-Medium flex items-center px-4 py-2 rounded-[1rem] w-[22rem] justify-center h-[4rem] ">
        {children}
      </div>

      <div className="absolute top-[1.1rem]  border-l-[1rem] border-r-[1rem] border-b-[1.4rem] border-transparent border-b-cr-blue" />
    </div>
  );
};

export default ToolTip;
