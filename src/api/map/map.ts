import axios from "axios";
import type { NearbySpace } from "../../types/map/NearbySpace";
import type { SimpleSpaceInfo } from "../../types/map/NearbySpace";
import { API_SPACES_NEARBY } from "../../constants/endpoint/endpoint";

export const fetchNearbySpaces = async (lat: number, lng: number) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get<{ data: NearbySpace[] }>(API_SPACES_NEARBY, {
    params: { lat, lng },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const fetchSimpleSpaceInfo = async (spaceId: number) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get<{ data: SimpleSpaceInfo }>(
    `/api/spaces/${spaceId}/simple`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
