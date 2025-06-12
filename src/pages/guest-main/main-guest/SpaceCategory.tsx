import CategoryIcon from "./CategoryIcon";
import { SpaceCategoryData } from "../../../constants/guest-main/space-category-data";

const SpaceCategory = () => {
  return (
    <div className="flex flex-wrap justify-start gap-6">
      {SpaceCategoryData.map((item) => (
        <div key={item.label}>
          <CategoryIcon imgSrc={item.imgSrc} label={item.label} />
        </div>
      ))}
    </div>
  );
};
export default SpaceCategory;
