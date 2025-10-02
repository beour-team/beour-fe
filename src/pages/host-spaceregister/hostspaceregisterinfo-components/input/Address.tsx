import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { warning } from "../../../../assets/theme";
import DaumPostcode from "react-daum-postcode";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface AddressProps {
  register: UseFormRegister<HostSpaceInfo>;
  setValue: UseFormSetValue<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
}

interface AddressData {
  address: string;
}

const Address = ({ register, setValue, errors }: AddressProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (data: AddressData) => {
    const fullAddress = data.address;
    setValue("address", fullAddress);
    setIsModalOpen(false);
  };

  return (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[1rem] p-[2rem] w-[90%] max-w-[600px] relative"
            onClick={(e) => e.stopPropagation()}
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
  );
};

export default Address;
