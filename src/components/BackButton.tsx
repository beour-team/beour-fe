// 뒤로가기 버튼
// 기본 : <BackButton />
// 색상 바꾸기 : <BackButton color="#000000" />
// 추가 스타일 : <BackButton color="#000000" className="w-[4rem]" />
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  //커스터마이즈
  to?: string;
  color?: string;
  className?: string;
}

const BackButton = ({
  to,
  color = "#A9A9A9",
  className = "",
}: BackButtonProps) => {
  const nav = useNavigate();
  const handleClick = () => {
    if (to) {
      nav(to);
    } else {
      nav(-1); // 이전 페이지로 이동
    }
  };

  return (
    <div
      className={`text-[3rem] w-[3.6rem] cursor-pointer`}
      style={{ color }} // 동적으로 색상 적용
      onClick={handleClick}
    >
      <FiChevronLeft className={className} />
    </div>
  );
};

export default BackButton;
