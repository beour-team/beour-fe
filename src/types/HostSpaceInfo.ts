export interface HostSpaceInfo {
  name: string;
  spaceCategory: "MEETING_ROOM" | "STUDY_ROOM" | "CAFE" | "RESTAURANT" | "COOKING" | "LEATHER" | "COSTUME" | "ART";
  useCategory: "MEETING" | "COOKING" | "BARISTA" | "FLEA_MARKET" | "FILMING" | "ETC" | "STUDY";
  maxCapacity: number;

  address: string;
  detailAddress: string;
  pricePerHour: number;
  thumbnailUrl: string;

  description: string;
  priceGuide: string;
  facilityNotice: string;
  notice: string;
  locationDescription: string;
  refundPolicy: string;
  // websiteUrl: string;

  tags: string[];
  imageUrls: string[];
}
