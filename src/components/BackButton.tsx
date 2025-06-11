//뒤로가기 버튼
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
}

const BackButton = ({ to = "/" }: BackButtonProps) => {
  const nav = useNavigate();

  return (
    <div
      className="text-[#A9A9A9] text-[3rem] w-[3.6rem] cursor-pointer "
      onClick={() => nav(to)}
    >
      <FiChevronLeft />
    </div>
  );
};

export default BackButton;
