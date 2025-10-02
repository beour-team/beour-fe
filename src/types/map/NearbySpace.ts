// 마커 리스트용
export interface NearbySpace {
  spaceId: number;
  name: string;
  thumbnailUrl: string;
  address: string;
  maxCapacity: number;
  latitude: number;
  longitude: number;
  avgRating: number;
  pricePerHour: number;
  liked: boolean;
  tags: string[];
}

// 하단 카드 정보용
export interface SimpleSpaceInfo {
  spaceName: string;
  address: string;
  price: number;
  tags: string[];
  thumbnailUrl: string;
}
