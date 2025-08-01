export interface MySpace {
  spaceId: number;
  spaceName: string;
  address: string;
  maxCapacity: number;
  avgRating: number;
  reviewCount: number;
  thumbnailUrl: string;
}

// API 응답 구조에 맞는 타입 추가
export interface MySpaceListResponse {
  spaces: MySpace[];
  last: boolean;
  totalPage: number;
}

export type MySpaceList = MySpace[];
