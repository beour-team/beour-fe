export type SpaceCategory =
  | "카페"
  | "식당"
  | "쿠킹 공방"
  | "가죽 공방"
  | "의상 공방"
  | "아트 공방"
  | "기타"
  | "MEETING_ROOM"; // API 응답에 맞게 추가

export type UseCategory =
  | "단체 모임"
  | "요리 연습"
  | "바리스타 실습"
  | "플리마켓"
  | "촬영"
  | "기타"
  | "STUDY"; // API 응답에 맞게 추가

export interface Space {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  pricePerHour: number;
  maxCapacity: number;
  spaceCategory: SpaceCategory;
  useCategory: UseCategory;
  avgRating: number;
  description: string;
  priceGuide: string;
  facilityNotice: string;
  notice: string;
  locationDescription: string;
  refundPolicy: string;
  websiteUrl?: string; // API 응답에 맞게 추가
  thumbnailUrl?: string; // 썸네일 이미지 URL
  tags: string[];
  availableTimes: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  imageUrls: string[];
  // location: string; //이거 필요
}
