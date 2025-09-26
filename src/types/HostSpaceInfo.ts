export interface HostSpaceInfo {
  name: string;
  spaceCategory: string;
  useCategory: string;
  maxCapacity: number;

  address: string;
  detailAddress?: string;
  pricePerHour: number;
  thumbnailUrl: File;

  description: string;
  priceGuide?: string;
  facilityNotice?: string;
  notice: string;
  locationDescription?: string;
  refundPolicy: string;
  websiteUrl?: string;

  tags?: string[];
  imageUrls: File[]; // 이미지 파일 배열
}
