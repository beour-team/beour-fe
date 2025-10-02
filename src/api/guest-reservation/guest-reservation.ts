import axios from "axios";
import type { guestReservationDetail } from "../../types/guest-reservation/guestReservationDetail";
import {
  BASE_URL,
  API_GUEST_RESERVATION_DETAIL,
} from "../../constants/endpoint/endpoint";

export const getReservationDetail = async (
  reservationId: number
): Promise<guestReservationDetail> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("토큰이 없습니다.");

  const res = await axios.get<{ data: guestReservationDetail }>(
    BASE_URL + API_GUEST_RESERVATION_DETAIL + `/${reservationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};
