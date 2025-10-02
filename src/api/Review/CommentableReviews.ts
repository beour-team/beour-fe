// HTTP 요청 에러 타입과 API 인스턴스, 엔드포인트 상수를 가져옴
import type { AxiosError } from "axios";
import { api } from "../api";
import {
  API_HOST_COMMENTABLE_REVIEWS,
  API_CREATE_REVIEW_COMMENT,
} from "../../constants/endpoint/endpoint";

// 호스트가 답글을 작성할 수 있는 개별 리뷰의 데이터 구조를 정의하는 타입
export interface CommentableReview {
  reviewId: number; // 리뷰 고유 ID
  guestNickname: string; // 리뷰 작성자(게스트) 닉네임
  reviewRating: number; // 별점 (1-5점)
  reviewCreatedAt: string; // 리뷰 작성 일시 (ISO 8601 형식)
  spaceName: string; // 리뷰 대상 공간명
  reservationDate: string; // 예약 이용 날짜 (YYYY-MM-DD 형식)
  reviewContent: string; // 리뷰 텍스트 내용
  reviewImages: string[]; // 리뷰에 첨부된 이미지 URL 배열
}

// 페이징 정보를 포함한 답글 작성 가능한 리뷰 목록의 전체 응답 구조
export interface CommentableReviewsData {
  reviews: CommentableReview[]; // 리뷰 배열
  last: boolean; // 마지막 페이지 여부
  totalPage: number; // 전체 페이지 수
}

// 서버로부터 받는 답글 작성 가능한 리뷰 API의 표준 응답 형식
interface CommentableReviewApiResponse {
  code: number; // HTTP 상태 코드
  httpStatus: string; // HTTP 상태 텍스트 ("OK" 등)
  data: CommentableReviewsData; // 실제 리뷰 데이터
}

// 답글 작성 요청 데이터 타입
export interface CreateReviewCommentRequest {
  reviewId: number; // 답글을 달 리뷰의 ID
  content: string; // 답글 내용
}

// 답글 작성 API 응답 타입
interface CreateReviewCommentApiResponse {
  code: number; // HTTP 상태 코드
  httpStatus: string; // HTTP 상태 텍스트
  data: null; // 답글 작성 시에는 데이터 없음 (성공 여부만 확인)
}

// 호스트가 답글을 작성할 수 있는 리뷰 목록을 페이징과 함께 서버에서 가져오는 함수
export const getCommentableReviews = async (
  page: number = 0, // 요청할 페이지 번호 (0부터 시작)
  size: number = 10 // 한 페이지당 가져올 리뷰 개수
): Promise<CommentableReviewsData> => {
  // API 호출 시작을 콘솔에 로깅
  console.log(
    `🔄 [API] getCommentableReviews 호출 시작 - 페이지: ${
      page + 1
    }, 사이즈: ${size}`
  );
  // 실제 요청할 URL을 콘솔에 출력
  console.log(
    `🌐 [API] 요청 URL: ${API_HOST_COMMENTABLE_REVIEWS}?page=${page}&size=${size}`
  );

  try {
    // 페이징 파라미터와 함께 GET 요청을 서버에 전송
    const response = await api.get<CommentableReviewApiResponse>(
      `${API_HOST_COMMENTABLE_REVIEWS}?page=${page}&size=${size}`
    );

    // 서버 응답이 성공인지 확인 (HTTP 200 OK)
    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      // 성공 시 받은 데이터를 콘솔에 출력
      console.log(
        "✅ [API] 성공 응답 - 답글 작성 가능한 리뷰 목록:",
        response.data.data
      );
      // 데이터가 없으면 빈 배열과 기본값으로 대체하여 반환
      return response.data.data || { reviews: [], last: true, totalPage: 0 };
    } else {
      // 서버에서 에러 코드를 반환한 경우 로깅 후 예외 발생
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("답글 작성 가능한 리뷰 목록을 가져오지 못했습니다.");
    }
  } catch (err: unknown) {
    // HTTP 요청 자체가 실패한 경우의 에러 처리
    const error = err as AxiosError;

    // 에러 정보를 상세히 콘솔에 출력
    console.error("❌ [API] 요청 실패:", {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      message: error?.message,
    });

    // 인증 관련 에러 (401 Unauthorized, 403 Forbidden) 처리
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.error("🔐 [API] 인증 오류 - 로그인이 필요합니다");
      throw new Error("로그인이 필요합니다.");
    }

    // 404 Not Found 에러는 단순히 데이터가 없는 것으로 처리
    if (error?.response?.status === 404) {
      console.log("ℹ️ [API] 404 - 답글 작성 가능한 리뷰가 없음");
      return { reviews: [], last: true, totalPage: 0 };
    }

    // 기타 모든 에러에 대한 일반적인 에러 메시지 반환
    throw new Error(
      `답글 작성 가능한 리뷰 목록을 가져오지 못했습니다. (${
        error?.response?.status || "Unknown"
      })`
    );
  }
};

// 호스트가 리뷰에 답글을 작성하는 함수
export const createReviewComment = async (
  requestData: CreateReviewCommentRequest
): Promise<void> => {
  // API 호출 시작을 콘솔에 로깅
  console.log(
    `🔄 [API] createReviewComment 호출 시작 - 리뷰 ID: ${requestData.reviewId}`
  );
  // 실제 요청할 URL과 데이터를 콘솔에 출력
  console.log(`🌐 [API] 요청 URL: ${API_CREATE_REVIEW_COMMENT}`);
  console.log(`📝 [API] 요청 데이터:`, requestData);

  try {
    // POST 요청을 서버에 전송
    const response = await api.post<CreateReviewCommentApiResponse>(
      API_CREATE_REVIEW_COMMENT,
      requestData
    );

    // 서버 응답이 성공인지 확인 (HTTP 200 OK)
    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      // 성공 시 로그 출력
      console.log("✅ [API] 성공 응답 - 답글 작성 완료:", requestData.reviewId);
      return; // 성공적으로 완료
    } else {
      // 서버에서 에러 코드를 반환한 경우 로깅 후 예외 발생
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("답글을 작성하지 못했습니다.");
    }
  } catch (err: unknown) {
    // HTTP 요청 자체가 실패한 경우의 에러 처리
    const error = err as AxiosError;

    // 에러 정보를 상세히 콘솔에 출력
    console.error("❌ [API] 요청 실패:", {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      message: error?.message,
    });

    // 인증 관련 에러 (401 Unauthorized, 403 Forbidden) 처리
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.error("🔐 [API] 인증 오류 - 로그인이 필요합니다");
      throw new Error("로그인이 필요합니다.");
    }

    // 400 Bad Request - 잘못된 요청 데이터
    if (error?.response?.status === 400) {
      console.error("📝 [API] 잘못된 요청 - 입력 데이터를 확인해주세요");
      throw new Error("입력 내용을 확인해주세요.");
    }

    // 404 Not Found - 리뷰를 찾을 수 없음
    if (error?.response?.status === 404) {
      console.error("🔍 [API] 리뷰를 찾을 수 없음");
      throw new Error("해당 리뷰를 찾을 수 없습니다.");
    }

    // 기타 모든 에러에 대한 일반적인 에러 메시지 반환
    throw new Error(
      `답글을 작성하지 못했습니다. (${error?.response?.status || "Unknown"})`
    );
  }
};
