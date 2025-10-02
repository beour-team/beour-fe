import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { camera, cancel_dark } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface ImageUploadProps {
  register: UseFormRegister<HostSpaceInfo>;
  setValue: UseFormSetValue<HostSpaceInfo>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  existingImageUrls?: string[]; // 기존 이미지 URL들
  thumbnailUrl?: string; // 썸네일 이미지 URL
}

const MAX_IMAGES = 10;

const ImageUpload = ({
  register,
  setValue,
  images,
  setImages,
  existingImageUrls = [],
  thumbnailUrl,
}: ImageUploadProps) => {
  // RHF와 onChange 병합을 위한 레지스터
  const thumbReg = register("thumbnailUrl", { required: true });

  // 미리보기 URL (누수 방지)
  const [previews, setPreviews] = useState<string[]>([]);

  // 썸네일 이미지와 기존 이미지 URL들, 새로 업로드된 이미지 URL들을 합쳐서 표시
  useEffect(() => {
    const newImageUrls = images.map((f) => URL.createObjectURL(f));

    // images 배열의 File 객체들만 사용 (existingImageUrls는 사용하지 않음)
    const allPreviews = newImageUrls;

    setPreviews(allPreviews);
    return () => {
      newImageUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  const handleFilesAppend = (files: File[]) => {
    const currentTotal = images.length;

    if (currentTotal + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
      return;
    }

    const nextImages = [...images, ...files];
    setImages(nextImages);
    setValue("imageUrls", nextImages);

    // 기존 썸네일이 있으면 유지, 없으면 첫 번째 새 이미지를 썸네일로 설정
    if (thumbnailUrl && !existingImageUrls.includes(thumbnailUrl)) {
      // 기존 썸네일이 있으면 그대로 유지
      console.log("기존 썸네일 유지:", thumbnailUrl);
    } else if (nextImages[0]) {
      // 기존 썸네일이 없으면 첫 번째 새 이미지를 썸네일로 설정
      setValue("thumbnailUrl", nextImages[0]);
      console.log("새 썸네일 설정:", nextImages[0].name);
    }
  };

  const handleDelete = (index: number) => {
    console.log(`이미지 삭제 요청: 인덱스 ${index}`);

    // images 배열에서 해당 인덱스의 이미지를 삭제
    const nextImages = images.filter((_, i) => i !== index);
    setImages(nextImages);
    setValue("imageUrls", nextImages);

    // 첫 번째 이미지가 썸네일이면 유지
    if (nextImages[0]) {
      setValue("thumbnailUrl", nextImages[0]);
      console.log("새 썸네일 설정:", nextImages[0].name);
    } else {
      // 이미지가 없으면 더미 썸네일 설정
      const dummyThumbnail = new File([], "dummy-thumbnail.jpg");
      setValue("thumbnailUrl", dummyThumbnail);
      console.log("더미 썸네일 설정");
    }

    console.log("삭제 후 이미지 개수:", nextImages.length);
  };

  return (
    <div>
      <div
        className="flex gap-[0.8rem] overflow-x-auto py-[0.5rem] scrollbar-hide scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* 업로드 버튼 */}
        {previews.length < MAX_IMAGES && (
          <label
            htmlFor="image-upload"
            className="text-14-Medium flex flex-col items-center justify-center w-[9rem] h-[9rem] bg-cr-100 rounded-[1rem] cursor-pointer text-cr-500 flex-shrink-0"
          >
            <img
              src={camera}
              alt="카메라 아이콘"
              className="w-[2.4rem] h-[2.4rem] mb-[0.4rem]"
            />
            {previews.length}/{MAX_IMAGES}
          </label>
        )}

        {/* 이미지 미리보기 */}
        {previews.map((preview, idx) => (
          // 인덱스만 사용할때 쓰는 표준 관례라고 함
          <div
            key={idx}
            className="relative w-[9rem] h-[9rem] rounded-[1rem] flex-shrink-0"
          >
            <div className="w-full h-full rounded-[1rem] overflow-hidden">
              <img
                src={preview}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <div className="absolute bottom-[0.6rem] left-0 right-0 text-cr-white text-13-Medium text-center bg-black bg-opacity-50 py-[0.2rem] rounded-[0.4rem]">
                  대표 사진
                </div>
              )}
            </div>

            <img
              src={cancel_dark}
              alt="삭제 아이콘"
              className="w-[2rem] h-[2rem] absolute -top-[0.6rem] -right-[0.8rem] z-10 rounded-full cursor-pointer border border-cr-white"
              onClick={() => handleDelete(idx)}
            />
          </div>
        ))}
      </div>

      {/* 파일 입력 - RHF onChange와 병합 */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        {...thumbReg}
        onChange={(e) => {
          // RHF 이벤트 유지
          thumbReg.onChange(e);

          const files = Array.from(e.target.files ?? []);
          // (가공 파일 생성이 있다면 여기서 type 지정 필요)
          handleFilesAppend(files);
        }}
      />
    </div>
  );
};

export default ImageUpload;
