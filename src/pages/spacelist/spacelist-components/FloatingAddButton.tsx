import React from "react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = () => (
  <button className="fixed bottom-[2.5rem] right-[2.5rem] z-20 bg-black text-white rounded-full px-7 py-4 text-17-SemiBold shadow-lg flex items-center gap-2">
    <span className="text-2xl">＋</span> 공간 추가
  </button>
);

export default FloatingAddButton;
