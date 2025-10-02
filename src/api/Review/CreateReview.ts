import type { AxiosError } from "axios";
import { api } from "../api";
import { API_CREATE_REVIEW } from "../../constants/endpoint/endpoint";

// 리뷰 작성 요청 데이터 타입 (프론트엔드에서 사용)
export interface CreateReviewRequest {
  reservationId: number;
  rating: number;
  content: string;
  images?: File[]; // 업로드할 이미지 파일들
}

// 백엔드로 전송할 JSON 데이터 타입
export interface CreateReviewRequestDto {
  reservationId: number;
  rating: number;
  content: string;
  imageUrls: string[]; // 이미지 URL 배열
}

// 리뷰 작성 응답 데이터 타입
export interface CreateReviewResponse {
  reviewId: number;
  message: string;
}

// API 응답 인터페이스
interface ApiResponse {
  code: number;
  httpStatus: string;
  data: CreateReviewResponse;
}

export const createReview = async (
  reviewData: CreateReviewRequest
): Promise<CreateReviewResponse> => {
  try {
    // FormData 생성
    const formData = new FormData();

    // 기본 데이터 추가
    const json = JSON.stringify({
      reservationId: reviewData.reservationId,
      rating: reviewData.rating,
      content: reviewData.content,
    });

    const jsonBlob = new Blob([json], { type: "application/json" });
    formData.append("requestDto", jsonBlob);

    // 이미지 파일들 추가
    if (reviewData.images && reviewData.images.length > 0) {
      reviewData.images.forEach((image, index) => {
        formData.append("images", image); // images는 @RequestPart("images")
        console.log(
          `📸 [API] 이미지 ${index + 1} 추가:`,
          image.name,
          `(${image.size} bytes)`
        );
      });
    }

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    const response = await api.post<ApiResponse>(API_CREATE_REVIEW, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.code === 200 || response.data.code === 201) {
      console.log("✅ [API] 리뷰 작성 성공:", response.data.data);
      return response.data.data;
    } else {
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("리뷰 작성에 실패했습니다.");
    }
  } catch (err: unknown) {
    const error = err as AxiosError;

    console.error("❌ [API] 리뷰 작성 실패:", {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      message: error?.message,
      config: {
        url: error?.config?.url,
        method: error?.config?.method,
        headers: error?.config?.headers,
      },
    });

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.error("🔐 [API] 인증 오류 - 로그인이 필요합니다");
      throw new Error("로그인이 필요합니다.");
    }

    if (error?.response?.status === 400) {
      console.error("📝 [API] 요청 데이터 오류");
      throw new Error("입력 정보를 확인해주세요.");
    }

    if (error?.response?.status === 409) {
      console.error("🔄 [API] 중복 리뷰 오류");
      throw new Error("이미 리뷰를 작성하셨습니다.");
    }

    throw new Error(
      `리뷰 작성에 실패했습니다. (${error?.response?.status || "Unknown"})`
    );
  }
};
