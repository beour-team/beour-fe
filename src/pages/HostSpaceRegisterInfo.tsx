import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../utils/zod/zodValidation";
import { cancel_dark, error } from "../assets/theme";

const HostSpaceRegisterInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress || "";

  const [images, setImages] = useState<File[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const purposeList = ["단체 모임", "요리 연습", "바리스타 실습", "홈파티"];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<HostSpaceInfo>({
    resolver: zodResolver(zodHostSpaceInfo),
    mode: "onChange",
    defaultValues: {
      address: selectedAddress,
    },
  });

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onValidSubmit = (data: HostSpaceInfo) => {
    if (images.length === 0) {
      alert("공간 사진을 하나 이상 업로드해주세요.");
      return;
    }

    console.log("제출 데이터:", {
      ...data,
      images,
    });

    // 실제 제출 로직 여기에 작성
    alert("공간 정보가 제출되었습니다.");
    navigate("/hostspaceregister/complete");
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-[100px] relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/hostspaceregister")} className="p-1">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">공간 등록</h1>
      </div>

      <h2 className="text-xl font-bold mt-8">공간 정보를</h2>
      <h2 className="text-xl font-bold mb-8">입력해주세요.</h2>

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onValidSubmit)}
      >
        {/* 이미지 업로드 */}
        <div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative flex-none w-24 h-24 rounded-md overflow-hidden border"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 cursor-pointer">
                  <img
                    src={cancel_dark}
                    alt="삭제 아이콘"
                    className="w-4 h-4"
                    onClick={() => handleDelete(idx)}
                  />
                </div>
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs text-center py-0.5">
                    대표 사진
                  </div>
                )}
              </div>
            ))}

            {images.length < 10 && (
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-24 h-24 flex-none bg-[#F2F3F6] rounded-md cursor-pointer border text-gray-400"
              >
                📷 {images.length}/10
              </label>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (images.length + files.length > 10) {
                alert("최대 10장까지 업로드할 수 있습니다.");
                return;
              }
              setImages([...images, ...files]);
            }}
          />
        </div>

        {/* 공간명 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            공간명<span className="text-[#FF3B30]">*</span>
          </label>
          <input
            {...register("spaceName")}
            placeholder="공간명을 입력해주세요"
            className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] 
              ${errors.spaceName ? "border border-[#FF3B30]" : "border border-transparent"}`}
            maxLength={30}
          />
          {errors.spaceName && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
            <img
            src={error}
            alt="에러 아이콘"
            className="w-4 h-4"
          />
            <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">{errors.spaceName.message}</p>
            </div>
          )}
        </div>

        {/* 사용 용도 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            사용 용도
          </label>
          <select
            {...register("purpose")}
            className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] text-[#B0B0B0]"
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
          >
            <option value="">카테고리를 선택해주세요</option>
            {purposeList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
            <img
            src={error}
            alt="에러 아이콘"
            className="w-4 h-4"
          />
            <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">{errors.purpose.message}</p>
            </div>
          )}
        </div>

        {/* 수용 인원 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            수용 인원
          </label>
          <div className="flex items-center gap-[1.2rem]">
            <span className="text-[1.5rem] text-[#868686]">최대</span>
            <div className="flex items-center bg-[#F2F3F6] rounded-[1rem] px-[1.2rem]">
              <button
                type="button"
                className="w-[2.8rem] h-[2.8rem] rounded-full bg-[#E4E6EB] text-[2rem] text-[#B0B0B0] flex items-center justify-center"
                onClick={() =>
                  setValue(
                    "spaceCapacity",
                    Math.max(1, (watch("spaceCapacity") || 1) - 1)
                  )
                }
              >
                -
              </button>
              <span className="mx-[1.2rem] text-[1.5rem]">
                {watch("spaceCapacity") || 1}
              </span>
              <button
                type="button"
                className="w-[2.8rem] h-[2.8rem] rounded-full bg-[#E4E6EB] text-[2rem] text-[#B0B0B0] flex items-center justify-center"
                onClick={() =>
                  setValue("spaceCapacity", (watch("spaceCapacity") || 1) + 1)
                }
              >
                +
              </button>
            </div>
            <span className="text-[1.5rem] text-[#868686]">인 수용 가능</span>
          </div>
          {errors.spaceCapacity && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
            <img
            src={error}
            alt="에러 아이콘"
            className="w-4 h-4"
          />
            <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">{errors.spaceCapacity.message}</p>
            </div>
          )}
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            가격<span className="text-[#FF3B30]">*</span>
          </label>
          <div className="flex items-center gap-[0.8rem]">
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="시간당 가격을 입력해주세요"
              className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0]"
            />
            <span className="text-[1.5rem] text-[#868686]">원/시간</span>
          </div>
          {errors.price && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
            <img
            src={error}
            alt="에러 아이콘"
            className="w-4 h-4"
          />
            <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">{errors.price.message}</p>
            </div>
          )}
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            주소<span className="text-[#FF3B30]">*</span>
          </label>
          <div className="flex gap-[0.8rem]">
            <input
              {...register("address")}
              placeholder="주소를 입력해주세요"
              className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0]"
              readOnly
            />
            <button
              type="button"
              className="h-[5.6rem] px-[2.4rem] bg-black text-white rounded-[1rem] text-[1.5rem] font-semibold"
              onClick={() => {
                /* 주소 검색 모달 등 */
              }}
            >
              주소 검색
            </button>
          </div>
          <input
            {...register("addressDetail")}
            placeholder="상세 주소를 입력해주세요"
            className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] mt-[0.8rem]"
          />
          {errors.address && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
            <img
            src={error}
            alt="에러 아이콘"
            className="w-4 h-4"
          />
            <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">{errors.address.message}</p>
            </div>
          )}
        </div>

        {/* 위치 정보 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            위치 정보
          </label>
          <input
            {...register("locationInfo")}
            placeholder="위치 정보를 입력해주세요 (ex. 강남역 4번 출구 도보 5분)"
            className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0]"
          />
        </div>

        {/* 공간 태그 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            공간 태그
          </label>
          <div className="flex gap-[0.8rem]">
            <input
              {...register("tags")}
              placeholder="태그를 추가해주세요"
              className="flex-1 h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0]"
            />
            <button
              type="button"
              className="h-[5.6rem] px-[2.4rem] bg-[#E4E6EB] text-[#868686] rounded-[1rem] text-[1.5rem] font-semibold"
              onClick={() => {
                /* 태그 추가 로직 */
              }}
            >
              태그 추가
            </button>
          </div>
        </div>

        {/* 공간 설명 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            공간 설명<span className="text-[#FF3B30]">*</span>
          </label>
          <textarea
            {...register("description")}
            placeholder="공간에 대한 설명을 자세하게 적어주세요 (ex. 공간 분위기, 구비 물품, 위치, 용도 등)"
            maxLength={2000}
            className="w-full min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none"
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("description")?.length || 0}/2000자
          </div>
          {errors.description && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
            <img
            src={error}
            alt="에러 아이콘"
            className="w-4 h-4"
          />
            <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">{errors.description.message}</p>
            </div>
          )}
        </div>

        {/* 공간 안내 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            공간 안내
          </label>
          <textarea
            {...register("notice")}
            placeholder="ex) 재활용 쓰레기 구비 되어있습니다"
            maxLength={500}
            className="w-full min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none"
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("notice")?.length || 0}/500자
          </div>
        </div>

        {/* 주의 사항 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            주의 사항
          </label>
          <textarea
            {...register("caution")}
            placeholder="ex) 사용 후 청소 부탁드립니다"
            maxLength={500}
            className="w-full min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none"
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("caution")?.length || 0}/500자
          </div>
        </div>

        {/* 환불 정책 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            환불 정책
          </label>
          <textarea
            {...register("refundPolicy")}
            placeholder="ex) 예약일 1일 전까지 전액 환불"
            maxLength={500}
            className="w-full min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none"
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("refundPolicy")?.length || 0}/500자
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <button
          type="submit"
          className="w-full h-[5.6rem] mt-[2.4rem] bg-[#D9D9D9] text-[#868686] rounded-[1rem] text-[1.7rem] font-semibold"
          disabled={!isValid}
        >
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default HostSpaceRegisterInfo;
