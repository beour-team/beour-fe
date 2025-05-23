import MypageMenuList from "../MypageMenuList";
import MypageProfile from "../MypageProfile";

const MypageHost: React.FC = () => {
  return (
    <div className="px-[2rem] w-full min-h-screen">
      <header className="h-[7.5rem] text-18-SemiBold flex items-center">
        마이페이지
      </header>

      <MypageProfile />

      <MypageMenuList />
    </div>
  );
};

export default MypageHost;
