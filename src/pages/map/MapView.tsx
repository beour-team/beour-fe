import { useEffect, useState, useRef } from "react";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import Searchbar from "../../components/Searchbar";
import SearchResultCard from "../../pages/guest-main/result-guest/SearchResultCard";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { SearchResultItem } from "../../constants/dummy-data/searh-data";
import { AnimatePresence, motion } from "framer-motion"; //yarn add framer-motion 설치해주세요
import type { PanInfo } from "framer-motion";
import { SearchData } from "../../constants/dummy-data/searh-data";
import { searchSpaces } from "../../utils/search-spaces";

const MapView = () => {
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // 지도 중심 상태 관리

  const mapRef = useRef<kakao.maps.Map | null>(null); //지도 인스턴스 접근용
  const [filteredSpaces, setFilteredSpaces] = useState<SearchResultItem[]>(
    SearchData["삼성역"]
  );
  const [selectedSpace, setSelectedSpace] = useState<SearchResultItem | null>(
    null
  );

  // 내 위치 가져오기 (현재 위치 기반)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const current = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMyLocation(current);
          setMapCenter(current); // 초기 중심 설정
        },
        () => {
          alert("위치 정보를 가져올 수 없습니다.");
        }
      );
    } else {
      alert("GPS를 지원하지 않는 브라우저입니다.");
    }
  }, []);

  // 검색 기능 처리 함수
  const handleSearch = (keyword: string) => {
    searchSpaces(keyword, (center, results) => {
      setMapCenter(center); // 지도 중심 이동
      setFilteredSpaces(results);
    });
  };

  return (
    <div className="w-full h-[100rem] relative">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-[80%] max-w-xl">
        <Searchbar onSearch={handleSearch} bgcolor="white" />
      </div>
      {myLocation ? (
        <Map
          center={mapCenter || { lat: myLocation.lat, lng: myLocation.lng }}
          style={{ width: "100%", height: "100%" }}
          level={5}
          ref={mapRef}
          draggable={true}
        >
          {/* 내 위치 표시 */}
          <CustomOverlayMap position={myLocation}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#0669FD",
                border: "2px solid white",
                boxShadow: "0 0 4px rgba(0,0,0,0.5)",
              }}
            />
          </CustomOverlayMap>

          {/* 공간리스트 표시 */}
          {filteredSpaces.map((space) => (
            <CustomOverlayMap
              key={space.id}
              position={{ lat: space.lat, lng: space.lng }}
              yAnchor={1} //마커 하단이 기준점이 되도록
            >
              <div
                onClick={() => setSelectedSpace(space)}
                style={{
                  color: selectedSpace?.id === space.id ? "#000000" : "#6B96F9",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  transformOrigin: "bottom center",
                  transform:
                    selectedSpace?.id === space.id ? "scale(1.25)" : "scale(1)",
                }}
              >
                <FaMapMarkerAlt size={27} />
              </div>
            </CustomOverlayMap>
          ))}

          {/* 공간리스트 하단바 */}
          <AnimatePresence>
            {selectedSpace && (
              <motion.div
                className="fixed bottom-0 bg-white rounded-t-2xl shadow-xl p-[3rem] h-[32rem] w-[43rem]  -translate-x-1/2 overflow-y-auto z-50"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(
                  _: MouseEvent | TouchEvent | PointerEvent,
                  info: PanInfo
                ) => {
                  if (info.offset.y > 100) {
                    setSelectedSpace(null); // 드래그로 충분히 내리면 패널 닫기
                  }
                }}
              >
                <SearchResultCard item={selectedSpace} />
              </motion.div>
            )}
          </AnimatePresence>
        </Map>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          위치 정보를 불러오는 중입니다...
        </div>
      )}
    </div>
  );
};

export default MapView;
