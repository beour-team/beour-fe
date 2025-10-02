import { api } from "../api";

interface UpdateSpaceRequest {
  name: string;
  address: string;
  detailAddress?: string;
  pricePerHour: number;
  maxCapacity: number;
  spaceCategory: string;
  useCategory: string;
  description: string;
  priceGuide?: string;
  facilityNotice?: string;
  notice: string;
  locationDescription?: string;
  refundPolicy: string;
  websiteUrl?: string;
  tags: string[];
  imageUrls: string[];
  newImages?: File[]; // 새로 추가된 이미지 파일들
}

interface UpdateSpaceResponse {
  code: number;
  httpStatus: string;
  data: string;
}

export const updateSpace = async (
  spaceId: number,
  data: UpdateSpaceRequest
): Promise<UpdateSpaceResponse> => {
  // JSON 데이터 준비 (이미지를 제외한 모든 필드)
  const jsonData = {
    name: data.name,
    address: data.address,
    detailAddress: data.detailAddress || "",
    pricePerHour: data.pricePerHour,
    maxCapacity: data.maxCapacity,
    spaceCategory: data.spaceCategory,
    useCategory: data.useCategory,
    description: data.description,
    priceGuide: data.priceGuide || "",
    facilityNotice: data.facilityNotice || "",
    notice: data.notice,
    locationDescription: data.locationDescription || "",
    refundPolicy: data.refundPolicy,
    websiteUrl: data.websiteUrl || "",
    tags: data.tags,
    imageUrls: data.imageUrls, // 기존 이미지 URL들
  };

  // FormData 사용 (multipart/form-data)
  const formData = new FormData();

  // space 키에 JSON 데이터를 Blob으로 추가 (type: application/json)
  const spaceBlob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
  });
  formData.append("space", spaceBlob, "space.json");

  // 새로 추가된 이미지 파일들 추가
  if (data.newImages && data.newImages.length > 0) {
    console.log("새 이미지 파일들을 FormData에 추가 중...");

    // 공간 등록과 동일한 방식 사용
    if (data.newImages.length > 0) {
      // 첫 번째 이미지를 thumbnailFile로 추가
      formData.append("thumbnailFile", data.newImages[0]);

      // 나머지 이미지들을 imageFiles로 추가
      if (data.newImages.length > 1) {
        const remainingImages = data.newImages.slice(1);

        // 각 이미지를 개별적으로 추가
        remainingImages.forEach((image) => {
          formData.append("imageFiles", image);
        });
      }
    }
  }

  // multipart/form-data로 전송 (Content-Type은 자동 설정됨)
  const response = await api.put<UpdateSpaceResponse>(
    `/api/spaces/${spaceId}`,
    formData
  );

  return response.data;
};
