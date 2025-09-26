import { api } from "../api";

interface UploadImagesRequest {
  images: File[];
}

interface UploadImagesResponse {
  code: number;
  httpStatus: string;
  data: {
    imageUrls: string[];
  };
}

export const uploadImages = async (
  spaceId: number,
  images: File[]
): Promise<string[]> => {
  console.log("=== uploadImages API 호출 ===");
  console.log("spaceId:", spaceId);
  console.log("업로드할 이미지 개수:", images.length);

  const formData = new FormData();

  // 이미지 파일들 추가
  images.forEach((file, index) => {
    formData.append("images", file);
    console.log(`이미지 ${index + 1}:`, file.name, file.type, file.size);
  });

  // FormData 내용 확인
  console.log("FormData 키들:", Array.from(formData.keys()));

  const response = await api.post<UploadImagesResponse>(
    `/api/spaces/${spaceId}/images`,
    formData
  );

  console.log("업로드된 이미지 URL들:", response.data.data.imageUrls);
  return response.data.data.imageUrls;
};
