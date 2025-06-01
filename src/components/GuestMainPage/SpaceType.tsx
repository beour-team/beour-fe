import { useState } from "react";
import CategoryToggle from "./CategoryToggle";
import SpaceCategory from "./SpaceCategory";
import UseCategory from "./UseCategory";

const SpaceType = () => {
  const [isToggled, setIsToggled] = useState(false); //false 공간유형별, true 용도별
  return (
    <div className="mb-[1.3rem]">
      <div className="text-[2rem] font-semibold py-[1.7vh] my-[1vh]">
        공간 둘러보기
      </div>
      <div className="py-[1.2rem] px-[1rem] bg-[#E9EBEE] rounded-[1rem] h-auto">
        <div className="flex justify-center">
          <CategoryToggle isToggled={isToggled} setIsToggled={setIsToggled} />
        </div>
        <div className="px-[1rem] py-[1rem]">
          {isToggled ? <UseCategory /> : <SpaceCategory />}
        </div>
      </div>
    </div>
  );
  //space_category -> 공간유형별
  //use_catergory -> 용도별
};
export default SpaceType;
