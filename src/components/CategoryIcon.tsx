type CategoryIconProps = {
  imgSrc: string;
  label: string;
};

const CategoryIcon = ({ imgSrc, label }: CategoryIconProps) => {
  return (
    <div className="cursor-pointer my-[2rem] mx-[1rem]">
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
