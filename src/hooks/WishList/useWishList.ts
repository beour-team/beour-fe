import { useQuery } from "@tanstack/react-query";
import { getWishList } from "../../api/WishList/WishList";
import type { WishSpaceResponse } from "../../types/WishSpace";

export const useWishList = (page: number = 0) => {
  return useQuery<WishSpaceResponse, Error>({
    queryKey: ["wishList", page],
    queryFn: () => getWishList(page),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 실패시 1번만 재시도
  });
};
