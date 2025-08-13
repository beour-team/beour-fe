import { useQuery } from "@tanstack/react-query";
import { getSpaceDetail } from "../../api/space/spaceDetail";
import type { Space } from "../../types/Space";

export const useSpaceDetail = (spaceId: string) => {
  return useQuery<Space, Error>({
    queryKey: ["spaceDetail", spaceId],
    queryFn: () => getSpaceDetail(spaceId),
    enabled: !!spaceId,
  });
};
