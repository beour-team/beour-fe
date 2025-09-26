import { useState, useEffect, useRef } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { warning, topArrow, underArrow } from "../../../../assets/theme";
import type { HostSpaceInfo } from "../../../../types/HostSpaceInfo";

interface UseCategoryProps {
  register: UseFormRegister<HostSpaceInfo>;
  setValue: UseFormSetValue<HostSpaceInfo>;
  errors: FieldErrors<HostSpaceInfo>;
  watch?: UseFormWatch<HostSpaceInfo>;
}

const UseCategory = ({
  register,
  setValue,
  errors,
  watch,
}: UseCategoryProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const purposeList = [
    { value: "단체 모임", label: "단체 모임" },
    { value: "요리 연습", label: "요리 연습" },
    { value: "바리스타 실습", label: "바리스타 실습" },
    { value: "플리마켓", label: "플리마켓" },
    { value: "촬영", label: "촬영" },
    { value: "기타", label: "기타" },
  ] as const;

  // react-hook-form의 useCategory 값 감지
  const useCategoryValue = watch ? watch("useCategory") : "";

  // useCategory 값이 변경될 때 selectedPurpose 업데이트
  useEffect(() => {
    if (useCategoryValue && useCategoryValue !== selectedPurpose) {
      console.log("UseCategory - useCategory 값 감지:", useCategoryValue);
      setSelectedPurpose(useCategoryValue);
      console.log("UseCategory - 한글 값 설정:", useCategoryValue);
    }
  }, [useCategoryValue, selectedPurpose]);

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

  return (
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
          <span>{selectedPurpose || "카테고리를 선택해주세요"}</span>
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
  );
};

export default UseCategory;
