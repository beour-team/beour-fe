import CategoryIcon from "./CategoryIcon";
import { SpaceCategoryData } from "../constants/SpaceCategoryData";

const SpaceCategory = () => {
  return (
    <div className="flex flex-wrap justify-around">
      {SpaceCategoryData.map((item) => (
        <div key={item.label} className="w-1/4 flex justify-center">
          <CategoryIcon imgSrc={item.imgSrc} label={item.label} />
        </div>
      ))}
    </div>
  );
};
export default SpaceCategory;
