import React from "react";

type ColorTagProps = {
  children: React.ReactNode;
};

const ColorTag = ({ children }: ColorTagProps) => {
  return (
    <div className="px-[0.4rem] py-[0.2rem] bg-[#6B96F94D] w-fit text-[1.2rem] text-cr-blue rounded-[0.5rem]">
      {children}
    </div>
  );
};

export default ColorTag;
