import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { camera, cancel_dark } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface ImageUploadProps {
  register: UseFormRegister<HostSpaceInfo>;
  setValue: UseFormSetValue<HostSpaceInfo>;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_IMAGES = 10;

const ImageUpload = ({
  register,
  setValue,
  images,
  setImages,
}: ImageUploadProps) => {
  // RHF와 onChange 병합을 위한 레지스터
  const thumbReg = register("thumbnailUrl", { required: true });

  // 미리보기 URL (누수 방지)
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  const handleFilesAppend = (files: File[]) => {
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
      return;
    }
    const nextImages = [...images, ...files];
    setImages(nextImages);
    // RHF 값 동기화
    setValue("imageUrls", nextImages);
    if (nextImages[0]) {
      setValue("thumbnailUrl", nextImages[0]);
    }
  };

  const handleDelete = (index: number) => {
    const nextImages = images.filter((_, i) => i !== index);
    setImages(nextImages);
    setValue("imageUrls", nextImages);
    if (nextImages[0]) {
      setValue("thumbnailUrl", nextImages[0]);
    }
  };

  return (
    <div>
      <div
        className="flex gap-[0.8rem] overflow-x-auto py-[0.5rem] scrollbar-hide scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* 업로드 버튼 */}
        {images.length < MAX_IMAGES && (
          <label
            htmlFor="image-upload"
            className="text-14-Medium flex flex-col items-center justify-center w-[9rem] h-[9rem] bg-cr-100 rounded-[1rem] cursor-pointer text-cr-500 flex-shrink-0"
          >
            <img
              src={camera}
              alt="카메라 아이콘"
              className="w-[2.4rem] h-[2.4rem] mb-[0.4rem]"
            />
            {images.length}/{MAX_IMAGES}
          </label>
        )}

        {/* 이미지 미리보기 */}
        {images.map((_, idx) => (
          // 인덱스만 사용할때 쓰는 표준 관례라고 함
          <div
            key={idx}
            className="relative w-[9rem] h-[9rem] rounded-[1rem] flex-shrink-0"
          >
            <div className="w-full h-full rounded-[1rem] overflow-hidden">
              <img
                src={previews[idx]}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <div className="absolute bottom-[0.6rem] left-0 right-0 text-cr-white text-13-Medium text-center">
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
