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
