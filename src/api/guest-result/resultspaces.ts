import type { SearchResultItems } from "../../types/guest-main/SearchResultItems";
import axios from "axios";
import { API_SPACE_SEARCH, API_SPACE_CATEGORY, BASE_URL, API_SPACE_USE_CATEGORY } from "../../constants/endpoint/endpoint";


export interface FetchSpacesResponse {
  spaces: SearchResultItems[];
  totalPage: number;
  last: boolean;
}

export const fetchSpacesAPI = async (
  type: "keyword" | "spacecategory" | "usecategory",
  value: string,
  page: number
): Promise<FetchSpacesResponse> => {
  let endpoint = "";

  switch (type) {
    case "keyword":
      endpoint = API_SPACE_SEARCH;
      break;
    case "spacecategory":
      endpoint = API_SPACE_CATEGORY;
      break;
    case "usecategory":
      endpoint = API_SPACE_USE_CATEGORY;
      break;
    default:
      throw new Error("Invalid search type");
  }

  const response = await axios.get(BASE_URL + endpoint, {
    params: { [type]: value, page },
  });
  return response.data.data;
};