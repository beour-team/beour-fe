import type { AxiosError } from "axios";
import { api } from "../api";
import { API_REVIEW_RESERVATION_DETAIL } from "../../constants/endpoint/endpoint";

// 리뷰 작성을 위한 예약 정보 타입
export interface ReviewReservationDetail {
  reservationId: number;
  spaceName: string;
  date: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  usagePurpose: string;
  thumbnailUrl: string;
}

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: ReviewReservationDetail;
}

export const getReviewReservationDetail = async (
  reservationId: number
): Promise<ReviewReservationDetail> => {
  console.log(
    `🔄 [API] getReviewReservationDetail 호출 시작 - 예약 ID: ${reservationId}`
  );

  const url = API_REVIEW_RESERVATION_DETAIL.replace(
    "{reservationId}",
    reservationId.toString()
  );
  console.log(`🌐 [API] 요청 URL: ${url}`);

  try {
    const response = await api.get<ApiResponse>(url);

    console.log("📥 [API] 원본 응답:", response);
    console.log("📥 [API] 응답 상태:", response.status);
    console.log("📥 [API] 응답 데이터:", response.data);

    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      console.log("✅ [API] 성공 응답 - 예약 상세 정보:", response.data.data);
      console.log("🖼️ [API] 썸네일 URL 확인:", response.data.data.thumbnailUrl);
      console.log("📋 [API] 전체 예약 정보 구조:", {
        reservationId: response.data.data.reservationId,
        spaceName: response.data.data.spaceName,
        date: response.data.data.date,
        startTime: response.data.data.startTime,
        endTime: response.data.data.endTime,
        guestCount: response.data.data.guestCount,
        usagePurpose: response.data.data.usagePurpose,
        thumbnailUrl: response.data.data.thumbnailUrl,
      });
      return response.data.data;
    } else {
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("예약 정보를 가져오지 못했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.error("🔐 [API] 인증 오류 - 로그인이 필요합니다");
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 404) {
      console.log("ℹ️ [API] 404 - 예약 정보를 찾을 수 없음");
      throw new Error("예약 정보를 찾을 수 없습니다.");
    }

    throw new Error(
      `예약 정보를 가져오지 못했습니다. (${
        error?.response?.status || "Unknown"
      })`
    );
  }
};
