import type { AxiosError } from "axios";
import { api } from "../api";
import { API_MY_REVIEWABLE_GUEST } from "../../constants/endpoint/endpoint";

// 리뷰 작성 가능한 예약 항목 타입
export interface ReviewableReservation {
  reservationId: number;
  spaceName: string;
  thumbnailUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  hasReview?: boolean;
  usagePurpose: string;
  useTypes?: string[]; // 사용 목적 태그들 (선택적)
}

// 페이징된 예약 목록 응답 타입
export interface ReviewableReservationsData {
  reservations: ReviewableReservation[];
  last: boolean;
  totalPage: number;
}

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: ReviewableReservationsData;
}

// 페이징을 지원하는 리뷰 작성 가능한 목록 조회
export const getReviewableList = async (
  page: number = 0,
  size: number = 10
): Promise<ReviewableReservationsData> => {
  console.log(
    `🔄 [API] getReviewableList 호출 시작 - 페이지: ${
      page + 1
    }, 사이즈: ${size}`
  );
  console.log(
    `🌐 [API] 요청 URL: ${API_MY_REVIEWABLE_GUEST}?page=${page}&size=${size}`
  );

  try {
    const response = await api.get<ApiResponse>(
      `${API_MY_REVIEWABLE_GUEST}?page=${page}&size=${size}`
    );

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      return (
        response.data.data || { reservations: [], last: true, totalPage: 0 }
      );
    } else {
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("리뷰 작성 가능한 목록을 가져오지 못했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.error("🔐 [API] 인증 오류 - 로그인이 필요합니다");
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 404) {
      console.log("ℹ️ [API] 404 - 리뷰 작성 가능한 예약이 없음");
      return { reservations: [], last: true, totalPage: 0 };
    }

    throw new Error(
      `리뷰 작성 가능한 목록을 가져오지 못했습니다. (${
        error?.response?.status || "Unknown"
      })`
    );
  }
};

// 기존 호환성을 위한 함수 (배열만 반환)
export const getReviewableReservations = async (
  page: number = 0,
  size: number = 10
): Promise<ReviewableReservation[]> => {
  const data = await getReviewableList(page, size);
  return data.reservations;
};
