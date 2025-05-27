import { Outlet } from "react-router-dom";

const Contents: React.FC = () => {
  return (
    <div className="w-full min-h-screen h-full">
      <Outlet />
    </div>
  );
};

export default Contents;
