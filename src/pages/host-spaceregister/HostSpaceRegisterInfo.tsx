import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../../utils/zod/zodValidation";
import {
  cancel_dark,
  camera,
  underArrow,
  warning,
  topArrow,
} from "../../assets/theme";
import PageHeader from "../../components/header/PageHeader";
import DaumPostcode from "react-daum-postcode";
// import { registerSpace } from "../../api/space/space.ts";
import type { HostSpaceInfo } from "../../types/HostSpaceInfo.ts";
import { z } from "zod";

const HostSpaceRegisterInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 드롭다운 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const [images, setImages] = useState<File[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
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
    formState: { errors },
  } = useForm<HostSpaceInfoType>({
    resolver: zodResolver(zodHostSpaceInfo),
    mode: "onChange",
  });

  const isFormValid = Object.keys(errors).length === 0;

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    console.log("폼 에러 상태:", errors);
  }, [errors]);

  useEffect(() => {
    console.log("선택된 spaceCategory:", spaceCategory);
  }, [spaceCategory]);

  useEffect(() => {
    if (spaceCategory) {
      setValue("spaceCategory", spaceCategory);
    }
  }, [spaceCategory, setValue]);

  // const accessToken = localStorage.getItem("accessToken") || "";

  const onValidSubmit = async (data: HostSpaceInfo) => {
    if (images.length === 0) {
      alert("공간 사진을 하나 이상 업로드해주세요.");
      return;
    }

    try {
      const formData = new FormData(); // ✅ 빈 FormData로 생성

      // 텍스트 필드
      formData.append("name", data.name);
      formData.append("spaceCategory", spaceCategory);
      formData.append("useCategory", data.useCategory);
      formData.append("maxCapacity", String(data.maxCapacity));
      formData.append("address", data.address);
      formData.append("detailAddress", String(data.detailAddress));
      formData.append("pricePerHour", String(data.pricePerHour));
      formData.append("description", data.description);
      formData.append("priceGuide", String(data.priceGuide));
      formData.append("facilityNotice", String(data.facilityNotice));
      formData.append("notice", data.notice);
      formData.append("locationDescription", String(data.locationDescription));
      formData.append("refundPolicy", data.refundPolicy);
      formData.append("tags", JSON.stringify(tags));

      // 이미지 파일들
      images.forEach((file) => {
        formData.append("imagesUrls", file); // 서버에서 images[]로 받도록 하면 여러 개 전송 가능
      });
      formData.append("thumbnailUrl", images[0]); // 첫번째 이미지를 대표 썸네일로 지정

      // const res = await registerSpace(formData); // ✅ FormData 넘김

      alert(`공간이 등록되었습니다. `);
      navigate("/hostmain");
    } catch (err) {
      alert("공간 등록에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-cr-white px-[2rem] relative">
      {/* Header */}
      <PageHeader backTo="/hostspaceregister">공간 등록</PageHeader>

      <div className="flex justify-between items-end mb-12">
        <h2 className="text-24-Bold leading-[3.5rem]">
          공간 정보를
          <br />
          입력해주세요.
        </h2>
        <span className="text-12-Regular text-cr-red mb-[0.6rem]">
          *필수입력
        </span>
      </div>

      <form
        className="flex flex-col gap-[1.6rem]"
        onSubmit={handleSubmit(onValidSubmit)}
      >
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

              // 🟡 useForm에 실제 string url/filename 혹은 file 객체 배열로 넘겨주기
              setValue("imageUrls", nextImages); // file 객체 배열로 보낼 경우 zod도 맞게 수정 필요
              setValue("thumbnailUrl", nextImages[0] || ""); // 첫번째 이미지를 대표 썸네일로 지정
            }}
          />
        </div>

        {/* 공간명 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            공간명<span className="text-cr-red">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="공간명을 입력해주세요"
            className={`w-full h-[5rem] rounded-[1rem] px-[1.8rem] text-14-Medium bg-cr-100 placeholder:text-cr-500
              ${
                errors.name
                  ? "border border-[#FF3B30]"
                  : "border border-transparent"
              }`}
            maxLength={30}
          />
          {errors.name && (
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.name.message}
              </span>
            </div>
          )}
        </div>

        {/* 사용 용도 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            사용 용도<span className="text-cr-red">*</span>
          </label>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className={`flex justify-between items-center w-full h-[5.6rem] bg-cr-100 rounded-[1rem] text-14-Medium text-left px-[1.7rem] ${
                selectedPurpose ? "text-cr-black" : "text-cr-500"
              } ${errors.useCategory ? "border-2 border-red-500" : ""}`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <span>
                {selectedPurpose
                  ? purposeList.find((p) => p.value === selectedPurpose)?.label
                  : "카테고리를 선택해주세요"}
              </span>
              <img src={isDropdownOpen ? topArrow : underArrow} alt="화살표" />
            </button>

            {isDropdownOpen && (
              <ul className="z-10 bg-cr-white absolute mt-[0.8rem] w-full border-cr-300 border rounded-[1rem] px-[1.6rem] py-[1.2rem]">
                {purposeList.map((purpose) => (
                  <li
                    key={purpose.value}
                    onClick={() => {
                      setSelectedPurpose(purpose.value);
                      setValue("useCategory", purpose.value);
                      setIsDropdownOpen(false);
                    }}
                    className="h-[3rem] text-14-Medium flex items-center cursor-pointer hover:bg-cr-100 rounded-[0.5rem] px-[0.5rem]"
                  >
                    {purpose.label}
                  </li>
                ))}
              </ul>
            )}

            <input
              type="hidden"
              value={selectedPurpose}
              {...register("useCategory")}
            />
          </div>

          {errors.useCategory && (
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.useCategory.message}
              </span>
            </div>
          )}
        </div>

        {/* 수용 인원 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            수용 인원<span className="text-cr-red">*</span>
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
            <span className="text-16-SemiBold text-cr-black whitespace-nowrap">
              최대 {watch("maxCapacity") || 1} 인 수용 가능
            </span>

            <div className="flex items-center gap-[1.2rem] bg-cr-100 rounded-[1rem] px-[0.8rem] py-[0.4rem]">
              <button
                type="button"
                className="w-[3.2rem] h-[3.2rem] text-20-Regular text-cr-600 flex items-center justify-center"
                onClick={() =>
                  setValue(
                    "maxCapacity",
                    Math.max(1, (watch("maxCapacity") || 1) - 1),
                    { shouldValidate: true }
                  )
                }
              >
                –
              </button>

              <div className="w-[4.8rem] h-[3.2rem] bg-cr-white rounded-[0.8rem] flex items-center justify-center">
                <span className="text-16-SemiBold text-cr-black font-medium">
                  {watch("maxCapacity") || 1}
                </span>
              </div>

              <button
                type="button"
                className="w-[3.2rem] h-[3.2rem] text-20-Regular text-cr-600 flex items-center justify-center"
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
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.maxCapacity.message}
              </span>
            </div>
          )}
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            가격<span className="text-cr-red">*</span>
          </label>
          <div className="flex items-center gap-[0.8rem]">
            <input
              {...register("pricePerHour", { valueAsNumber: true })}
              placeholder="시간당 가격을 입력해주세요"
              type="text"
              min={0}
              step={1000}
              className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 ${
                errors.pricePerHour
                  ? "border border-cr-red"
                  : "border border-transparent"
              }`}
            />
            <span className="text-14-SemiBold text-cr-black whitespace-nowrap">
              원/시간
            </span>
          </div>
          {errors.pricePerHour && (
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.pricePerHour.message}
              </span>
            </div>
          )}
        </div>

        {/* 기타 가격 안내 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">기타 가격 안내</label>
          <textarea
            {...register("priceGuide")}
            placeholder="ex) 인원 추가시 5000원 추가"
            maxLength={500}
            className="w-full min-h-[12rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none"
          />
          <div className="text-right text-12-Regular text-cr-500">
            {watch("priceGuide")?.length || 0}/500자
          </div>
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            주소<span className="text-cr-red">*</span>
          </label>
          <div className="flex gap-[0.8rem]">
            <input
              {...register("address")}
              placeholder="주소를 입력해주세요"
              className={`w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 
                ${
                  errors.address
                    ? "border border-cr-red"
                    : "border border-transparent"
                }`}
              readOnly
            />
            <button
              type="button"
              className="h-[5.6rem] px-[2.4rem] bg-cr-black text-cr-white rounded-[1rem] text-14-Medium whitespace-nowrap"
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
            className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 mt-[0.8rem]"
          />
          {errors.address && (
            <div className="flex gap-[0.6rem] items-center">
              <img src={warning} alt="경고 아이콘" />
              <span className="text-12-Medium text-red-500">
                {errors.address.message}
              </span>
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
          <label className="text-13-SemiBold">위치 정보</label>
          <input
            {...register("locationDescription")}
            placeholder="위치 정보를 입력해주세요 (ex. 강남역 4번 출구 도보 5분)"
            className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500"
          />
        </div>

        {/* 공간 태그 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">공간 태그</label>

          {/* 입력창 + 추가 버튼 */}
          <div className="flex gap-[0.8rem]">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그를 추가해주세요"
              className="flex-1 h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100 placeholder:text-cr-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className={`h-[5.6rem] px-[2.4rem] rounded-[1rem] text-14-Medium whitespace-nowrap
    ${tagInput.trim() ? "bg-cr-black text-cr-white" : "bg-cr-300 text-cr-600"}`}
            >
              태그 추가
            </button>
          </div>

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-[0.8rem] mt-[1rem]">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="bg-cr-500 text-cr-white rounded-full px-[1.6rem] py-[0.9rem] text-[1.3rem] relative"
              >
                {tag}
                <img
                  src={cancel_dark}
                  alt="삭제 아이콘"
                  className="w-[2rem] h-[2rem] cursor-pointer absolute -top-[0.6rem] -right-[0.8rem] rounded-full p-[0.2rem]"
                  onClick={() => handleRemoveTag(tag)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 공간 설명 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            공간 설명<span className="text-cr-red">*</span>
          </label>
          <textarea
            {...register("description")}
            placeholder="공간에 대한 설명을 자세하게 적어주세요 (ex. 공간 분위기, 구비 물품, 위치, 용도 등)"
            maxLength={2000}
            className={`w-full leading-[2.2rem] min-h-[15rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none
              ${
                errors.description
                  ? "border border-cr-red"
                  : "border border-transparent"
              }`}
          />
          <div className="flex justify-between text-12-Regular text-cr-500">
            <div>
              {errors.description && (
                <div className="flex gap-[0.6rem] items-center">
                  <img src={warning} alt="경고 아이콘" />
                  <span className="text-12-Medium text-red-500">
                    {errors.description.message}
                  </span>
                </div>
              )}
            </div>
            <div>{watch("description")?.length || 0}/2000자</div>
          </div>
        </div>

        {/* 공간 안내 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">공간 안내</label>
          <textarea
            {...register("facilityNotice")}
            placeholder="ex) 재활용 쓰레기 구비 되어있습니다"
            maxLength={500}
            className="w-full leading-[2.2rem] min-h-[7rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none"
          />
          <div className="flex justify-end text-12-Regular text-cr-500">
            {watch("facilityNotice")?.length || 0}/500자
          </div>
        </div>

        {/* 주의 사항 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            주의 사항<span className="text-cr-red">*</span>
          </label>
          <textarea
            {...register("notice")}
            placeholder="ex) 사용 후 청소 부탁드립니다"
            maxLength={500}
            className={`w-full leading-[2.2rem] min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none
              ${
                errors.notice
                  ? "border border-cr-red"
                  : "border border-transparent"
              }`}
          />
          <div className="flex justify-between text-12-Regular text-cr-500">
            <div>
              {errors.notice && (
                <div className="flex gap-[0.6rem] items-center">
                  <img src={warning} alt="경고 아이콘" />
                  <span className="text-12-Medium text-red-500">
                    {errors.notice.message}
                  </span>
                </div>
              )}
            </div>
            <div>{watch("notice")?.length || 0}/500자</div>
          </div>
        </div>

        {/* 환불 정책 */}
        <div className="flex flex-col gap-[0.8rem]">
          <label className="text-13-SemiBold">
            환불 정책<span className="text-cr-red">*</span>
          </label>
          <textarea
            {...register("refundPolicy")}
            placeholder="ex) 예약일 1일 전까지 전액 환불"
            maxLength={500}
            className={`w-full leading-[2.2rem] min-h-[10rem] rounded-[1rem] px-[1.7rem] py-[1.2rem] text-14-Medium bg-cr-100 placeholder:text-cr-500 resize-none
              ${
                errors.refundPolicy
                  ? "border border-cr-red"
                  : "border border-transparent"
              }`}
          />
          <div className="flex justify-between text-12-Regular text-cr-500">
            <div>
              {errors.refundPolicy && (
                <div className="flex gap-[0.6rem] items-center">
                  <img src={warning} alt="경고 아이콘" />
                  <span className="text-12-Medium text-red-500">
                    {errors.refundPolicy.message}
                  </span>
                </div>
              )}
            </div>
            <div>{watch("refundPolicy")?.length || 0}/500자</div>
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full h-[5.6rem] my-[2.4rem] rounded-[1rem] text-16-SemiBold transition
    ${
      isFormValid
        ? "bg-cr-black text-cr-white"
        : "bg-cr-200 text-cr-600 cursor-not-allowed"
    }
  `}
        >
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default HostSpaceRegisterInfo;
