// HTTP 요청 에러 타입과 API 인스턴스, 엔드포인트 상수를 가져옴
import type { AxiosError } from "axios";
import { api } from "../api";
import {
  API_HOST_WRITTEN_COMMENTS,
  API_DELETE_REVIEW_COMMENT,
} from "../../constants/endpoint/endpoint";

// 호스트가 작성한 개별 답글의 데이터 구조를 정의하는 타입
export interface WrittenComment {
  commentId?: number; // 답글 ID (API 응답에 없을 수 있으므로 optional)
  guestNickname: string; // 게스트 닉네임
  reviewRating: number; // 리뷰 별점 (1-5점)
  reviewCreatedAt: string; // 리뷰 작성 일시 (ISO 8601 형식)
  spaceName: string; // 공간명
  reservationDate: string; // 예약 이용 날짜 (YYYY-MM-DD 형식)
  reviewContent: string; // 리뷰 텍스트 내용
  reviewImages: string[]; // 리뷰에 첨부된 이미지 URL 배열
  hostNickname: string; // 호스트 닉네임 (답글 작성자)
  reviewCommentCreatedAt: string; // 답글 작성 일시 (ISO 8601 형식)
  reviewCommentContent: string; // 답글 내용
}

// 페이징 정보를 포함한 작성한 답글 목록의 전체 응답 구조
export interface WrittenCommentsData {
  reviewComments: WrittenComment[]; // 답글 배열
  last: boolean; // 마지막 페이지 여부
  totalPage: number; // 전체 페이지 수
}

// 서버로부터 받는 작성한 답글 API의 표준 응답 형식
interface WrittenCommentsApiResponse {
  code: number; // HTTP 상태 코드
  httpStatus: string; // HTTP 상태 텍스트 ("OK" 등)
  data: WrittenCommentsData; // 실제 답글 데이터
}

// 호스트가 작성한 답글 목록을 페이징과 함께 서버에서 가져오는 함수
export const getWrittenComments = async (
  page: number = 0, // 요청할 페이지 번호 (0부터 시작)
  size: number = 10 // 한 페이지당 가져올 답글 개수
): Promise<WrittenCommentsData> => {
  // API 호출 시작을 콘솔에 로깅
  console.log(
    `🔄 [API] getWrittenComments 호출 시작 - 페이지: ${
      page + 1
    }, 사이즈: ${size}`
  );
  // 실제 요청할 URL을 콘솔에 출력
  console.log(
    `🌐 [API] 요청 URL: ${API_HOST_WRITTEN_COMMENTS}?page=${page}&size=${size}`
  );

  try {
    // 페이징 파라미터와 함께 GET 요청을 서버에 전송
    const response = await api.get<WrittenCommentsApiResponse>(
      `${API_HOST_WRITTEN_COMMENTS}?page=${page}&size=${size}`
    );

    // 서버 응답이 성공인지 확인 (HTTP 200 OK)
    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      // 성공 시 받은 데이터를 콘솔에 출력
      console.log("✅ [API] 성공 응답 - 작성한 답글 목록:", response.data.data);
      // 데이터가 없으면 빈 배열과 기본값으로 대체하여 반환
      return (
        response.data.data || { reviewComments: [], last: true, totalPage: 0 }
      );
    } else {
      // 서버에서 에러 코드를 반환한 경우 로깅 후 예외 발생
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("작성한 답글 목록을 가져오지 못했습니다.");
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
      console.log("ℹ️ [API] 404 - 작성한 답글이 없음");
      return { reviewComments: [], last: true, totalPage: 0 };
    }

    // 기타 모든 에러에 대한 일반적인 에러 메시지 반환
    throw new Error(
      `작성한 답글 목록을 가져오지 못했습니다. (${
        error?.response?.status || "Unknown"
      })`
    );
  }
};

// 답글 삭제 API 응답 타입
interface DeleteReviewCommentApiResponse {
  code: number; // HTTP 상태 코드
  httpStatus: string; // HTTP 상태 텍스트
  data: null; // 삭제 시에는 데이터 없음
}

// 호스트가 작성한 답글을 삭제하는 함수
export const deleteReviewComment = async (commentId: number): Promise<void> => {
  // API 호출 시작을 콘솔에 로깅
  console.log(`🔄 [API] deleteReviewComment 호출 시작 - 답글 ID: ${commentId}`);

  // 실제 요청할 URL을 콘솔에 출력
  const requestUrl = API_DELETE_REVIEW_COMMENT.replace(
    "{commentId}",
    commentId.toString()
  );
  console.log(`🌐 [API] 요청 URL: ${requestUrl}`);

  try {
    // DELETE 요청을 서버에 전송
    const response = await api.delete<DeleteReviewCommentApiResponse>(
      requestUrl
    );

    // 서버 응답이 성공인지 확인 (HTTP 200 OK)
    if (response.data.code === 200 && response.data.httpStatus === "OK") {
      // 성공 시 로그 출력
      console.log("✅ [API] 성공 응답 - 답글 삭제 완료:", commentId);
      return; // 성공적으로 완료
    } else {
      // 서버에서 에러 코드를 반환한 경우 로깅 후 예외 발생
      console.error("❌ [API] 응답 코드 오류:", response.data);
      throw new Error("답글을 삭제하지 못했습니다.");
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

    // 404 Not Found - 이미 삭제된 답글이거나 존재하지 않는 답글
    if (error?.response?.status === 404) {
      console.error("🔍 [API] 답글을 찾을 수 없음");
      throw new Error("삭제할 답글을 찾을 수 없습니다.");
    }

    // 기타 모든 에러에 대한 일반적인 에러 메시지 반환
    throw new Error(
      `답글을 삭제하지 못했습니다. (${error?.response?.status || "Unknown"})`
    );
  }
};
