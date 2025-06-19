import { space3, space6 } from "../../assets/theme";
import type { Space } from "../../types/Space";

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
  facilityNotice: "제빵용 오븐이 구비 되어있습니다.",
  notice: "계약 된 시간을 꼭 준수하여 주시기 바랍니다.",
  locationDescription: "강남역 도보 3분",
  refundPolicy: "천재 지변 등 불가항력적 사유로 인한 취소 시 : 100% 환불",
  websiteUrl: "https://example.com",
  tags: ["소모임", "스터디", "와이파이"],
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
  location: "삼성동",
};
