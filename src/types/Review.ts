export interface ReviewComment {
  review_comment_id: number;
  review_id: number;
  space_name: string;
  comment: string;
  created_at: string;
}

export interface ReviewCommentableResponse {
  reviewId: number;
  guestNickname: string;
  reviewRating: number;
  reviewCreatedAt: string;
  spaceName: string;
  reservationDate: string;
  reviewContent: string;
  reviewImages: string[];
}

export interface ReviewCardData {
  id: number;
  nickname: string;
  rating: number;
  comment: string;
  created_at: string;
  place_name: string;
  image_count: number;
}

// 호스트가 답글을 작성할 수 있는 리뷰 관련 타입들
export interface CommentableReviewItem {
  reviewId: number; // 리뷰 고유 ID
  guestNickname: string; // 게스트 닉네임
  reviewRating: number; // 별점 (1-5)
  reviewCreatedAt: string; // 리뷰 작성일시 (ISO 8601)
  spaceName: string; // 공간명
  reservationDate: string; // 예약일 (YYYY-MM-DD)
  reviewContent: string; // 리뷰 내용
  reviewImages: string[]; // 첨부 이미지 URL 배열
}

// 페이징을 포함한 답글 작성 가능한 리뷰 응답 타입
export interface CommentableReviewsResponse {
  reviews: CommentableReviewItem[]; // 리뷰 목록
  last: boolean; // 마지막 페이지 여부
  totalPage: number; // 전체 페이지 수
}

// 호스트 리뷰 관리 탭 타입
export type HostReviewTab = "guest" | "host";

// 리뷰 필터 옵션 타입
export interface ReviewFilterOptions {
  rating?: number; // 별점 필터 (1-5)
  dateRange?: {
    startDate: string; // 시작일 (YYYY-MM-DD)
    endDate: string; // 종료일 (YYYY-MM-DD)
  };
  spaceName?: string; // 공간명으로 검색
}

// 답글 작성 관련 타입들
export interface ReviewCommentData {
  reviewId: number; // 답글을 달 리뷰의 ID
  content: string; // 답글 내용
}

// 답글 작성 폼 상태 타입
export interface ReviewCommentFormState {
  isOpen: boolean; // 답글 작성 폼이 열려있는지
  content: string; // 입력된 답글 내용
  loading: boolean; // 답글 작성 중인지
  error: string | null; // 에러 메시지
}

// 답글이 포함된 리뷰 카드 데이터 타입
export interface ReviewCardWithComment extends ReviewCardData {
  hasComment?: boolean; // 답글이 있는지 여부
  commentContent?: string; // 답글 내용
  commentCreatedAt?: string; // 답글 작성일시
}

// 호스트가 작성한 답글 관련 타입들
export interface WrittenCommentItem {
  guestNickname: string; // 게스트 닉네임
  reviewRating: number; // 리뷰 별점 (1-5)
  reviewCreatedAt: string; // 리뷰 작성일시 (ISO 8601)
  spaceName: string; // 공간명
  reservationDate: string; // 예약일 (YYYY-MM-DD)
  reviewContent: string; // 리뷰 내용
  reviewImages: string[]; // 첨부 이미지 URL 배열
  hostNickname: string; // 호스트 닉네임 (답글 작성자)
  reviewCommentCreatedAt: string; // 답글 작성일시 (ISO 8601)
  reviewCommentContent: string; // 답글 내용
}

// 페이징을 포함한 작성한 답글 응답 타입
export interface WrittenCommentsResponse {
  reviewComments: WrittenCommentItem[]; // 답글 목록
  last: boolean; // 마지막 페이지 여부
  totalPage: number; // 전체 페이지 수
}

// 작성한 답글을 ReviewCardData 형태로 변환하기 위한 매핑 타입
export interface WrittenCommentAsReviewCard extends ReviewCardData {
  // 기본 ReviewCardData 필드들은 상속
  // 추가로 답글 관련 정보들
  commentContent: string; // 답글 내용
  commentCreatedAt: string; // 답글 작성일시
  hostNickname: string; // 호스트 닉네임
}
