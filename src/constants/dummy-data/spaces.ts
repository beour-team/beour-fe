import { space3, space6 } from "../../assets/theme";
import type { Space } from "../../types/space/Space";

export const dummySpace: Space = {
  id: 2001,
  name: "게임 파티룸 플레이앤 삼성역점",
  address: "서울특별시 마포구 마포대로 8",
  detailAddress: "2호선 강남역 4번 출구 도보 5분",
  pricePerHour: 99000,
  maxCapacity: 3,
  spaceCategory: "COOKING",
  useCategory: "COOKING",
  avgRating: 4.2,
  description:
    "커다란 스크린이 구비되어 있는 넓은 공간과, 위에는 비어퐁을 즐길 수 있는, 아래는 닌텐도와 추억을 올가을 즐길 수 있는 공간으로 나누어져있어요. \n 방문해주신 고객님께 차별화된 서비스를 제공할 수 있도록 항상 노력하겠습니다 :)",
  priceGuide: "최대 인원은 3명이며, 인원 추가 시 인당 20,000원 추가",
  facilityNotice:
    "- 제빵용 오븐이 구비 되어있습니다. \n - 쿠키 커터가 준비 되어있습니다. \n (모든 장비는 사용 후 정리 부탁드립니다)",
  notice:
    "- 계약 된 시간을 꼭 준수하여 주시기 바랍니다. \n - 삼각대, 조명, 철제박스, 감독 의자, 기타 장비로 인한 나무 바닥과 벽지 파손에 주의해주세요. \n - 설정된 스탭 인원이 지켜지지 않을 경우, 호스트가 촬영을 취소하거나 추가 결제를 요청할 수도 있습니다. \n - 공간에서 취식하는 경우 호스트에게 양해를 구해주시고, 음식물을 정리해주시길 바랍니다.",
  locationDescription: "강남역 도보 3분",
  refundPolicy:
    "- 천재 지변 등 불가항력적 사유로 인한 취소 시 : 100% 환불 \n - Be:our 및 호스트의 사유로 인한 취소 시 : 100% 환불 \n - 결제 후, 3시간 이내 취소 시, 100% 환불됩니다. \n(단, 이용시작 시간 12시간 이내에 취소 시에는 환불 불가) \n - 이용일 기준 7일전까지 취소 시 : 100% 환불",
  tags: ["파티", "바베큐", "루프탑", "단체 모임"],
  availableTimes: [
    {
      date: "2025-05-22",
      startTime: "10:00:00",
      endTime: "18:00:00",
    },
    {
      date: "2025-05-24",
      startTime: "11:00:00",
      endTime: "16:00:00",
    },
  ],
  imageUrls: [space6, space3],
  // location: "삼성동",
};
