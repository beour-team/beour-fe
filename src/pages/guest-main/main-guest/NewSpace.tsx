import { NewSpacesData } from "../../../constants/dummy-data/newspaces-data";
import NewSpaceSlider from "./NewSpaceSlider";

const NewSpace = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-[1rem]">
        <div className="text-18-SemiBold py-[1.4rem]">내 주변 새 공간</div>
      </div>
      <div className="overflow-x-hidden cursor-pointer">
        <NewSpaceSlider spaces={NewSpacesData} />
      </div>
    </div>
  );
};
export default NewSpace;
