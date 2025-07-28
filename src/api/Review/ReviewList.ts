import { api } from "../api";

export interface ReviewListResponse {
  reviewId: number;
  guestNickname: string;
  reviewRating: number;
  reviewCreatedAt: string;
  spaceName: string;
  reservationDate: string;
  reviewContent: string;
  reviewImages: string[];
}

export const getReviewList = async (): Promise<ReviewListResponse[]> => {
  const response = await api.get("/api/host/review-comments/commentable");

  return response.data.data;
};
