import { newspace } from "../assets/theme";

export type SearchResultItem = {
  spaceId: number;
  name: string;
  thumbnail_url: string;
  address: string;
  guest_count: number;
  rating: number;
  category: string;
  use: string;
  price_per_hour: number;
  lat: number;
  lng: number;
};

export const SearchData: Record<string, SearchResultItem[]> = {
  삼성역: [
    {
      name: "게임 파티룸 플레이앤 삼성역점",
      category: "파티룸",
      use: "모임",
      address: "삼성동",
      thumbnail_url: newspace,
      price_per_hour: 99000,
      rating: 4.3,
      guest_count: 3,
      spaceId: 1000,
      lat: 37.508844,
      lng: 127.06316,
    },
    {
      name: "게임 파티룸 플레이앤 홍대역점",
      category: "파티룸",
      use: "모임",
      address: "홍대동",
      thumbnail_url: newspace,
      price_per_hour: 89000,
      rating: 4.1,
      guest_count: 4,
      spaceId: 1001,
      lat: 37.557434302,
      lng: 126.926960224,
    },
    {
      name: "게임 파티룸 플레이앤 잠실역점",
      category: "파티룸",
      use: "모임",
      address: "잠실동",
      thumbnail_url: newspace,
      price_per_hour: 90000,
      rating: 4.5,
      guest_count: 2,
      spaceId: 1002,
      lat: 37.513664,
      lng: 127.101701,
    },
    {
      name: "게임 파티룸 플레이앤 강남역점",
      category: "파티룸",
      use: "모임",
      address: "강남동",
      thumbnail_url: newspace,
      price_per_hour: 59000,
      rating: 5,
      guest_count: 5,
      spaceId: 1003,
      lat: 37.498095,
      lng: 127.02761,
    },
  ],
};
