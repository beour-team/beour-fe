export interface HostSpaceInfo {
  name: string;
  spaceCategory: string;
  useCategory: string;
  maxCapacity: number;

  address: string;
  detailAddress?: string;
  pricePerHour: number;
  thumbnailUrl: string;

  description: string;
  priceGuide?: string;
  facilityNotice?: string;
  notice: string;
  locationDescription?: string;
  refundPolicy: string;
  // websiteUrl: string;

  tags?: string[];
  imageUrls: string[];
}
