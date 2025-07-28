// 서버 배포 후 수정 필요
export const BASE_URL = "https://beour.store";

// 혹시 오타나 이상한 부분이 있으면 말씀 주세요,,,,,,ㅎ

// 로그인 관련
export const API_LOGIN = "/api/login";
export const API_FIND_ID = "/api/users/find-login-id";
export const API_RESET_PW = "/api/users/reset-pw";
export const API_LOGOUT = "/logout";
export const API_CHECK_LOGIN_ID = "/api/signup/check-duplicate/login-id";
export const API_CHECK_NICKNAME = "/api/signup/check-duplicate/nickname";
export const API_SIGNUP = "/api/users/signup";

// 마이페이지 관련
export const API_WITHDRAW = "/api/mypage/withdraw";
export const API_MYPAGE = "/api/mypage";
export const API_MYPAGE_DETAIL = "/api/mypage/detail";
export const API_UPDATE_PROFILE = "/api/mypage/detail"; // 닉네임, 핸드폰 번호 변경
export const API_UPDATE_PASSWORD = "/api/mypage/password";

// 배너 관련
export const API_BANNERS = "/api/banners";
export const API_BANNER_CLICK = "/api/banners/{bannerId}/click";

// 메인화면 - 예약 데이터
export const API_RESERVATION_SUMMARY =
  "/api/reservations/summary?spaceId={spaceId}&date={date}";

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
export const API_MY_SPACES = "/api/spaces/my-spaces";

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

// 마이페이지 - 내가 작성한 대댓글 조회
export const API_MY_REVIEW_COMMENTS = "/api/review-comments/list/{spaceId}";

// 마이페이지 - 대댓글 수정/삭제
export const API_REVIEW_COMMENT_UPDATE = "/api/review-comments/{commentId}";
export const API_REVIEW_COMMENT_DELETE = "/api/review-comments/{commentId}";

// =====================
// 게스트(사용자) 관련
// =====================
// 메인화면 - 공간 검색
export const API_SPACE_SEARCH = "/api/space/search?request={keyword}";
export const API_SPACE_SEARCH_FILTER = "/api/spaces/search/filter";
export const API_SPACE_SEARCH_CATEGORY =
  "/api/spaces/search/spacecategory?spacecategory={value}";
export const API_SPACE_SEARCH_USE_CATEGORY =
  "/api/spaces/search/usecategory?usecategory={value}";
export const API_SPACES_NEW = "/api/spaces/new";
export const API_REVIEWS_NEW = "/api/reviews/new";

// 공간예약
export const API_SPACE_RESERVE = "/api/spaces/reserve";
export const API_RESERVATION_CURRENT = "/api/reservation?guestId={guestId}";
export const API_RESERVATION_PAST = "/api/reservation/past?guestId={guestId}";
export const API_RESERVATION_CANCEL_GUEST =
  "/api/reservation/cancel?reservationId={reservationId}";
export const API_SPACE_DETAIL_GUEST = "/api/spaces/{spaceId}";
export const API_RESERVATION_AVAILABLE_TIMES =
  "/api/spaces/reserve/available-times";

// 찜
export const API_WISHLIST = "/api/wishlist?spaceId={id}";
export const API_WISHLIST_DELETE = "/api/wishlist?spaceId={id}";

// 내 주변
export const API_SPACES_NEARBY =
  "/api/spaces/nearby?latitude={latitude}&longitude={longitude}&radiusKm={km}&userId={id}";
export const API_SPACE_SIMPLE = "/api/space/{spaceId}/simple";

// 나의 예약
export const API_REVIEW_WRITE = "/api/reviews/write";

// 마이페이지 - 찜 목록 조회
export const API_WISHLIST_ALL = "/api/wishlist/all";

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
