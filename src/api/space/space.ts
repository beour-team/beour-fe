import axios from "axios";
import { api } from "../api";
import type {
  SpaceAvailableTimesResponse,
  UpdateAvailableTimesRequest,
  UpdateAvailableTimesResponse,
} from "../../types/SpaceSchedule";

export const registerSpace = async (spaceData: unknown) => {
  const response = await axios.post("/api/spaces", spaceData);
  return response.data;
};

export const getSpaceAvailableTimes = async (
  spaceId: number
): Promise<SpaceAvailableTimesResponse> => {
  try {
    const response = await api.get(
      `/api/host/available-times/space/${spaceId}`
    );
    return response.data;
  } catch (error) {
    console.error("공간 대여 가능 시간 조회 실패:", error);
    throw error;
  }
};

export const updateSpaceAvailableTimes = async (
  spaceId: number,
  availableTimes: UpdateAvailableTimesRequest
): Promise<UpdateAvailableTimesResponse> => {
  try {
    console.log("📝 [API] 공간 스케줄 업데이트 요청:", {
      spaceId,
      availableTimes,
      timestamp: new Date().toLocaleString(),
    });

    const response = await api.patch(
      `/api/host/available-times/space/${spaceId}`,
      availableTimes
    );

    console.log("📝 [API] 공간 스케줄 업데이트 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("📝 [API] 공간 스케줄 업데이트 실패:", error);
    throw error;
  }
};
