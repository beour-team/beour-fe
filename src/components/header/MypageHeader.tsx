type MypageHeaderProps = {
  children: React.ReactNode;
};
const MypageHeader = ({ children }: MypageHeaderProps) => {
  return (
    <header className="min-h-[7.5rem] text-18-Bold flex items-center">
      {children}
    </header>
  );
};

export default MypageHeader;
