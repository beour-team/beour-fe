import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../../api/space/reservation";
import type {
  CreateReservationRequest,
  CreateReservationResponse,
} from "../../types/space/reservation";

export const useCreateReservation = (spaceId: number) => {
  return useMutation<
    CreateReservationResponse,
    unknown,
    CreateReservationRequest
  >({
    mutationFn: (payload) => createReservation(spaceId, payload),
  });
};
