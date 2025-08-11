import type {
  SpaceAvailableTimesResponse,
  UpdateAvailableTimesRequest,
  UpdateAvailableTimesResponse,
} from "../../types/SpaceSchedule";
import { api } from "../api";
import { API_SPACES } from "../../constants/endpoint/endpoint";
import type { AxiosError } from "axios";
// import type { HostSpaceInfo } from "../../types/HostSpaceInfo";

export interface RegisterSpaceResponse {
  code: number;
  httpStatus: string;
  data: string; // "공간이 등록되었습니다. ID: 123"
}

export const registerSpace = async (
  formData: FormData
): Promise<RegisterSpaceResponse> => {
  try {
    const response = await api.post<RegisterSpaceResponse>(
      API_SPACES,
      formData
      // headers 제거 - FormData 사용 시 브라우저가 자동으로 Content-Type 설정
      // 브라우저가 "multipart/form-data; boundary=..." 자동 생성
    );

    if (response.data.code === 200) {
      return response.data;
    } else {
      throw new Error("공간 등록에 실패했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error?.response?.status === 400) {
      throw new Error("필수 입력값이 누락되었거나 형식이 올바르지 않습니다.");
    }

    if (error?.response?.status === 401) {
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 403) {
      throw new Error("공간 등록 권한이 없습니다.");
    }

    if (error?.response?.status === 404) {
      throw new Error("요청한 리소스를 찾을 수 없습니다.");
    }

    throw new Error("공간 등록 중 오류가 발생했습니다.");
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
