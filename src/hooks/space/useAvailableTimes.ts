// src/hooks/space/useAvailableTimes.ts
import { useQuery } from "@tanstack/react-query";
import { getAvailableTimes } from "../../api/space/reserve-space";

export const useAvailableTimes = (spaceId?: number, date?: string) => {
  return useQuery({
    queryKey: ["availableTimes", spaceId, date],
    queryFn: () => {
      if (!spaceId || !date) return [];
      return getAvailableTimes(spaceId, date);
    },
    enabled: !!spaceId && !!date,
  });
};
