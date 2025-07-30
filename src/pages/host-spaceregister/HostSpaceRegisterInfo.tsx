import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../../utils/zod/zodValidation";
import { cancel_dark, error, camera, underArrow } from "../../assets/theme";
import PageHeader from "../../components/header/PageHeader";
import DaumPostcode from "react-daum-postcode";
import { registerSpace } from "../../api/space/space.ts";
import type { HostSpaceInfo } from "../../types/HostSpaceInfo.ts";
import { z } from "zod";
import { useEffect } from "react";

const HostSpaceRegisterInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onValid = (data: HostSpaceInfo) => {
    console.log("제출된 데이터:", data);
  };

  interface AddressData {
    address: string;
  }

  const handleComplete = (data: AddressData) => {
    const fullAddress = data.address;
    setValue("address", fullAddress);
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress || "";

  const [images, setImages] = useState<File[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const spaceCategory = location.state?.spaceCategory || "";

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  const purposeList = [
    { value: "MEETING", label: "미팅" },
    { value: "COOKING", label: "쿠킹" },
    { value: "BARISTA", label: "바리스타" },
    { value: "FLEA_MARKET", label: "플리마켓" },
    { value: "FILMING", label: "촬영" },
    { value: "ETC", label: "기타" },
  ] as const;

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  type HostSpaceInfoType = z.infer<typeof zodHostSpaceInfo>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<HostSpaceInfoType>({
    resolver: zodResolver(zodHostSpaceInfo),
    mode: "onChange",
    defaultValues: {
      address: selectedAddress,
      spaceCategory: spaceCategory,
    },
  });

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  useEffect(() => {
    console.log("폼 에러 상태:", errors);
  }, [errors]);

  const imageUrls = images.map((img) => URL.createObjectURL(img));
  const thumbnailUrl = imageUrls[0] || "";

  const accessToken = localStorage.getItem("accessToken") || "";

  const onValidSubmit = async (data: HostSpaceInfo) => {
    if (images.length === 0) {
      alert("공간 사진을 하나 이상 업로드해주세요.");
      return;
    }

    try {
      const requestBody = {
        name: data.name,
        spaceCategory: data.spaceCategory, // 만약 선택한 카테고리가 있다면
        useCategory: data.useCategory,
        maxCapacity: Number(data.maxCapacity),
        address: data.address,
        detailAddress: data.detailAddress,
        pricePerHour: Number(data.pricePerHour),
        thumbnailUrl: thumbnailUrl, // 업로드된 이미지 URL을 여기에
        description: data.description, // 단순한 문자열
        priceGuide: data.priceGuide,
        facilityNotice: data.facilityNotice,
        notice: data.notice,
        locationDescription: data.locationDescription,
        refundPolicy: data.refundPolicy,
        // websiteUrl: data.websiteUrl, // 필요에 따라 추가
        tags: tags,
        imageUrls: imageUrls, // 서버에 업로드된 이미지 URL 리스트
      };

      console.log("서버에 전송할 데이터:", requestBody); // 이 부분 추가

      const res = await registerSpace(requestBody, accessToken);
      alert(`공간이 등록되었습니다. ID: ${res.id}`);
      navigate("/spacelist");
    } catch (err) {
      alert("공간 등록에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-[100px] relative">
      {/* Header */}
      <PageHeader backTo="/hostspaceregister">공간 등록</PageHeader>

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
            {...register("name")}
            placeholder="공간명을 입력해주세요"
            className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] 
              ${
                errors.name
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
            maxLength={30}
          />
          {errors.name && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.name.message}
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
              {...register("useCategory")}
              className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] pr-[4rem] text-[1.5rem] bg-[#F2F3F6] text-black appearance-none
        ${
          errors.useCategory
            ? "border border-[#FF3B30]"
            : "border border-transparent"
        }`}
              value={selectedPurpose}
              onChange={(e) => {
                const value = e.target.value as
                  | "MEETING"
                  | "COOKING"
                  | "BARISTA"
                  | "FLEA_MARKET"
                  | "FILMING"
                  | "ETC";
                setSelectedPurpose(value);
                setValue("useCategory", value);
              }}
            >
              <option value="" disabled hidden>
                카테고리를 선택해주세요
              </option>
              {purposeList.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>

            {/* 화살표 아이콘 */}
            <img
              src={underArrow}
              alt="화살표 아이콘"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          {errors.useCategory && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.useCategory.message}
              </p>
            </div>
          )}
        </div>

        {/* 수용 인원 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            수용 인원<span className="text-[#FF3B30]">*</span>
          </label>

          {/* 숨겨진 input: register 연결 */}
          <input
            type="hidden"
            {...register("maxCapacity", {
              required: "수용 인원을 설정해주세요.",
              valueAsNumber: true,
            })}
          />

          <div className="flex items-center justify-between">
            <span className="text-[1.5rem] font-bold text-black">
              최대 {watch("maxCapacity") || 1} 인 수용 가능
            </span>

            <div className="flex items-center gap-[1.2rem] bg-[#F2F3F6] rounded-[1rem] px-[0.8rem] py-[0.4rem]">
              <button
                type="button"
                className="w-[3.2rem] h-[3.2rem] text-[2rem] text-[#868686] flex items-center justify-center"
                onClick={() =>
                  setValue(
                    "maxCapacity",
                    Math.max(1, (watch("maxCapacity") || 1) - 1),
                    { shouldValidate: true } // 유효성 검사를 다시 트리거
                  )
                }
              >
                –
              </button>

              <div className="w-[4.8rem] h-[3.2rem] bg-white rounded-[0.8rem] flex items-center justify-center">
                <span className="text-[1.5rem] text-black font-medium">
                  {watch("maxCapacity") || 1}
                </span>
              </div>

              <button
                type="button"
                className="w-[3.2rem] h-[3.2rem] text-[2rem] text-[#868686] flex items-center justify-center"
                onClick={() =>
                  setValue("maxCapacity", (watch("maxCapacity") || 1) + 1, {
                    shouldValidate: true,
                  })
                }
              >
                +
              </button>
            </div>
          </div>

          {errors.maxCapacity && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.maxCapacity.message}
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
              {...register("pricePerHour", { valueAsNumber: true })}
              placeholder="시간당 가격을 입력해주세요"
              type="number"
              min={0}
              step={1000}
              className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] ${
                errors.pricePerHour
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
            />
            <span className="text-[1.5rem] text-[#868686] whitespace-nowrap">
              원/시간
            </span>
          </div>
          {errors.pricePerHour && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.pricePerHour.message}
              </p>
            </div>
          )}
        </div>

        {/* 기타 가격 안내 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            기타 가격 안내
          </label>
          <textarea
            {...register("priceGuide")}
            placeholder="ex) 인원 추가시 5000원 추가"
            maxLength={500}
            className="w-full min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none"
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("priceGuide")?.length || 0}/500자
          </div>
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
              className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] 
                ${
                  errors.address
                    ? "border border-[#FF3B30]"
                    : "border border-transparent"
                }`}
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
            {...register("detailAddress")}
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
              onClick={() => setIsModalOpen(false)} // 바깥 클릭 시 닫힘
            >
              <div
                className="bg-white rounded-[1rem] p-[2rem] w-[90%] max-w-[600px] relative"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
              >
                <DaumPostcode
                  onComplete={handleComplete}
                  style={{
                    width: "100%",
                    height: "400px",
                    border: "1px solid #E0E0E0",
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
            {...register("locationDescription")}
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
            className={`w-full min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none
              ${
                errors.description
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
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
            {...register("facilityNotice")}
            placeholder="ex) 재활용 쓰레기 구비 되어있습니다"
            maxLength={500}
            className="w-full min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none"
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("facilityNotice")?.length || 0}/500자
          </div>
        </div>

        {/* 주의 사항 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-[1.5rem] font-medium text-black">
            주의 사항<span className="text-[#FF3B30]">*</span>
          </label>
          <textarea
            {...register("notice")}
            placeholder="ex) 사용 후 청소 부탁드립니다"
            maxLength={500}
            className={`w-full min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none
              ${
                errors.notice
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("notice")?.length || 0}/500자
          </div>
          {errors.notice && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.notice.message}
              </p>
            </div>
          )}
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
            className={`w-full min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-[1.5rem] bg-[#F2F3F6] placeholder:text-[#B0B0B0] resize-none
              ${
                errors.refundPolicy
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
          />
          <div className="text-right text-[1.2rem] text-[#B0B0B0]">
            {watch("refundPolicy")?.length || 0}/500자
          </div>
          {errors.refundPolicy && (
            <div className="flex items-center gap-[0.4rem] mt-[0.2rem]">
              <img src={error} alt="에러 아이콘" className="w-4 h-4" />
              <p className="text-[#FF3B30] text-[1.3rem] mt-[0.2rem]">
                {errors.refundPolicy.message}
              </p>
            </div>
          )}
        </div>

        {/* 작성 완료 버튼 */}
        <button
          type="submit"
          className="w-full h-[5.6rem] mt-[2.4rem] bg-[#D9D9D9] text-[#868686] rounded-[1rem] text-[1.7rem] font-semibold"
        >
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default HostSpaceRegisterInfo;
