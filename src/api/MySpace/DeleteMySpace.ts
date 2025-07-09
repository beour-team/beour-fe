import type { AxiosError } from "axios";
import { API_SPACE_DELETE } from "../../constants/endpoint/endpoint";
import { api } from "../api";

interface DeleteSpaceResponse {
  code: number;
  message: string;
  data: null;
}

export const deleteMySpace = async (
  spaceId: number
): Promise<DeleteSpaceResponse> => {
  try {
    const response = await api.delete<DeleteSpaceResponse>(
      API_SPACE_DELETE.replace("{spaceId}", spaceId.toString())
    );

    if (response.data.code === 200) {
      return response.data;
    } else {
      throw new Error("공간 삭제에 실패했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 404) {
      throw new Error("삭제할 공간을 찾을 수 없습니다.");
    }

    throw new Error("공간 삭제에 실패했습니다.");
  }
};
