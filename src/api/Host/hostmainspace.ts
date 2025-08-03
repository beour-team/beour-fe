import { api } from "../api";
import { API_HOST_SPACES } from "../../constants/endpoint/endpoint";

export interface HostSpace {
  spaceId: number;
  spaceName: string;
}

export interface HostSpacesResponse {
  code: number;
  httpStatus: string;
  data: HostSpace[];
}

// host.ts
export const getHostSpaces = async (): Promise<{ spaceId: number; spaceName: string }[]> => {
  try {
    console.log("accessToken in localStorage:", localStorage.getItem("accessToken"));

    const response = await api.get(API_HOST_SPACES);
    return response.data.data;
  } catch (error) {
    console.error("❌ API 응답 에러:", error);
    throw error;
  }
};