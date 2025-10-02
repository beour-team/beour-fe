import { api } from "../api";
import type { AvailableTimesResponse } from "../../types/space/reserveSpace";

export const getAvailableTimes = async (spaceId: number, date: string) => {
  const response = await api.get<AvailableTimesResponse>(
    `/api/spaces/${spaceId}/available-times/date?date=${date}`
  );
  return response.data.data.timeList;
};
