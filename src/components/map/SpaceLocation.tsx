import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { blackPlace, bubble } from "../../assets/theme";

interface SpaceLocationProps {
  address: string;
  className?: string;
  //위도, 경도 전달
  onCoordinatesChange?: (coords: { lat: number; lng: number }) => void;
  overlayText?: string; //커스텀 오버레이(말풍선)
}

const SpaceLocation = ({
  address,
  className,
  onCoordinatesChange,
  overlayText,
}: SpaceLocationProps) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    //api 스크립트 먼저 로드해야함
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      // Geocoder 인스턴스 생성해서 주소 검색
      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x } = result[0]; //성공하면 좌표 꺼내서
          const coords = { lat: parseFloat(y), lng: parseFloat(x) }; //주소 변환 x:경도, y:위도
          setPosition(coords);
          //setPostion 저장
          onCoordinatesChange?.(coords); //콜백으로 부모에게 전달
        }
      });
    });
    //주소 -> 좌표 변환
  }, [address, onCoordinatesChange]);

  return (
    <div className={className}>
      {/* 위치 있을때만 맵 렌더링 */}
      {position && (
        <Map
          center={position}
          style={{ width: "100%", height: "100%" }}
          level={1}
        >
          <MapMarker
            position={position}
            image={{
              src: blackPlace,
              size: { width: 48, height: 48 },
              options: {
                offset: {
                  x: 25, //중심점을 이미지 중 어디로 맞출지
                  y: 45,
                },
              },
            }}
          />
          {overlayText && (
            <CustomOverlayMap position={position}>
              <div className="relative w-[7rem] -translate-y-[5rem] flex justify-center items-center">
                <img
                  src={bubble}
                  alt="말풍선"
                  className="absolute bottom-1 w-full"
                />
                <div className="relative bottom-[1.7rem] text-14-Medium text-cr-white z-10 text-center">
                  {overlayText}
                </div>
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      )}
    </div>
  );
};
export default SpaceLocation;
