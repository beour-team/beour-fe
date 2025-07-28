import { useQuery } from "@tanstack/react-query";
import { getWishList } from "../../api/WishList/WishList";
import type { WishSpaceItem } from "../../types/WishSpace";

export const useWishList = () => {
  return useQuery<WishSpaceItem[], Error>({
    queryKey: ["wishList"],
    queryFn: getWishList,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });
};
