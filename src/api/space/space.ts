import axios from "axios";
import { api } from "../api";
import { API_SPACES } from "../../constants/endpoint/endpoint";
import type { HostSpaceInfo } from "../../types/HostSpaceInfo";

export const registerSpace = async (spaceInfo: HostSpaceInfo, accessToken: string) => {
  try {
    console.log("registerSpace() 요청 데이터:", spaceInfo);
    console.log("보내는 토큰:", accessToken);

    const response = await api.post(API_SPACES, spaceInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("서버 응답 데이터:", response.data);  // 응답 확인

    return response.data;
  } catch (error: unknown) {
    console.error("registerSpace() 에러:", error);  // 실제 에러 로그 출력
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("공간 등록 중 에러 발생");
    }
  }
};

