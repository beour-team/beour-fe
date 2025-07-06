// src/api/space.ts
import axios from "axios";

export const registerSpace = async (spaceData: any) => {
  const response = await axios.post("/api/spaces", spaceData);
  return response.data;
};
