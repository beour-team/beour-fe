import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../../utils/zod/zodValidation";
import PageHeader from "../../components/header/PageHeader";
import Button from "../../components/button/Button";
import { z } from "zod";
import { useSpaceDetail } from "../../hooks/space/useSpaceDetail";
import { useUpdateSpace } from "../../hooks/space/useUpdateSpace";
import type { Space } from "../../types/space/Space";

// 컴포넌트 imports
import ImageUpload from "../host-spaceregister/hostspaceregisterinfo-components/input/ImageUpload";
import SpaceName from "../host-spaceregister/hostspaceregisterinfo-components/input/SpaceName";
import UseCategory from "../host-spaceregister/hostspaceregisterinfo-components/input/UseCategory";
import Capacity from "../host-spaceregister/hostspaceregisterinfo-components/input/Capacity";
import Price from "../host-spaceregister/hostspaceregisterinfo-components/input/Price";
import PriceGuide from "../host-spaceregister/hostspaceregisterinfo-components/input/PriceGuide";
import Address from "../host-spaceregister/hostspaceregisterinfo-components/input/Address";
import LocationDescription from "../host-spaceregister/hostspaceregisterinfo-components/input/LocationDescription";
import SpaceTags from "../host-spaceregister/hostspaceregisterinfo-components/input/SpaceTags";
import SpaceDescription from "../host-spaceregister/hostspaceregisterinfo-components/input/SpaceDescription";
import FacilityNotice from "../host-spaceregister/hostspaceregisterinfo-components/input/FacilityNotice";
import Notice from "../host-spaceregister/hostspaceregisterinfo-components/input/Notice";
import RefundPolicy from "../host-spaceregister/hostspaceregisterinfo-components/input/RefundPolicy";
import Title from "../../components/title/Title.tsx";

const SpaceEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const spaceId = location.state?.spaceId;
  const spaceCategory = location.state?.spaceCategory || "";
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  type HostSpaceInfoType = z.infer<typeof zodHostSpaceInfo>;

  // 기존 공간 정보 불러오기
  const {
    data: spaceData,
    isLoading,
    error,
  } = useSpaceDetail(spaceId?.toString() || "");

  // 공간 수정 훅
  const { mutate: updateSpace, isPending: isUpdating } = useUpdateSpace();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<HostSpaceInfoType>({
    resolver: zodResolver(zodHostSpaceInfo),
    mode: "onSubmit", // 제출 시에만 유효성 검사
  });

  const isFormValid = true; // 수정 페이지에서는 항상 유효하다고 가정

  // URL을 File 객체로 변환하는 함수
  const convertUrlToFile = async (
    url: string,
    filename: string
  ): Promise<File> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error(`이미지 로드 실패: ${url}`, error);
      // 실패 시 더미 파일 반환
      return new File([], filename);
    }
  };

  // 기존 이미지들을 File 객체로 변환하는 함수
  const convertExistingImagesToFiles = async (
    spaceData: Space
  ): Promise<File[]> => {
    const existingImageFiles: File[] = [];

    // 썸네일이 있으면 첫 번째로 추가
    if (spaceData.thumbnailUrl) {
      const thumbnailFile = await convertUrlToFile(
        spaceData.thumbnailUrl,
        "existing-thumbnail.jpg"
      );
      existingImageFiles.push(thumbnailFile);
      console.log("썸네일 이미지 추가:", spaceData.thumbnailUrl);
    }

    // 나머지 기존 이미지들 추가
    if (spaceData.imageUrls && spaceData.imageUrls.length > 0) {
      for (let i = 0; i < spaceData.imageUrls.length; i++) {
        const url = spaceData.imageUrls[i];
        const imageFile = await convertUrlToFile(
          url,
          `existing-image-${i}.jpg`
        );
        existingImageFiles.push(imageFile);
        console.log(`기존 이미지 ${i} 추가:`, url);
      }
    }

    return existingImageFiles;
  };

  useEffect(() => {
    console.log("폼 에러 상태:", errors);
    console.log("폼 유효성:", isFormValid);
    console.log("이미지 개수:", images.length);
  }, [errors, isFormValid, images.length]);

  // 기존 공간 데이터를 폼에 채우기
  useEffect(() => {
    if (spaceData) {
      console.log("기존 공간 데이터:", spaceData);

      // 기존 이미지들을 실제 File 객체로 변환
      const loadExistingImages = async () => {
        try {
          const existingImageFiles = await convertExistingImagesToFiles(
            spaceData
          );

          // images 배열에 기존 이미지들 설정
          setImages(existingImageFiles);
          console.log("설정된 기존 이미지 파일들:", existingImageFiles);

          // 폼에 기존 데이터 설정
          reset({
            name: spaceData.name,
            spaceCategory: spaceData.spaceCategory,
            useCategory: spaceData.useCategory,
            maxCapacity: spaceData.maxCapacity,
            address: spaceData.address,
            detailAddress: spaceData.detailAddress || "",
            pricePerHour: spaceData.pricePerHour,
            description: spaceData.description,
            priceGuide: spaceData.priceGuide || "",
            facilityNotice: spaceData.facilityNotice || "",
            notice: spaceData.notice,
            locationDescription: spaceData.locationDescription || "",
            refundPolicy: spaceData.refundPolicy,
            // 실제 File 객체들 사용
            imageUrls: existingImageFiles,
            thumbnailUrl:
              existingImageFiles[0] || new File([], "dummy-thumbnail.jpg"),
          });

          // useCategory 값을 그대로 설정 (변환 없이)
          console.log("useCategory 설정:", spaceData.useCategory);
          setValue("useCategory", spaceData.useCategory);

          // 태그 설정
          if (spaceData.tags) {
            setTags(spaceData.tags);
          }
        } catch (error) {
          console.error("기존 이미지 로드 실패:", error);
        }
      };

      loadExistingImages();
    }
  }, [spaceData, reset]);

  useEffect(() => {
    console.log("수정할 공간 ID:", spaceId);
    console.log("선택된 spaceCategory:", spaceCategory);
  }, [spaceId, spaceCategory]);

  useEffect(() => {
    if (spaceCategory) {
      setValue("spaceCategory", spaceCategory);
    }
  }, [spaceCategory, setValue]);

  useEffect(() => {
    if (images.length > 0) {
      setValue("imageUrls", images, { shouldValidate: true });
      setValue("thumbnailUrl", images[0], { shouldValidate: true });
    }
  }, [images, setValue]);

  const onValidSubmit = async (data: HostSpaceInfoType) => {
    // 유효한 이미지 파일들만 필터링
    const validImages = images.filter(
      (image) => image instanceof File && image.size > 0
    );

    // JSON 데이터 준비 (이미지를 제외한 모든 필드)
    const jsonData = {
      name: data.name,
      address: data.address,
      detailAddress: data.detailAddress || "",
      pricePerHour: data.pricePerHour,
      maxCapacity: data.maxCapacity,
      spaceCategory: data.spaceCategory,
      useCategory: data.useCategory, // 한글 값 그대로 전송
      description: data.description,
      priceGuide: data.priceGuide || "",
      facilityNotice: data.facilityNotice || "",
      notice: data.notice,
      locationDescription: data.locationDescription || "",
      refundPolicy: data.refundPolicy,
      tags: tags,
      imageUrls: [
        // 썸네일
        ...(spaceData?.thumbnailUrl ? [spaceData.thumbnailUrl] : []),
        // 나머지 기존 이미지 URL들
        ...(spaceData?.imageUrls || []),
      ],
      newImages: validImages, // 새로 추가된 이미지 파일들
    };

    console.log("JSON 데이터:", jsonData);

    if (!spaceId) {
      alert("공간 ID가 없습니다.");
      return;
    }

    try {
      // 이미지 파일 타입 체크
      const validImages = images.filter((file) => {
        const isValidType = file.type.startsWith("image/");
        if (!isValidType) {
          console.warn(`잘못된 파일 타입: ${file.name} (${file.type})`);
        }
        return isValidType;
      });

      console.log("유효한 이미지 파일 개수:", validImages.length);

      // API 요청 데이터 준비
      const updateData = {
        name: data.name,
        address: data.address,
        detailAddress: data.detailAddress || "",
        pricePerHour: data.pricePerHour,
        maxCapacity: data.maxCapacity,
        spaceCategory: data.spaceCategory,
        useCategory: data.useCategory, // 변환 없이 한글 값 그대로 전송
        description: data.description,
        priceGuide: data.priceGuide || "",
        facilityNotice: data.facilityNotice || "",
        notice: data.notice,
        locationDescription: data.locationDescription || "",
        refundPolicy: data.refundPolicy,
        tags: tags,
        imageUrls: [
          // 썸네일
          ...(spaceData?.thumbnailUrl ? [spaceData.thumbnailUrl] : []),
          // 나머지 기존 이미지 URL들
          ...(spaceData?.imageUrls || []),
        ],
        newImages: validImages, // 새로 추가된 이미지 파일들
      };

      updateSpace(
        { spaceId, data: updateData },
        {
          onSuccess: () => {
            alert("공간이 성공적으로 수정되었습니다.");
            navigate("/spacelist");
          },
          onError: (error) => {
            console.error("공간 수정 실패:", error);
            alert("공간 수정에 실패했습니다. 다시 시도해주세요.");
          },
        }
      );
    } catch (error) {
      console.error("공간 수정 중 오류 발생:", error);
      alert("공간 수정 중 오류가 발생했습니다.");
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cr-white px-[2rem] relative">
        <PageHeader backTo="/spacelist">공간 수정</PageHeader>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-[1.2rem]">
          <div className="text-18-SemiBold text-cr-black">
            공간 정보를 불러오는 중...
          </div>
          <div className="text-14-Medium text-cr-500 text-center leading-[2.2rem]">
            잠시만 기다려주세요
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen bg-cr-white px-[2rem] relative">
        <PageHeader backTo="/spacelist">공간 수정</PageHeader>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-160px)] gap-[1.2rem]">
          <div className="text-18-SemiBold text-cr-black">
            공간 정보를 불러올 수 없어요
          </div>
          <div className="text-14-Medium text-cr-500 text-center leading-[2.2rem]">
            잠시 후 다시 시도해주세요
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cr-white px-[2rem] relative">
      {/* Header */}
      <PageHeader backTo="/spacelist">공간 수정</PageHeader>

      <div className="flex justify-between items-end mb-12">
        <Title>
          공간 정보를
          <br />
          수정해주세요.
        </Title>
        <span className="text-12-Regular text-cr-red mb-[0.6rem]">
          *필수입력
        </span>
      </div>

      <form
        className="flex flex-col gap-[1.6rem]"
        onSubmit={(e) => {
          console.log("=== 폼 제출 이벤트 발생! ===");
          handleSubmit(onValidSubmit, (errors) => {
            console.log("=== 유효성 검사 실패! ===");
            console.log("에러들:", errors);
          })(e);
        }}
      >
        {/* 이미지 업로드 */}
        <ImageUpload
          register={register}
          setValue={setValue}
          images={images}
          setImages={setImages}
          existingImageUrls={[]} // 빈 배열로 설정하여 중복 방지
          thumbnailUrl={spaceData?.thumbnailUrl}
        />

        {/* 공간명 */}
        <SpaceName register={register} errors={errors} />

        {/* 사용 용도 */}
        <UseCategory
          register={register}
          setValue={setValue}
          errors={errors}
          watch={watch}
        />

        {/* 수용 인원 */}
        <Capacity
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        {/* 가격 */}
        <Price register={register} errors={errors} />

        {/* 기타 가격 안내 */}
        <PriceGuide register={register} watch={watch} />

        {/* 주소 */}
        <Address register={register} setValue={setValue} errors={errors} />

        {/* 위치 정보 */}
        <LocationDescription register={register} />

        {/* 공간 태그 */}
        <SpaceTags tags={tags} setTags={setTags} />

        {/* 공간 설명 */}
        <SpaceDescription register={register} watch={watch} errors={errors} />

        {/* 공간 안내 */}
        <FacilityNotice register={register} watch={watch} />

        {/* 주의 사항 */}
        <Notice register={register} watch={watch} errors={errors} />

        {/* 환불 정책 */}
        <RefundPolicy register={register} watch={watch} errors={errors} />

        {/* 수정 완료 버튼 */}
        <div className="my-[2.4rem]">
          <Button
            isValid={isFormValid}
            disabled={isUpdating}
            onClick={() => console.log("=== 버튼 클릭됨! ===")}
          >
            {isUpdating ? "수정 중..." : "수정 완료"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpaceEdit;
