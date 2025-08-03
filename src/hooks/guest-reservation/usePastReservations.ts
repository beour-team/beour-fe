import { useQuery } from "@tanstack/react-query";
import { getPastReservations } from "../../api/guest-reservation/reservations";

export const usePastReservations = (page: number) => {
  return useQuery({
    queryKey: ["pastReservations", page],
    queryFn: () => getPastReservations(page),
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
