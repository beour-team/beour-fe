import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { camera, cancel_dark } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface ImageUploadProps {
  register: UseFormRegister<HostSpaceInfo>;
  setValue: UseFormSetValue<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

const ImageUpload = ({ register, setValue }: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div>
      <div
        className="flex gap-[0.8rem] overflow-x-auto py-[0.5rem] scrollbar-hide scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* 카메라 아이콘 / 업로드 버튼 */}
        {images.length < 10 && (
          <label
            htmlFor="image-upload"
            className="text-14-Medium flex flex-col items-center justify-center w-[9rem] h-[9rem] bg-cr-100 rounded-[1rem] cursor-pointer text-cr-500 flex-shrink-0"
          >
            <img
              src={camera}
              alt="카메라 아이콘"
              className="w-[2.4rem] h-[2.4rem] mb-[0.4rem]"
            />
            {images.length}/10
          </label>
        )}

        {/* 이미지 미리보기 */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-[9rem] h-[9rem] rounded-[1rem] flex-shrink-0"
          >
            <div className="w-full h-full rounded-[1rem] overflow-hidden">
              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover"
              />

              {/* 대표 사진 라벨 */}
              {idx === 0 && (
                <div className="absolute bottom-[0.6rem] left-0 right-0 text-cr-white text-13-Medium text-center ">
                  대표 사진
                </div>
              )}
            </div>

            {/* 삭제 아이콘 */}
            <img
              src={cancel_dark}
              alt="삭제 아이콘"
              className="w-[2rem] h-[2rem] absolute -top-[0.6rem] -right-[0.8rem] z-10 rounded-full cursor-pointer border border-cr-white"
              onClick={() => handleDelete(idx)}
            />
          </div>
        ))}
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        {...register("thumbnailUrl", {
          required: true,
        })}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (images.length + files.length > 10) {
            alert("최대 10장까지 업로드할 수 있습니다.");
            return;
          }
          const nextImages = [...images, ...files];
          setImages(nextImages);

          setValue("imageUrls", nextImages);
          setValue("thumbnailUrl", nextImages[0] || "");
        }}
      />
    </div>
  );
};

export default ImageUpload;
