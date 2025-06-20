import { useNavigate } from "react-router-dom";
import { leftArrow } from "../../assets/theme";

type HeaderProps = {
  children: React.ReactNode;
};

const PageHeader = ({ children }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="min-h-[7.5rem] flex w-full items-center justify-between">
      <button className="w-[2.4rem] h-[2.4rem] " onClick={() => navigate(-1)}>
        <img className="mr-[0.8rem]" src={leftArrow} alt="뒤로가기 아이콘" />
      </button>
      <p className="text-18-SemiBold">{children}</p>
      <div className="w-[2.4rem] h-[2.4rem]"></div>
    </header>
  );
};

export default PageHeader;
