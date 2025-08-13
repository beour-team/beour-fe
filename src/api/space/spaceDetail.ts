import axios from "axios";
import type { Space } from "../../types/Space";
import { BASE_URL, API_SPACE_DETAIL } from "../../constants/endpoint/endpoint";

export const getSpaceDetail = async (spaceId: string): Promise<Space> => {
  const res = await axios.get(BASE_URL + `${API_SPACE_DETAIL}/${spaceId}`);

  return res.data.data;
};
