import { useQuery } from "@tanstack/react-query";
import { getReservationDetail } from "../../api/guest-reservation/guest-reservation";
import type { guestReservationDetail } from "../../types/guest-reservation/guestReservationDetail";

export const useReservationDetail = (reservationId: number) => {
  return useQuery<guestReservationDetail, Error>({
    queryKey: ["reservationDetail", reservationId],
    queryFn: () => getReservationDetail(reservationId),
    enabled: !!reservationId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
