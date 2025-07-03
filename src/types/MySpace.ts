export interface MySpace {
  id: number;
  name: string;
  category: string;
  use: string;
  status: string;
  price_per_hour: number;
  thumbnail_url: string;
}

export type MySpaceList = MySpace[];
