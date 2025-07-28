import toast from "react-hot-toast";
import { area } from "../../assets/theme";
import PageHeader from "../../components/header/PageHeader";
import SpaceLocation from "../../components/map/SpaceLocation";
import { useState } from "react";
import { dummySpace } from "../../constants/dummy-data/spaces";

// 예약 - 지도보기
const SpaceMapPage = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  return (
    <div>
      <div className="mx-[1.5rem]">
        <PageHeader children="위치 정보" />
      </div>

      <SpaceLocation
        address={dummySpace.address}
        className="w-full h-[83rem]"
        onCoordinatesChange={(coords) => setCoords(coords)}
        overlayText="매장 위치"
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] px-[2rem] pt-[2rem] pb-[2rem] shadow-lg max-w-[41.5rem] min-w-[32rem] mx-auto z-50">
        <div className="text-16-SemiBold">{dummySpace.name}</div>
        <div className="flex items-center justify-between my-[1rem]">
          <div className="flex items-center gap-3">
            <img src={area} alt="위치" className="w-[1.3rem]" />
            <p className="text-13-Medium text-cr-700">{dummySpace.address}</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(dummySpace.address);
              toast.success("주소가 복사되었어요", {
                style: {
                  background: "#2A2C32",
                  color: "#FFFFFF",
                  width: "40rem",
                  height: "4rem",
                  fontSize: "1.4rem",
                  marginBottom: "15rem",
                },
                duration: 1000,
              });
            }}
            className="text-cr-200 bg-cr-500 w-[4.4rem] h-[2.4rem] rounded-[1rem] text-14-Medium"
          >
            복사
          </button>
        </div>
        <button
          onClick={() => {
            if (!coords) return;
            const url = `https://map.kakao.com/link/to/${dummySpace.name},${coords.lat},${coords.lng}`;
            window.open(url, "_blank");
          }}
          className="bg-cr-blue text-cr-white text-16-Medium w-full h-[5rem] rounded-[1rem] mt-[1rem]"
        >
          지도 앱으로 길찾기
        </button>
      </div>
    </div>
  );
};
export default SpaceMapPage;
