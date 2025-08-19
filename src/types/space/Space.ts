export type SpaceCategory =
  | "CAFE"
  | "RESTAURANT"
  | "COOKING"
  | "LEATHER"
  | "COSTUME"
  | "ART"
  | "ETC";

export type UseCategory =
  | "MEETING"
  | "COOKING"
  | "BARISTA"
  | "FLEA_MARKET"
  | "FILMING"
  | "ETC";

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
  tags: string[];
  availableTimes: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  imageUrls: string[];
  // location: string; //이거 필요
}
