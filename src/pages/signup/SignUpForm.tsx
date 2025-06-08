import { useEffect, useRef, useState } from "react";
import { topArrow, underArrow } from "../../assets/theme";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignUpData } from "../../types/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSignUp } from "../../utils/zod/zodValidation";
import { options } from "../../constants/domain/domain";

const SignUpForm: React.FC = () => {
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

  // react-hook-form 과 zod 연결
  // 유효성 검사를 위한 스키마는 utils > zod > zodValidation 에 저장
  // mode: onChange 는 로그인 버튼 비활성화때 쓰임
  // isValid 역시 로그인 비활성화때 쓰임
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    resolver: zodResolver(zodSignUp),
    mode: "onChange",
  });

  // SubmitHandler 는 type Helper 로 폼에서 제출하는 데이터를 검사하는 함수
  // React-Hook-Form 이 typeScript 에서 타입을 검사할때 쓰라고 만든 규칙
  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    // emailDomain 제거
    const { ...rest } = data;
    // 제출된 이메일과 도메인을 합쳐서 보관
    const fullEmail = `${data.email}@${data.emailDomain}`;
    // 합친 이메일 데이터 제출
    const finalData = {
      ...rest,
      email: fullEmail,
    };

    console.log("💌 합쳐진 이메일:", fullEmail);
    console.log("✅ 제출된 데이터:", finalData);
  };

  console.log("에러 :", errors);
  return (
    <div className="h-full">
      <form
        className="flex flex-col h-full justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex flex-col ">
            <label className="text-[1.3rem] font-semibold">아이디</label>
            <div className="flex gap-[0.8rem]">
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="아이디를 입력해주세요"
                type="text"
                {...register("id")}
              />
              <button className="bg-[#D0D0D0] text-[1.4rem] text-[#868686] px-[2rem] py-[1.2rem] rounded-[1rem] min-w-[9.2rem]">
                중복 확인
              </button>
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="text-[1.3rem] font-semibold">비밀번호</label>
            <div className="flex flex-col gap-[0.8rem]">
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                {...register("password")}
              />
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="비밀번호를 다시 입력해주세요"
                type="password"
                {...register("confirmPassword")}
              />
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="text-[1.3rem] font-semibold">이름</label>
            <div className="flex gap-[0.8rem]">
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="실명을 입력해주세요"
                type="text"
                {...register("name")}
              />
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="text-[1.3rem] font-semibold">닉네임</label>
            <div className="flex gap-[0.8rem]">
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="닉네임을 입력해주세요"
                type="text"
                {...register("nickname")}
              />
              <button className="bg-[#D0D0D0] text-[1.4rem] text-[#868686] px-[2rem] py-[1.2rem] rounded-[1rem] min-w-[9.2rem]">
                중복 확인
              </button>
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="text-[1.3rem] font-semibold">휴대폰 번호</label>
            <div className="flex gap-[0.8rem]">
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="휴대폰 번호를 입력해주세요"
                type="text"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="text-[1.3rem] font-semibold">이메일</label>
            <div className="flex gap-[0.8rem] items-center">
              <input
                className="w-full h-[5.6rem] rounded-[1rem] px-[1.7rem] text-[1.4rem] bg-[#f2f2f2]"
                placeholder="이메일"
                type="text"
                {...register("email")}
              />
              <span className="text-[1.4rem]">@</span>
              <div className="relative" ref={dropdownRef}>
                <button
                  className=" flex justify-between items-center w-[16rem] h-[5.6rem] bg-[#f2f2f2] rounded-[1rem] text-[1.4rem] text-left px-[1.6rem] text-[#B0B0B0]"
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <span
                    className={
                      selected === "" ? "text-[#B0B0B0]" : "text-[#000000]"
                    }
                  >
                    {selected || "주소 선택"}
                  </span>
                  {isOpen ? (
                    <img src={topArrow} alt="위 화살표" />
                  ) : (
                    <img src={underArrow} alt="아래 화살표" />
                  )}
                </button>
                {isOpen && (
                  <ul className="z-10 bg-[#FFFFFF] absolute mt-[0.8rem] w-full border-[#D2D2D2] border rounded-[1rem] px-[1.6rem] py-[1.2rem]">
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
                        className="h-[3rem] text-[1.4rem] flex items-center cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  type="hidden"
                  value={selected}
                  {...register("emailDomain")}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`h-[5rem] w-full rounded-[1rem] text-[1.6rem] transition-colors duration-200 ${
            isValid
              ? "bg-[#000] text-white"
              : "bg-[#D9D9D9] text-black cursor-not-allowed"
          }`}
        >
          입력 완료
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
