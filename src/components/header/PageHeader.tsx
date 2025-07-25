import { useNavigate } from "react-router-dom";
import { leftArrow } from "../../assets/theme";

type HeaderProps = {
  children: React.ReactNode;
  backTo?: string; // ← 새로 추가
};

const PageHeader = ({ children, backTo }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="min-h-[7.5rem] flex w-full items-center justify-between">
      <button
        className="w-[2.4rem] h-[2.4rem] relative"
        onClick={() => (backTo ? navigate(backTo) : navigate(-1))} // ← 뒤로가기 누르면 원하는 페이지로 이동 할 수 있도록 수정
      >
        <img
          className="mr-[0.8rem] absolute top-0 left-[-0.4rem]"
          src={leftArrow}
          alt="뒤로가기 아이콘"
        />
      </button>
      <p className="text-18-SemiBold">{children}</p>
      <div className="w-[2.4rem] h-[2.4rem]"></div>
    </header>
  );
};

export default PageHeader;
