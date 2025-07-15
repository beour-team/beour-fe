import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-400 flex justify-center items-center">
      <div className="relative max-w-[43rem] min-w-[32rem] w-full bg-white min-h-screen shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
