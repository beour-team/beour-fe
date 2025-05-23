//스페이스클라우드에는 용도별이 이 형태로 되어있지 않아서
// 임의로 space_category로만 이동하게 구현
import { useNavigate } from "react-router-dom";

type CategoryIconProps = {
  imgSrc: string;
  label: string;
};

const CategoryIcon = ({ imgSrc, label }: CategoryIconProps) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/spaces?space_category=${encodeURIComponent(label)}`);
  };

  return (
    <div className="cursor-pointer my-[2rem] mx-[1rem]" onClick={handleClick}>
      <div className="flex items-center justify-center w-[5.5rem] h-[5.5rem] rounded-full bg-[#C5C8CD] mt-[1rem]">
        <img
          src={imgSrc}
          alt={label}
          className="w-[70%] h-[70%] object-contain"
        />
      </div>
      <span className="flex items-center justify-center text-[1.4rem] font-medium pt-[1rem] mb-[1rem]">
        {label}
      </span>
    </div>
  );
};
export default CategoryIcon;
