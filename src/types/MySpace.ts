export interface MySpace {
  spaceId: number;
  spaceName: string;
  address: string;
  maxCapacity: number;
  avgRating: number;
  reviewCount: number;
  thumbnailUrl: string;
}

export type MySpaceList = MySpace[];
