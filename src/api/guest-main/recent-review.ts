import axios from "axios";
import type { RecentReview } from "../../types/RecentReview";

export const fetchRecentReview = async (): Promise<RecentReview[]> => {
  const res = await axios.get("/api/reviews/new");
  return res.data.data;
};
