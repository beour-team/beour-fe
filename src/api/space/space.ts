import type {
  SpaceAvailableTimesResponse,
  UpdateAvailableTimesRequest,
  UpdateAvailableTimesResponse,
} from "../../types/SpaceSchedule";
import { api } from "../api";
import { API_SPACES } from "../../constants/endpoint/endpoint";
import type { HostSpaceInfo } from "../../types/HostSpaceInfo";

export const registerSpace = async (
  spaceInfo: HostSpaceInfo,
  accessToken: string
) => {
  try {
    console.log("registerSpace() 요청 데이터:", spaceInfo);
    console.log("보내는 토큰:", accessToken);

    const response = await api.post(API_SPACES, spaceInfo);

    console.log("서버 응답 데이터:", response.data); // 응답 확인

    return response.data;
  } catch (error: unknown) {
    console.error("registerSpace() 에러:", error); // 실제 에러 로그 출력
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("공간 등록 중 에러 발생");
    }
  }
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
