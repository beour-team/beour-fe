import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../utils/zod/zodValidation";
import { cancel_dark, error, camera } from "../assets/theme";
import PageHeader from "../components/header/PageHeader";
import DaumPostcode from "react-daum-postcode";

const HostSpaceRegisterInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (data) => {
    const fullAddress = data.address;
    setValue("address", fullAddress);
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress || "";
  // 예시: maxCapacity는 외부에서 props로 오거나 state에 저장된 값
  const maxCapacity = 11;

  const [images, setImages] = useState<File[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const purposeList = ["단체 모임", "요리 연습", "바리스타 실습", "홈파티"];

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

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
      <PageHeader>공간 등록</PageHeader>

      <h2 className="text-24-Bold font-bold mt-8">공간 정보를</h2>
      <br></br>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-24-Bold font-bold">입력해주세요.</h2>
        <span className="text-12 text-cr-red whitespace-nowrap">
          * 필수입력
        </span>
      </div>

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onValidSubmit)}
      >
        <div>
          <div className="flex gap-2 overflow-x-auto">
            {/* 카메라 아이콘 / 업로드 버튼 */}
            {images.length < 10 && (
              <label
                htmlFor="image-upload"
                className="text-14-Medium flex flex-col items-center justify-center w-24 h-24 flex-none bg-[#F2F3F6] rounded-md cursor-pointer border text-gray-400"
              >
                <img
                  src={camera}
                  alt="카메라 아이콘"
                  className="w-8 h-8 mb-1"
                />
                {images.length}/10
              </label>
            )}

            {/* 이미지 미리보기 */}
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

                {/* 삭제 아이콘 */}
                <img
                  src={cancel_dark}
                  alt="삭제 아이콘"
                  className="w-5 h-5 absolute top-1 right-1 bg-opacity-60 rounded-full p-[2px] cursor-pointer"
                  onClick={() => handleDelete(idx)}
                />

                {/* 대표 사진 라벨 */}
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs text-center py-0.5">
                    대표 사진
                  </div>
                )}
              </div>
            ))}
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
              ${
                errors.spaceName
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
            maxLength={30}
          />
          {errors.spaceName && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.spaceName.message}
              </p>
            </div>
          )}
        </div>

        {/* 사용 용도 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            사용 용도
          </label>

          <div className="relative w-full">
            <select
              {...register("purpose")}
              className="
        w-full 
        h-[5.6rem] 
        rounded-[1rem] 
        px-[1.7rem] 
        pr-[4rem]  /* 화살표 공간 확보 */
        text-[1.5rem] 
        bg-[#F2F3F6] 
        text-black 
        appearance-none
      "
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요
              </option>
              {purposeList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* 화살표 아이콘 */}
            <svg
              className="w-4 h-4 absolute right-[1.7rem] top-1/2 transform -translate-y-1/2 pointer-events-none text-[#B0B0B0]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {errors.purpose && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.purpose.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            수용 인원<span className="text-[#FF3B30]">*</span>
          </label>

          <div className="flex items-center justify-between">
            <span className="text-[1.5rem] font-bold text-black">
              최대 {watch("spaceCapacity") || 1} 인 수용 가능
            </span>

            <div className="flex items-center gap-[1.2rem] bg-[#F2F3F6] rounded-[1rem] px-[0.8rem] py-[0.4rem]">
              <button
                type="button"
                className="w-[3.2rem] h-[3.2rem] text-[2rem] text-[#868686] flex items-center justify-center"
                onClick={() =>
                  setValue(
                    "spaceCapacity",
                    Math.max(1, (watch("spaceCapacity") || 1) - 1)
                  )
                }
              >
                –
              </button>

              <div className="w-[4.8rem] h-[3.2rem] bg-white rounded-[0.8rem] flex items-center justify-center">
                <span className="text-[1.5rem] text-black font-medium">
                  {watch("spaceCapacity") || 1}
                </span>
              </div>

              <button
                type="button"
                className="w-[3.2rem] h-[3.2rem] text-[2rem] text-[#868686] flex items-center justify-center"
                onClick={() =>
                  setValue("spaceCapacity", (watch("spaceCapacity") || 1) + 1)
                }
              >
                +
              </button>
            </div>
          </div>

          {errors.spaceCapacity && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.spaceCapacity.message}
              </p>
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
              placeholder="시간당 가격을 입력해주세요"
              type="number"
              min={0}
              step={1000}
              className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] ${
                errors.price
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
            />
            <span className="text-[1.5rem] text-[#868686] whitespace-nowrap">
              원/시간
            </span>
          </div>
          {errors.price && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.price.message}
              </p>
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
              className="h-[5.6rem] px-[2.4rem] bg-black text-white rounded-[1rem] text-[1.5rem] font-semibold whitespace-nowrap"
              onClick={() => {
                setIsModalOpen(true);
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
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.address.message}
              </p>
            </div>
          )}

          {/* 모달 영역 */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white rounded-[1rem] p-[2rem] w-[90%] max-w-[600px] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-[1rem] right-[1rem] text-[2rem] font-bold"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>

                {/* 서치바 추가 */}
                <div className="mb-[1.5rem]">
                  <Searchbar onSearch={(val) => console.log("검색어:", val)} />
                </div>

                {/* 실제 다음 주소 API */}
                <DaumPostcode
                  onComplete={handleComplete}
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "1rem",
                  }}
                />
              </div>
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

          {/* 입력창 + 추가 버튼 */}
          <div className="flex gap-[0.8rem]">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 추가해주세요"
              className="flex-1 h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className={`h-[5.6rem] px-[2.4rem] rounded-[1rem] text-[1.5rem] font-semibold whitespace-nowrap
    ${tagInput.trim() ? "bg-black text-white" : "bg-[#E4E6EB] text-[#868686]"}`}
            >
              태그 추가
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-[0.8rem] mt-[1rem]">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="bg-cr-500 text-white rounded-full px-[1.6rem] py-[0.9rem] text-[1.3rem] relative"
              >
                {tag}
                <img
                  src={cancel_dark}
                  alt="삭제 아이콘"
                  className="w-[2rem] h-[2rem] cursor-pointer absolute -top-[0.4rem] -right-[0.4rem] rounded-full p-[0.2rem]"
                  onClick={() => handleRemoveTag(tag)}
                />
              </div>
            ))}
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
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.description.message}
              </p>
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
            주의 사항<span className="text-[#FF3B30]">*</span>
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
            환불 정책<span className="text-[#FF3B30]">*</span>
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
