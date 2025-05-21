import mockimg from "../assets/newspace1.png";

export type SearchResultItem = {
  name: string;
  category: string;
  use: string;
  address: string;
  thumbnail_url: string;
  price_per_hour: number;

  rating: number;
  guest_count: number; //다른 api 참조함

  // description: string;
  // reservation_notice: string;
  // location_description: string;
  // website_url: string;
};

export const SearchData: Record<string, SearchResultItem[]> = {
  삼성역: [
    {
      name: "게임 파티룸 플레이앤 삼성역점",
      category: "파티룸",
      use: "모임",
      address: "삼성동",
      thumbnail_url: mockimg,
      price_per_hour: 99000,

      rating: 4.3,
      guest_count: 3,

      // description: "보드게임과 콘솔게임이 있는 파티룸",
      // reservation_notice: "예약은 최소 하루 전까지 가능합니다.",
      // location_description: "2호선 삼성역 도보 5분 거리",
      // website_url: "https://example.com",
    },
  ],
};
