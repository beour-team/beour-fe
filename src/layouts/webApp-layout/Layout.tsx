import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    // 다 완성되고 흰색으로 변동하면 될 것 같아요 스페이스클라우드처럼요!
    <div className="w-full min-h-screen bg-[#E9EBEE] flex justify-center items-center">
      <div
        className="
        w-full
        max-w-full
        sm:max-w-[600px]
        md:max-w-[800px]
        lg:max-w-[1200px]
        xl:max-w-[1300px]
        bg-white
        min-h-screen
        shadow-sm
      "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
