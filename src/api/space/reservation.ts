import { api } from "../api";
import type {
  CreateReservationRequest,
  CreateReservationResponse,
} from "../../types/space/reservation";

export const createReservation = async (
  spaceId: number,
  payload: CreateReservationRequest
): Promise<CreateReservationResponse> => {
  const response = await api.post(
    `/api/spaces/${spaceId}/reservations`,
    payload
  );
  return response.data.data;
};
