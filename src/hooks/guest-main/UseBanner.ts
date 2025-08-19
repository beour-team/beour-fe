//게스트 메인화면 - 배너 부분
import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../api/guest-main/banner";

// fetchBanner()를 통해 데이터 가져오고, 로딩/에러/성공 상태 자동 관리해줌.
export const useBanner = () => {
  return useQuery({
    queryKey: ["banner"], // 캐시 구분 기준으로 같은 키 요청시 캐시에서 불러옴(성능 굿)
    queryFn: fetchBanners, // 실제 데이터 가져오는 함수
    retry: 1,
  });
};
