import axios from "axios";
import type { RecentReview } from "../../types/guest-main/RecentReview";
import { API_REVIEWS_NEW, BASE_URL } from "../../constants/endpoint/endpoint";

export const fetchRecentReview = async (): Promise<RecentReview[]> => {
  const res = await axios.get( BASE_URL + API_REVIEWS_NEW);
  return res.data.data;
};
