import axios from "axios";
import type { NearbySpace } from "../../types/map/NearbySpace";
import type { SimpleSpaceInfo } from "../../types/map/NearbySpace";

export const fetchNearbySpaces = async (lat: number, lng: number) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get<{ data: NearbySpace[] }>("/api/spaces/nearby", {
    params: { lat, lng },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const fetchSimpleSpaceInfo = async (spaceId: number) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get<{ data: SimpleSpaceInfo }>(
    `/api/space/${spaceId}/simple`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
