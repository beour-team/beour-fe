// Email.tsx

import { useEffect, useRef, useState } from "react";
import { topArrow, underArrow } from "../../../../assets/theme";
import { options } from "../../../../constants/domain/domain";
import type { SignUpData } from "../../../../types/SignUp";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
interface EmailProps {
  register: UseFormRegister<SignUpData>;
  setValue: UseFormSetValue<SignUpData>;
}
const Email = ({ register, setValue }: EmailProps) => {
  // 드롭다운 리스트 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 드롭다운 리스트 선택 상태 관리
  const [selected, setSelected] = useState<string>("");

  // 드롭다운 ref 생성
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 오픈 시 다른 곳을 클릭하면 닫히는 기능
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 전체 문서에서 마우스 클릭이 발생할때마다 실행되는 이벤트 리스너
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col">
      <label className="text-13-SemiBold leading-[2.6rem]">이메일</label>
      <div className="flex gap-[0.8rem] items-center">
        <input
          className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-14-Medium bg-cr-100"
          placeholder="이메일"
          type="text"
          {...register("email")}
        />
        <span className="text-14-Medium">@</span>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex justify-between items-center w-[16rem] h-[5.6rem] bg-cr-100 rounded-[1rem] text-14-Medium text-left px-[1.6rem] text-cr-600"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className={selected ? "text-cr-black" : "text-cr-600"}>
              {selected || "주소 선택"}
            </span>
            <img src={isOpen ? topArrow : underArrow} alt="화살표" />
          </button>

          {isOpen && (
            <ul className="z-10 bg-cr-white absolute mt-[0.8rem] w-full border-cr-300 border rounded-[1rem] px-[1.6rem] py-[1.2rem]">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setValue("emailDomain", option, {
                      shouldValidate: true,
                    });
                    setIsOpen(false);
                  }}
                  className="h-[3rem] text-14-Medium flex items-center cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          <input type="hidden" value={selected} {...register("emailDomain")} />
        </div>
      </div>
    </div>
  );
};

export default Email;
