import type { AxiosError } from "axios";
import { api } from "../api";

// 리뷰 작성 가능한 예약 항목 타입
export interface ReviewableReservation {
  reservationId: number;
  spaceName: string;
  date: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  usagePurpose: string;
}

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: ReviewableReservation[];
}

export const getReviewableList = async (): Promise<ReviewableReservation[]> => {
  try {
    const response = await api.get<ApiResponse>(
      `/api/guest/reviews/reviewable`
    );

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      return response.data.data || [];
    } else {
      throw new Error("리뷰 작성 가능한 목록을 가져오지 못했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    console.error("리뷰 작성 가능한 목록 API 에러:", {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 404) {
      // 리뷰 작성 가능한 예약이 없는 경우 빈 배열 반환
      return [];
    }

    throw new Error("리뷰 작성 가능한 목록을 가져오지 못했습니다.");
  }
};
