import { useQuery } from "@tanstack/react-query";
import { getCanceledReservations } from "../../api/guest-reservation/reservations";

export const useCanceledReservations = (page: number) => {
  return useQuery({
    queryKey: ["canceledReservations", page],
    queryFn: () => getCanceledReservations(page),
    staleTime: 1000 * 60,
    retry: 1,
  });
};
