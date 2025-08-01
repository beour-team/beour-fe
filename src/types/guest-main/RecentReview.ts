// 게스트 메인화면 - 최근 등록된 리뷰
export interface RecentReview {
  reviewId: number;
  spaceName: string;
  reviewerNickName: string;
  reviewCreatedAt: string;
  rating: number;
  images: string[];
  reviewContent: string;
}
