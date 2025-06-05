import { NewSpacesData } from "../../constants/newspaces-data";
import NewSpaceSlider from "./NewSpaceSlider";

const NewSpace = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-[1rem]">
        <div className="text-[2rem] font-semibold py-[1.5rem]">
          내 주변 새 공간
        </div>
      </div>
      <div className="overflow-x-hidden">
        <NewSpaceSlider spaces={NewSpacesData} />
      </div>
    </div>
  );
};
export default NewSpace;
