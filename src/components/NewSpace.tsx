import NewSpaceUpload from "./NewSpaceUpload";
import { NewSpacesData } from "../constants/NewSpacesData";
const NewSpace = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-[1vh]">
        <div className="text-[2.3rem] font-semibold py-[1.5vh]">
          내 주변 새 공간
        </div>
        <div className="text-[1.4rem] font-regular text-[#888888] pr-2 cursor-pointer">
          {`더보기 >`}
        </div>
      </div>
      <div className="overflow-x-auto flex gap-6 scrollbar-hide cursor-pointer">
        {NewSpacesData.map((space, index) => (
          <NewSpaceUpload key={index} space={space} index={index} />
        ))}
      </div>
    </div>
  );
};
export default NewSpace;
