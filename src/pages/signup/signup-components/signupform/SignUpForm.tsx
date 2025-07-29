import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignUpData, SignUpRequest } from "../../../../types/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSignUp } from "../../../../utils/zod/zodValidation";
import Id from "../input/Id";
import Password from "../input/Password";
import Phone from "../input/Phone";
import Email from "../input/Email";
import Name from "../input/Name";
import Nickname from "./../input/Nickname";
import { useSignUp } from "../../../../hooks/SignUp/useSignUp";

interface SignUpFormProps {
  userType: "GUEST" | "HOST" | null;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ userType }) => {
  // react-hook-form 과 zod 연결
  // 유효성 검사를 위한 스키마는 utils > zod > zodValidation 에 저장
  // mode: onChange 는 로그인 버튼 비활성화때 쓰임
  // isValid 역시 로그인 비활성화때 쓰임
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    resolver: zodResolver(zodSignUp),
    mode: "onChange",
  });

  const { mutate: signUpMutate } = useSignUp();

  // SubmitHandler 는 type Helper 로 폼에서 제출하는 데이터를 검사하는 함수
  // React-Hook-Form 이 typeScript 에서 타입을 검사할때 쓰라고 만든 규칙
  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    // emailDomain 제거
    const { ...rest } = data;
    // 제출된 이메일과 도메인을 합쳐서 보관
    const fullEmail = `${data.email}@${data.emailDomain}`;
    // 합친 이메일 데이터 제출
    const finalData: SignUpRequest = {
      ...rest,
      email: fullEmail,
      role: userType ?? "GUEST",
    };

    console.log("💌 합쳐진 이메일:", fullEmail);
    console.log("✅ 제출된 데이터:", finalData);

    signUpMutate(finalData);
  };

  console.log("에러 :", errors);
  return (
    <div>
      <form
        className="flex flex-col h-full justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-[1.6rem]">
          {/* 아이디 */}
          <Id
            register={register}
            watch={watch}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
          />

          {/* 비밀번호 */}
          <Password register={register} errors={errors} />

          {/* 이름 */}
          <Name register={register} errors={errors} />

          {/* 닉네임 */}
          <Nickname
            register={register}
            watch={watch}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
          />

          {/* 전화번호 */}
          <Phone register={register} errors={errors} />

          {/* 이메일 */}
          <Email register={register} setValue={setValue} errors={errors} />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`h-[5rem] w-full rounded-[1rem] text-16-Medium transition-colors duration-200 mt-[3.6rem] ${
            isValid
              ? "bg-cr-black text-cr-white"
              : "bg-cr-400 text-cr-white cursor-not-allowed"
          }`}
        >
          입력 완료
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
