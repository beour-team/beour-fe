import NewSpaceUpload from "./NewSpaceUpload";
import { NewSpacesData } from "../../constants/newspaces-data";

const NewSpace = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-[1vh]">
        <div className="text-[2rem] font-semibold py-[1.5vh]">
          내 주변 새 공간
        </div>
      </div>
      <div className="overflow-x-auto flex gap-6 scrollbar-hide cursor-pointer">
        {NewSpacesData.map((space, spaceId) => (
          <NewSpaceUpload key={spaceId} space={space} spaceId={spaceId} />
        ))}
      </div>
    </div>
  );
};
export default NewSpace;
