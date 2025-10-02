import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../../utils/zod/zodValidation";
import PageHeader from "../../components/header/PageHeader";
import Button from "../../components/button/Button";
import { registerSpace } from "../../api/space/space.ts"; // 공간등록 API 함수 (현재 주석처리됨)
import type { HostSpaceInfo } from "../../types/HostSpaceInfo.ts";
import { z } from "zod";

// 컴포넌트 imports
import ImageUpload from "./hostspaceregisterinfo-components/input/ImageUpload";
import SpaceName from "./hostspaceregisterinfo-components/input/SpaceName";
import UseCategory from "./hostspaceregisterinfo-components/input/UseCategory";
import Capacity from "./hostspaceregisterinfo-components/input/Capacity";
import Price from "./hostspaceregisterinfo-components/input/Price";
import PriceGuide from "./hostspaceregisterinfo-components/input/PriceGuide";
import Address from "./hostspaceregisterinfo-components/input/Address";
import LocationDescription from "./hostspaceregisterinfo-components/input/LocationDescription";
import SpaceTags from "./hostspaceregisterinfo-components/input/SpaceTags";
import SpaceDescription from "./hostspaceregisterinfo-components/input/SpaceDescription";
import FacilityNotice from "./hostspaceregisterinfo-components/input/FacilityNotice";
import Notice from "./hostspaceregisterinfo-components/input/Notice";
import RefundPolicy from "./hostspaceregisterinfo-components/input/RefundPolicy";
import Title from "../../components/title/Title.tsx";

const HostSpaceRegisterInfo = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router 훅 (현재 주석처리)
  const location = useLocation(); // 이전 페이지에서 전달된 state 데이터를 받기 위한 훅

  const spaceCategory = location.state?.spaceCategory || ""; // 이전 페이지에서 선택한 공간 카테고리 값 추출 (없으면 빈 문자열)
  const [tags, setTags] = useState<string[]>([]); // 공간 태그들을 관리하는 상태 (배열 형태로 여러 태그 저장)
  const [images, setImages] = useState<File[]>([]); // 업로드할 이미지 파일들을 관리하는 상태 (File 객체 배열)

  type HostSpaceInfoType = z.infer<typeof zodHostSpaceInfo>; // Zod 스키마에서 TypeScript 타입을 자동 생성 (타입 안전성 보장)

  const {
    register, // 입력 필드를 react-hook-form에 등록하는 함수 (폼 유효성 검사와 연결)
    handleSubmit, // 폼 제출 시 유효성 검사 후 onSubmit 함수를 실행하는 래퍼 함수
    setValue, // 프로그래밍적으로 폼 필드 값을 설정하는 함수 (커스텀 컴포넌트에서 필요)
    watch, // 실시간으로 폼 필드 값의 변화를 감지하는 함수 (글자수 카운트 등에 사용)
    formState: { errors }, // 폼 유효성 검사 에러 상태를 추출 (어떤 필드에 에러가 있는지 확인)
  } = useForm<HostSpaceInfoType>({
    resolver: zodResolver(zodHostSpaceInfo), // Zod 스키마를 react-hook-form 유효성 검사기로 연결
    mode: "onChange", // 필드 값이 변경될 때마다 실시간으로 유효성 검사 실행 (즉시 피드백)
  });

  const isFormValid = Object.keys(errors).length === 0; // 에러 객체가 비어있으면 폼이 유효함을 의미 (제출 버튼 활성화 조건)

  useEffect(() => {
    console.log("폼 에러 상태:", errors); // 개발 중 폼 에러 상태를 추적하기 위한 디버깅 로그
    console.log("폼 유효성:", isFormValid); // 폼이 유효한지 확인
    console.log("이미지 개수:", images.length); // 현재 업로드된 이미지 개수
  }, [errors, isFormValid, images.length]); // errors, isFormValid, images.length가 변경될 때마다 실행

  useEffect(() => {
    console.log("선택된 spaceCategory:", spaceCategory); // 전달받은 공간 카테고리 값을 확인하기 위한 디버깅 로그
  }, [spaceCategory]); // spaceCategory가 변경될 때마다 실행

  useEffect(() => {
    if (spaceCategory) {
      setValue("spaceCategory", spaceCategory); // 이전 페이지에서 선택한 카테고리를 폼 필드에 자동 설정
    }
  }, [spaceCategory, setValue]); // spaceCategory나 setValue가 변경될 때마다 실행

  // 이미지 상태가 변경될 때마다 react-hook-form에 동기화
  useEffect(() => {
    if (images.length > 0) {
      setValue("imageUrls", images, { shouldValidate: true }); // 이미지 배열을 폼에 설정하고 유효성 검사 실행
      setValue("thumbnailUrl", images[0], { shouldValidate: true }); // 첫 번째 이미지를 썸네일로 설정하고 유효성 검사 실행
    }
  }, [images, setValue]); // images나 setValue가 변경될 때마다 실행

  const onValidSubmit = async (data: HostSpaceInfo) => {
    try {
      const formData = new FormData(); // 파일 업로드가 포함된 폼 데이터를 서버로 전송하기 위한 FormData 객체 생성

      // space 키에 JSON 객체로 텍스트 데이터 담기
      const spaceData = {
        name: data.name, // 공간명
        spaceCategory: spaceCategory, // 공간 카테고리 (이전 페이지에서 선택한 값)
        useCategory: data.useCategory, // 사용 용도
        maxCapacity: data.maxCapacity, // 최대 수용 인원
        address: data.address, // 주소
        detailAddress: data.detailAddress || "", // 상세 주소 (선택사항이므로 빈 문자열 기본값)
        pricePerHour: data.pricePerHour, // 시간당 가격
        description: data.description, // 공간 설명
        priceGuide: data.priceGuide || "", // 가격 안내 (선택사항)
        facilityNotice: data.facilityNotice || "", // 시설 안내 (선택사항)
        notice: data.notice, // 주의사항
        locationDescription: data.locationDescription || "", // 위치 설명 (선택사항)
        refundPolicy: data.refundPolicy, // 환불 정책
        tags: tags, // 공간 태그 배열
      };

      formData.append(
        "space",
        new Blob([JSON.stringify(spaceData)], { type: "application/json" })
      ); // 텍스트 데이터를 JSON 문자열로 변환하여 FormData에 추가

      // 이미지 파일들 추가
      if (images.length > 0) {
        // 첫 번째 이미지를 thumbnailFile로 추가
        formData.append("thumbnailFile", images[0]); // 첫 번째 이미지를 대표 썸네일로 설정

        // 나머지 이미지들을 imageFiles로 추가
        if (images.length > 1) {
          for (let i = 1; i < images.length; i++) {
            formData.append("imageFiles", images[i]); // 나머지 이미지들을 추가 이미지로 설정
          }
        }
      }

      await registerSpace(formData); // 실제 API 호출 부분 (현재 주석처리됨)

      alert(`공간이 등록되었습니다. `); // 성공 메시지 표시
      navigate("/hostmain"); // 등록 완료 후 호스트 메인 페이지로 이동 (현재 주석처리됨)
    } catch (err) {
      alert("공간 등록에 실패했습니다."); // 에러 발생 시 사용자에게 실패 메시지 표시
      console.error(err); // 개발자를 위한 에러 로그 출력
    }
  };

  return (
    <div className="min-h-screen bg-cr-white px-[2rem] relative">
      {/* Header */}
      <PageHeader backTo="/hostspaceregister">공간 등록</PageHeader>

      <div className="flex justify-between items-end mb-12">
        <Title>
          공간 정보를
          <br />
          입력해주세요.
        </Title>
        <span className="text-12-Regular text-cr-red mb-[0.6rem]">
          *필수입력
        </span>
      </div>

      <form
        className="flex flex-col gap-[1.6rem]"
        onSubmit={handleSubmit(onValidSubmit)}
      >
        {/* 이미지 업로드 */}
        <ImageUpload
          register={register}
          setValue={setValue}
          images={images}
          setImages={setImages}
        />

        {/* 공간명 */}
        <SpaceName register={register} errors={errors} />

        {/* 사용 용도 */}
        <UseCategory register={register} setValue={setValue} errors={errors} />

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

        {/* 작성 완료 버튼 */}
        <div className="my-[2.4rem]">
          <Button isValid={isFormValid}>작성 완료</Button>
        </div>
      </form>
    </div>
  );
};

export default HostSpaceRegisterInfo;
