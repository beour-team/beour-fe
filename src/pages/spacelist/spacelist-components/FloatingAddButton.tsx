import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";
import { plus } from "../../../assets/theme";

interface FloatingAddButtonProps {
  onClick?: () => void;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(PATHS.HOST.SPACE_REGISTER);
    }
  };

  return (
    <button
      className="absolute bottom-[2.5rem] right-[2rem] z-50 bg-black text-white rounded-full px-[1.6rem] py-[1.4rem] text-14-SemiBold shadow-lg flex items-center gap-[0.8rem]"
      onClick={handleClick}
    >
      <img src={plus} alt="plus" />
      공간 추가
    </button>
  );
};

export default FloatingAddButton;
