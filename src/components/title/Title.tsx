import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <div className="w-fit">
      <h2 className="text-24-Bold leading-[3.5rem]">{children}</h2>
    </div>
  );
};

export default Title;
