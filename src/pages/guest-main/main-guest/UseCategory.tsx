import CategoryIcon from "./CategoryIcon";
import { UseCategoryData } from "../../../constants/guest-main/use-category-data";

const UseCategory = () => {
  return (
    <div className="flex flex-wrap justify-start gap-6">
      {UseCategoryData.map((item) => (
        <div key={item.label}>
          <CategoryIcon
            imgSrc={item.imgSrc}
            label={item.label}
            categoryType="usecategory"
            useCategoryCode={item.code}
          />
        </div>
      ))}
    </div>
  );
};
export default UseCategory;
