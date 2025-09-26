import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpace } from "../../api/space/updateSpace";

interface UpdateSpaceRequest {
  name: string;
  spaceCategory: string;
  useCategory: string;
  maxCapacity: number;
  address: string;
  detailAddress?: string;
  pricePerHour: number;
  description: string;
  priceGuide?: string;
  facilityNotice?: string;
  notice: string;
  locationDescription?: string;
  refundPolicy: string;
  websiteUrl?: string;
  tags: string[];
  imageUrls: string[];
}

export const useUpdateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      spaceId,
      data,
    }: {
      spaceId: number;
      data: UpdateSpaceRequest;
    }) => updateSpace(spaceId, data),
    onSuccess: () => {
      // 공간 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["mySpaceList"] });
      // 공간 상세 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["spaceDetail"] });
    },
  });
};
