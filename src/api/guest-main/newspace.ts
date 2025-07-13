import axios from "axios";
import type { NewSpace } from "../../types/NewSpaceType";

export const fetchNewSpaces = async (): Promise<NewSpace[]> => {
  const res = await axios.get("/api/spaces/new");
  return res.data.data;
};
