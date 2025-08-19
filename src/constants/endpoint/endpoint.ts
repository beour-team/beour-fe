// 서버 배포 후 수정 필요
export const BASE_URL = "https://beour.store";

// 혹시 오타나 이상한 부분이 있으면 말씀 주세요,,,,,,ㅎ

// 로그인 관련
export const API_LOGIN = "/api/login";
export const API_FIND_ID = "/api/users/find-login-id";
export const API_RESET_PW = "/api/users/reset-pw";
export const API_LOGOUT = "/api/logout";
export const API_CHECK_LOGIN_ID = "/api/signup/check-duplicate/login-id";
export const API_CHECK_NICKNAME = "/api/signup/check-duplicate/nickname";
export const API_SIGNUP = "/api/signup";

// 마이페이지 관련
export const API_WITHDRAW = "/api/mypage/withdraw";
export const API_MYPAGE = "/api/users/me";
export const API_MYPAGE_DETAIL = "/api/users/me/detail";
export const API_UPDATE_PROFILE = "/api/users/me/detail"; // 닉네임, 핸드폰 번호 변경
export const API_UPDATE_PASSWORD = "/api/users/me/password";

// 배너 관련
export const API_BANNERS = "/api/users/banners";
export const API_BANNER_CLICK = "/api/banners/{bannerId}/click";

// 메인화면 - 예약 데이터
export const API_RESERVATION_SUMMARY =
  "/api/reservations/summary?spaceId={spaceId}&date={date}";
export const API_HOST_SPACES = "/api/host/spaces";

// 공간 등록
export const API_SPACES = "/api/spaces";

// 캘린더 - 상세 예약 데이터
export const API_RESERVATION_DETAIL =
  "/api/reservations/detail?spaceId={spaceId}&date={date}";

// 나의 예약 - 예약 현황/승인/취소/지난 데이터
export const API_RESERVATION_CURRENT_LIST = "/api/reservations/current/list";
export const API_RESERVATION_APPROVE =
  "/api/reservations/approve/{reservationId}";
export const API_RESERVATION_CANCEL =
  "/api/reservations/cancel/{reservationId}";
export const API_RESERVATION_END_LIST = "/api/reservations/end/list";

// 나의 예약 - 기간 필터링/검색
export const API_RESERVATION_FILTER = "/api/reservations/filter"; // (필터링/검색 공통, 실제 API 명세에 따라 수정 필요)

// 리뷰 대댓글 달기
export const API_REVIEW_REPLY = "/api/reviews/{reviewId}/comments";

// 마이페이지 - 내가 등록한 공간 리스트 (수정됨)
export const API_MY_SPACES = "/api/users/me/spaces";

// 마이페이지 - 공간 상세 정보
export const API_SPACE_DETAIL = "/api/spaces/{spaceId}";
export const API_SPACE_DETAIL_ALL = "/api/spaces/{spaceId}"; // 전체 조회(중복)

// 마이페이지 - 공간 정보/상세/태그 수정
export const API_SPACE_BASIC_UPDATE = "/api/spaces/{spaceId}/basic";
export const API_SPACE_DESCRIPTION_UPDATE =
  "/api/spaces/{spaceId}/descriptions";
export const API_SPACE_TAGS_UPDATE = "/api/spaces/{spaceId}/tags";

// 마이페이지 - 공간 이용 가능 시간, 이미지 수정, 공간 삭제
export const API_SPACE_AVAILABLE_TIMES_UPDATE =
  "/api/spaces/{spaceId}/available-times";
export const API_SPACE_IMAGES_UPDATE = "/api/spaces/{spaceId}/images";
export const API_SPACE_DELETE = "/api/spaces/{spaceId}";

// 마이페이지 - 게스트 리뷰 리스트 조회
export const API_MY_REVIEWABLE_GUEST = "/api/users/me/reviewable-reservations";
export const API_MY_REVIEWWRITTEN_GUEST = "/api/users/me/reviews";

// 마이페이지 - 대댓글 수정/삭제
export const API_REVIEW_COMMENT_UPDATE = "/api/review-comments/{commentId}";
export const API_REVIEW_COMMENT_DELETE = "/api/review-comments/{commentId}";

// =====================
// 게스트(사용자) 관련
// =====================
// 메인화면 - 공간 검색
export const API_SPACE_SEARCH = "/api/spaces/keyword";
export const API_SPACE_SEARCH_FILTER = "/api/spaces/search/filter";
export const API_SPACE_CATEGORY = "/api/spaces/spacecategory";
export const API_SPACE_USE_CATEGORY = "/api/spaces/usecategory";
export const API_SPACES_NEW = "/api/spaces/new";
export const API_REVIEWS_NEW = "/api/reviews/new";

// 공간예약
export const API_SPACE_RESERVE = "/api/spaces/reserve";
export const API_RESERVATION_CURRENT = "/api/reservations/current";
export const API_RESERVATION_PAST = "/api/reservations/past";
export const API_RESERVATION_CANCEL_GUEST =
  "/api/reservation/cancel?reservationId={reservationId}";
export const API_SPACE_DETAIL_GUEST = "/api/spaces/{spaceId}";
export const API_RESERVATION_AVAILABLE_TIMES =
  "/api/spaces/reserve/available-times";

// 찜
export const API_WISHLIST = "/api/wishlist?spaceId={id}";
export const API_WISHLIST_DELETE = "/api/spaces/{id}/likes";

// 내 주변
export const API_SPACES_NEARBY = "/api/spaces/nearby";
export const API_SPACE_SIMPLE = "/api/space/{spaceId}/simple";

// 나의 예약
export const API_REVIEW_WRITE = "/api/reviews/write";

// 리뷰 작성을 위한 예약 정보 조회
export const API_REVIEW_RESERVATION_DETAIL =
  "/api/reviews/reservations/{reservationId}";

// 리뷰 작성
export const API_CREATE_REVIEW = "/api/users/me/reviews";

// 내가 작성한 리뷰 목록 조회 (페이징)
export const API_MY_WRITTEN_REVIEWS = "/api/users/me/reviews";

// 마이페이지 - 찜 목록 조회 (페이징)
export const API_WISHLIST_ALL = "/api/likes";

// 마이페이지 - 리뷰 관련
export const API_REVIEW_LIST = "/api/reviews/list";
export const API_REVIEW_UPDATE = "/api/reviews/{reviewId}";
export const API_REVIEW_DELETE = "/api/reviews/{reviewId}";

// =====================
// 관리자 페이지 관련
// =====================
// 공간 관리
export const API_ADMIN_SPACE_LIST = "/admin/space/list";
export const API_ADMIN_SPACE_UPDATE = "/admin/space";
export const API_ADMIN_SPACE_DELETE = "/admin/space";

// 배너 관리
export const API_ADMIN_BANNER_LIST = "/admin/banner/list";
export const API_ADMIN_BANNER_CREATE = "/admin/banner";
export const API_ADMIN_BANNER_UPDATE = "/admin/banners/{bannerId}";
export const API_ADMIN_BANNER_DELETE = "/admin/banners/{bannerId}";
