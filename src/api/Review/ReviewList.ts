// HTTP 요청 에러 타입과 API 인스턴스, 엔드포인트 상수를 가져옴
import type { AxiosError } from "axios";
import { api } from "../api";
import { API_MY_WRITTEN_REVIEWS } from "../../constants/endpoint/endpoint";

// 게스트가 작성한 개별 리뷰의 데이터 구조를 정의하는 타입
export interface WrittenReview {
  reviewId: number; // 리뷰 고유 ID
  guestNickname: string; // 리뷰 작성자(게스트) 닉네임
  reviewRating: number; // 별점 (1-5점)
  reviewCreatedAt: string; // 리뷰 작성 일시
  spaceName: string; // 리뷰 대상 공간명
  reservationDate: string; // 예약 이용 날짜
  reviewImages: string[]; // 리뷰에 첨부된 이미지 URL 배열
  reviewContent: string; // 리뷰 텍스트 내용
  reviewCommentHostNickname?: string; // 호스트 답글 작성자 닉네임 (선택적)
  reviewCommentCreatedAt?: string; // 호스트 답글 작성 일시 (선택적)
  reviewCommentContent?: string; // 호스트 답글 내용 (선택적)
}

// 페이징 정보를 포함한 작성한 리뷰 목록의 전체 응답 구조
export interface WrittenReviewsData {
  reviews: WrittenReview[]; // 리뷰 배열
  last: boolean; // 마지막 페이지 여부
  totalPage: number; // 전체 페이지 수
}

// 호스트용 리뷰 목록 타입 (기존 시스템과의 호환성 유지를 위함)
export interface ReviewListResponse {
  reviewId: number; // 리뷰 ID
  guestNickname: string; // 게스트 닉네임
  reviewRating: number; // 별점
  reviewCreatedAt: string; // 작성일시
  spaceName: string; // 공간명
  reservationDate: string; // 예약일
  reviewContent: string; // 리뷰 내용
  reviewImages: string[]; // 첨부 이미지들
}

// 서버로부터 받는 작성한 리뷰 API의 표준 응답 형식
interface WrittenReviewApiResponse {
  code: number; // HTTP 상태 코드
  httpStatus: string; // HTTP 상태 텍스트
  data: WrittenReviewsData; // 실제 리뷰 데이터
}

// 리뷰 삭제 API 응답 타입
interface DeleteReviewApiResponse {
  code: number; // HTTP 상태 코드
  httpStatus: string; // HTTP 상태 텍스트
  data: null; // 삭제 시에는 데이터 없음
}

// 게스트가 작성한 리뷰 목록을 페이징과 함께 서버에서 가져오는 함수
export const getWrittenReviews = async (
  page: number = 0, // 요청할 페이지 번호 (0부터 시작)
  size: number = 10 // 한 페이지당 가져올 리뷰 개수
): Promise<WrittenReviewsData> => {
  // API 호출 시작을 콘솔에 로깅
  console.log(
    `🔄 [API] getWrittenReviews 호출 시작 - 페이지: ${
      page + 1
    }, 사이즈: ${size}`
  );
  // 실제 요청할 URL을 콘솔에 출력
  console.log(
    `🌐 [API] 요청 URL: ${API_MY_WRITTEN_REVIEWS}?page=${page}&size=${size}`
  );

  try {
    // 페이징 파라미터와 함께 GET 요청을 서버에 전송
    const response = await api.get<WrittenReviewApiResponse>(
      `${API_MY_WRITTEN_REVIEWS}?page=${page}&size=${size}`
    );

    // 서버 응답이 성공인지 확인 (HTTP 200 OK)
    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      // 성공 시 받은 데이터를 콘솔에 출력
      console.log("✅ [API] 성공 응답 - 작성한 리뷰 목록:", response.data.data);
      // 데이터가 없으면 빈 배열과 기본값으로 대체하여 반환
      return response.data.data || { reviews: [], last: true, totalPage: 0 };
    } else {
      // 서버에서 에러 코드를 반환한 경우 로깅 후 예외 발생
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("작성한 리뷰 목록을 가져오지 못했습니다.");
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
      console.log("ℹ️ [API] 404 - 작성한 리뷰가 없음");
      return { reviews: [], last: true, totalPage: 0 };
    }

    // 기타 모든 에러에 대한 일반적인 에러 메시지 반환
    throw new Error(
      `작성한 리뷰 목록을 가져오지 못했습니다. (${
        error?.response?.status || "Unknown"
      })`
    );
  }
};

// 작성한 리뷰 삭제 함수
export const deleteWrittenReview = async (reviewId: number): Promise<void> => {
  // API 호출 시작을 콘솔에 로깅
  console.log(`🔄 [API] deleteWrittenReview 호출 시작 - 리뷰 ID: ${reviewId}`);
  console.log(`🌐 [API] 요청 URL: ${API_MY_WRITTEN_REVIEWS}/${reviewId}`);

  try {
    // DELETE 요청을 서버에 전송
    const response = await api.delete<DeleteReviewApiResponse>(
      `${API_MY_WRITTEN_REVIEWS}/${reviewId}`
    );

    // 서버 응답이 성공인지 확인 (HTTP 200 OK)
    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      console.log("✅ [API] 성공 응답 - 리뷰 삭제 완료:", reviewId);
      return;
    } else {
      // 서버에서 에러 코드를 반환한 경우 로깅 후 예외 발생
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("리뷰를 삭제하지 못했습니다.");
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

    // 404 Not Found 에러 - 이미 삭제된 리뷰
    if (error?.response?.status === 404) {
      console.log("ℹ️ [API] 404 - 리뷰를 찾을 수 없음");
      throw new Error("삭제할 리뷰를 찾을 수 없습니다.");
    }

    // 기타 모든 에러에 대한 일반적인 에러 메시지 반환
    throw new Error(
      `리뷰를 삭제하지 못했습니다. (${error?.response?.status || "Unknown"})`
    );
  }
};

// 호스트가 답글을 달 수 있는 리뷰 목록을 가져오는 함수 (기존 시스템 호환성 유지)
export const getReviewList = async (): Promise<ReviewListResponse[]> => {
  // 개발/테스트 환경에서 사용할 가짜 호스트 리뷰 데이터
  const hostReviewsMockData: ReviewListResponse[] = [
    {
      reviewId: 1, // 첫 번째 더미 리뷰 ID
      guestNickname: "김철수", // 가상의 게스트 닉네임
      reviewRating: 5, // 5점 만점 별점
      reviewCreatedAt: "2024-12-16T10:30:00Z", // ISO 형식의 작성 일시
      spaceName: "게임 파티룸 플레이엔 삼성역점", // 가상의 공간명
      reservationDate: "2024-12-15", // 예약 이용 날짜
      // 리뷰 텍스트 내용
      reviewContent:
        "정말 좋은 공간이었어요! 게임도 다양하고 시설이 깨끗했습니다.",
      reviewImages: [], // 첨부 이미지 없음
    },
    {
      reviewId: 2, // 두 번째 더미 리뷰 ID
      guestNickname: "이영희", // 가상의 게스트 닉네임
      reviewRating: 4, // 4점 별점
      reviewCreatedAt: "2024-12-11T09:15:00Z", // 작성 일시
      spaceName: "아늑한 요리 스튜디오", // 가상의 공간명
      reservationDate: "2024-12-10", // 예약 날짜
      // 리뷰 내용
      reviewContent:
        "요리하기 좋은 환경이었어요. 도구들도 잘 갖춰져 있었습니다.",
      reviewImages: [], // 첨부 이미지 없음
    },
  ];

  // Promise를 사용하여 실제 API 호출을 시뮬레이션 (비동기 처리)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hostReviewsMockData); // 0.5초 후 더미 데이터 반환
    }, 500); // 실제 네트워크 지연을 모방한 대기 시간
  });

  /* 실제 운영 환경에서 사용할 API 호출 코드 (현재는 주석 처리됨)
  try {
    // 호스트가 답글 달 수 있는 리뷰 목록을 서버에서 가져옴
    const response = await api.get("/api/host/review-comments/commentable");
    return response.data.data; // 서버 응답에서 실제 데이터 부분만 반환
  } catch (err: unknown) {
    // API 호출 실패 시 에러 처리
    const error = err as AxiosError;
    console.error("호스트 리뷰 목록 API 에러:", error); // 에러 로깅
    throw new Error("리뷰 목록을 가져오지 못했습니다."); // 사용자에게 보여줄 에러 메시지
  }
  */
};
