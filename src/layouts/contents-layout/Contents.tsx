import { Outlet } from "react-router-dom";

const Contents: React.FC = () => {
  return (
    <div className="w-full min-h-screen px-[2rem]">
      <Outlet />
    </div>
  );
};

export default Contents;
