// 변환: SimpleSpaceInfo → SearchResultItems (map에 카드 컴포넌트 공유를 위함)
import type { SimpleSpaceInfo } from "../types/map/NearbySpace";
import type { SearchResultItems } from "../types/guest-main/SearchResultItems";

export const transformSimple = (
  info: SimpleSpaceInfo,
  spaceId: number
): SearchResultItems => ({
  spaceId,
  spaceName: info.spaceName,
  thumbnailUrl: info.thumbnailUrl,
  price: info.price,
  address: info.address,
  maxCapacity: 0,
  average: 0,
  reviewCount: 0,
  tags: info.tags,
  likes: false,
});
