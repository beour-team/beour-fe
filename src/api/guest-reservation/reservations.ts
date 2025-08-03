import {
  API_RESERVATION_CURRENT,
  API_RESERVATION_PAST,
} from "../../constants/endpoint/endpoint";
import type {
  CurrentReservation,
  PastReservation,
} from "../../types/guest-reservation/reservations";
import { api } from "../../api/api";

export const fetchCurrentReservations = async (
  page: number
): Promise<CurrentReservation> => {
  const response = await api.get(API_RESERVATION_CURRENT, {
    params: { page },
  });
  return response.data.data;
};

export const getPastReservations = async (
  page: number
): Promise<PastReservation> => {
  const response = await api.get(API_RESERVATION_PAST, {
    params: { page },
  });
  return response.data.data;
};

//삭제 목록 보는게 아닌 예약 취소하기 버튼 누를 때 작성하는 것
export const deleteReservation = async (reservationId: number) => {
  return api.delete(`/reservations/${reservationId}`);
};
