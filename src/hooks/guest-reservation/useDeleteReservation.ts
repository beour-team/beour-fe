// 예약 취소하기 (목록 X)
import { useMutation } from "@tanstack/react-query";
import { deleteReservation } from "../../api/guest-reservation/reservations";

export const useDeleteReservation = () => {
  return useMutation({
    mutationFn: (reservationId: number) => deleteReservation(reservationId),
  });
};
