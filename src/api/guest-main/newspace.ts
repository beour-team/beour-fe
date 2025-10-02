import axios from "axios";
import type { NewSpace } from "../../types/guest-main/NewSpaceType";
import { API_SPACES_NEW, BASE_URL } from "../../constants/endpoint/endpoint";

export const fetchNewSpaces = async (): Promise<NewSpace[]> => {
  const res = await axios.get(BASE_URL + API_SPACES_NEW);
  return res.data.data;
};
