// 찜 공간 아이템 인터페이스
export interface WishSpaceItem {
  spaceId: number;
  spaceName: string;
  region: string;
  maxCapacity: number;
  price: number;
  thumbnailUrl: string;
  like: boolean;
  average: number;
  reviewCount: number;
  tags: string[];
}

// 페이징 응답 인터페이스 추가
export interface WishSpaceResponse {
  spaces: WishSpaceItem[];
  totalPage: number;
  last: boolean;
}
