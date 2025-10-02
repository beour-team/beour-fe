import { useQuery } from "@tanstack/react-query";
import { fetchCurrentReservations } from "../../api/guest-reservation/reservations";

export const useCurrentReservations = (page: number) => {
  return useQuery({
    queryKey: ["currentReservations", page],
    queryFn: () => fetchCurrentReservations(page),
    staleTime: 1000 * 60,
    retry: 1,
  });
};
