import { useNavigate } from "react-router-dom";
import { bluePlace } from "../../../assets/theme";

type NewSpace = {
  thumbnail_url: string;
  location: string;
  name: string;
  description: string;
};

type NewSpaceUploadProps = {
  space: NewSpace;
  spaceId: number;
};

const NewSpaceUpload = ({ space, spaceId }: NewSpaceUploadProps) => {
  const nav = useNavigate();

  const goToDetail = () => {
    nav(`/space/${spaceId}`);
  };

  return (
    <div
      key={spaceId}
      className="relative w-full min-w-0 aspect-[214/217] overflow-hidden rounded-[1.2rem]"
      onClick={goToDetail}
    >
      <img
        src={space.thumbnail_url}
        alt={`새 공간 ${spaceId + 1}`}
        className="object-cover w-full h-full rounded-[1.2rem]"
      />

      <div className="absolute bottom-[1rem] left-[2rem] text-white">
        <div className="flex items-end gap-2">
          <img
            src={bluePlace}
            alt="파란색 장소마커"
            className="w-[2rem] h-[2rem]"
          />
          <span className="text-12-Medium">
            {space.location} / {space.name}
          </span>
        </div>
        <div className="text-16-SemiBold py-3 whitespace-pre-line leading-[1.6]">
          {space.description}
        </div>
      </div>
    </div>
  );
};

export default NewSpaceUpload;
