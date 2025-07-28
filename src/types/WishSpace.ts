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
