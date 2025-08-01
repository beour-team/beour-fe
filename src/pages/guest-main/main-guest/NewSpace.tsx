// import { NewSpacesData } from "../../../constants/dummy-data/newspaces-data";
import { useNewSpaces } from "../../../hooks/guest-main/NewSpaces";
import NewSpaceSlider from "./NewSpaceSlider";

const NewSpace = () => {
  const { data, isLoading, error } = useNewSpaces();

  return (
    <div>
      <div className="flex justify-between items-center my-[1rem]">
        <div className="text-18-SemiBold py-[1.4rem]">내 주변 새 공간</div>
      </div>

      {isLoading && <div>로딩 중...</div>}
      {error && <div>에러 발생</div>}

      <div className="overflow-x-hidden cursor-pointer">
        {data && data.length > 0 ? (
          <NewSpaceSlider spaces={data} />
        ) : (
          !isLoading && !error && <div>아직 등록된 공간이 없어요</div>
        )}
      </div>
    </div>
  );
};
export default NewSpace;
