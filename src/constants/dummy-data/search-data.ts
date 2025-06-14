import { newspace, space2, space3, space4, space5 } from "../../assets/theme";

export type SearchResultItem = {
  id: number;
  name: string;
  thumbnail_url: string;
  address: string;
  max_capacity: number;
  avg_rating: number;
  category: string;
  use: string;
  price_per_hour: number;
  lat: number;
  lng: number;
  tags: string[];
};

export const SearchData: Record<string, SearchResultItem[]> = {
  삼성역: [
    {
      name: "스윗 라운지 공유 주방 삼성타운점",
      category: "파티룸",
      use: "모임",
      address: "삼성동",
      thumbnail_url: space2,
      price_per_hour: 99000,
      avg_rating: 4.5,
      max_capacity: 3,
      id: 1000,
      lat: 37.508844,
      lng: 127.06316,
      tags: ["파티", "바베큐", "루프탑", "공유주방"],
    },
    {
      name: "Morning Coffee 삼성역점",
      category: "파티룸",
      use: "모임",
      address: "홍대동",
      thumbnail_url: space3,
      price_per_hour: 12000,
      avg_rating: 3.2,
      max_capacity: 10,
      id: 1001,
      lat: 37.557434302,
      lng: 126.926960224,
      tags: ["카페", "단체모임", "루프탑", "공유주방"],
    },
    {
      name: "올라 타코 삼성역점",
      category: "파티룸",
      use: "모임",
      address: "잠실동",
      thumbnail_url: space5,
      price_per_hour: 24000,
      avg_rating: 4.5,
      max_capacity: 20,
      id: 1002,
      lat: 37.513664,
      lng: 127.101701,
      tags: ["카페", "단체모임", "루프탑", "공유주방"],
    },
    {
      name: "Ink 삼성역점",
      category: "파티룸",
      use: "모임",
      address: "삼성동",
      thumbnail_url: space4,
      price_per_hour: 59000,
      avg_rating: 4.8,
      max_capacity: 6,
      id: 1003,
      lat: 37.498095,
      lng: 127.02761,
      tags: ["카페", "단체모임", "루프탑", "공유주방"],
    },
    {
      name: "스터디룸 강남역점",
      category: "파티룸",
      use: "모임",
      address: "강남동",
      thumbnail_url: newspace,
      price_per_hour: 59000,
      avg_rating: 5,
      max_capacity: 5,
      id: 1004,
      lat: 37.498095,
      lng: 127.02761,
      tags: ["소모임", "스터디", "와이파이"],
    },
  ],
};
