// 게스트 메인화면 - 최근 등록된 리뷰
export interface RecentReview {
  reviewId: number; //여기 필요해요 ㅠㅠ
  spaceName: string;
  reviewerNickName: string;
  reviewCreatedAt: string;
  rating: number;
  images: string[];
  reviewContent: string;
}
