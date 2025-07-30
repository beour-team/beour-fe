import type { SearchResultItems } from "../../types/guest-main/SearchResultItems";
import axios from "axios";
import { API_SPACE_SEARCH, BASE_URL } from "../../constants/endpoint/endpoint";


export interface FetchSpacesResponse {
  spaces: SearchResultItems[];
  totalPage: number;
  last: boolean;
}

export const fetchSpacesAPI = async (
  keyword: string,
  page: number
): Promise<FetchSpacesResponse> => {
  const response = await axios.get(BASE_URL + API_SPACE_SEARCH, {
    params: { keyword, page },
  });
  return response.data.data;
};