import { IoRefreshOutline } from "react-icons/io5";

interface FilterFooterProps {
  onReset: () => void;
  onApply: () => void;
}

const FilterFooter = ({ onReset, onApply }: FilterFooterProps) => {
  return (
    <div className="flex items-center justify-around gap-[1rem] my-[1rem]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onReset}>
        <IoRefreshOutline size={18} className="text-[#3D3D3D]" />
        <div className="text-[1.3rem] text-[#3D3D3D]">재설정</div>
      </div>
      <button
        className="bg-black text-white text-[1.3rem] px-[8rem] py-[1.5rem] rounded-[1rem]"
        onClick={onApply}
      >
        적용하기
      </button>
    </div>
  );
};

export default FilterFooter;
