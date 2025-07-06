import { notification } from "../../assets/theme";

type MypageHeaderProps = {
  children: React.ReactNode;
};
const MypageHeader = ({ children }: MypageHeaderProps) => {
  return (
    <header className="min-h-[7.5rem] text-18-Bold flex items-center justify-between">
      {children}
      <div>
        <img src={notification} alt="알림 아이콘" />
      </div>
    </header>
  );
};

export default MypageHeader;
