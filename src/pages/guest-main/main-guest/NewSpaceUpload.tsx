import { useNavigate } from "react-router-dom";
import { bluePlace } from "../../../assets/theme";
import type { NewSpace } from "../../../types/guest-main/NewSpaceType";
import { PATHS } from "../../../routes/paths";

type NewSpaceUploadProps = {
  space: NewSpace;
};

const NewSpaceUpload = ({ space }: NewSpaceUploadProps) => {
  const nav = useNavigate();

  const goToDetail = () => {
    nav(`${PATHS.SPACE}/${space.spaceId}`);
  };

  return (
    <div
      key={space.spaceId}
      className="relative w-full min-w-0 aspect-[214/217] overflow-hidden rounded-[1.2rem]"
      onClick={goToDetail}
    >
      <img
        src={space.thumbnailUrl}
        alt={`새 공간 ${space.spaceId + 1}`}
        className="object-cover w-full h-full rounded-[1.2rem]"
      />

      <div className="absolute bottom-[1rem] left-[2rem] text-white">
        <div className="flex items-end gap-2">
          <img
            src={bluePlace}
            alt="파란색 장소마커"
            className="w-[2rem] h-[2rem]"
          />
          <span className="text-12-Medium text-cr-white">
            {space.addressAndName}
          </span>
        </div>
        <div className="text-16-SemiBold py-3 whitespace-pre-line leading-[1.6] text-cr-white">
          {space.description}
        </div>
      </div>
    </div>
  );
};

export default NewSpaceUpload;
