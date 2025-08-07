import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodHostSpaceInfo } from "../../utils/zod/zodValidation";
import PageHeader from "../../components/header/PageHeader";
import Button from "../../components/button/Button";
// import { registerSpace } from "../../api/space/space.ts";
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
  const navigate = useNavigate();
  const location = useLocation();

  const spaceCategory = location.state?.spaceCategory || "";
  const [tags, setTags] = useState<string[]>([]);

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

  const onValidSubmit = async (data: HostSpaceInfo) => {
    try {
      const formData = new FormData();

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

      // const res = await registerSpace(formData);

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
        <ImageUpload register={register} setValue={setValue} errors={errors} />

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
