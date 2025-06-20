import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { bluePlace } from "../../assets/theme";

const SpaceLocation = ({ address }: { address: string }) => {
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
          setPosition({ lat: parseFloat(y), lng: parseFloat(x) });
          //setPostion 저장, x:경도, y:위도
        }
      });
    });
    //주소 -> 좌표 변환
  }, [address]);

  return (
    <div className="w-full h-[18.9rem] rounded-[1rem] overflow-hidden">
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
              src: bluePlace,
              size: { width: 48, height: 48 },
              options: {
                offset: {
                  x: 25, //중심점을 이미지 중 어디로 맞출지
                  y: 45,
                },
              },
            }}
          />
        </Map>
      )}
    </div>
  );
};
export default SpaceLocation;
