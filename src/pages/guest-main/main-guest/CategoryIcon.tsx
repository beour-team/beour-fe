//스페이스클라우드에는 용도별이 이 형태로 되어있지 않아서
// 임의로 space_category로만 이동하게 구현
import { useNavigate } from "react-router-dom";

type CategoryIconProps = {
  imgSrc: string;
  label: string;
  categoryType?: "spacecategory" | "usecategory";
};

const CategoryIcon = ({
  imgSrc,
  label,
  categoryType = "spacecategory",
}: CategoryIconProps) => {
  const nav = useNavigate();
  const handleClick = () => {
    const queryKey =
      categoryType === "usecategory" ? "usecategory" : "spacecategory";
    nav(`/space/search?${queryKey}=${encodeURIComponent(label)}`);
  };

  return (
    <div className="cursor-pointer my-[1rem] mx-[1rem]" onClick={handleClick}>
      <div className="flex items-center justify-center mt-[1rem] w-[5.3rem] h-[4.6rem] overflow-hidden">
        <img
          src={imgSrc}
          alt={label}
          className="max-w-[6rem] max-h-[4.6rem] object-contain"
        />
      </div>
      <span className="block text-center text-[1.2rem] font-medium pt-[1rem]">
        {label}
      </span>
    </div>
  );
};
export default CategoryIcon;
