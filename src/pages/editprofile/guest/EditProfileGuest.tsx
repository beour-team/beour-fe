import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  EditProfile,
  UpdateProfileRequest,
} from "../../../types/EditProfile";
import PageHeader from "../../../components/header/PageHeader";
import Form from "../editprofile-components/form/Form";
import ColorTag from "../../../components/Tags/ColorTag";
import { useMypageDetail } from "../../../hooks/Mypage/useMypageDetail";
import { useEffect, useRef } from "react";
import { useUpdateMypageDetail } from "../../../hooks/Mypage/useUpdateMypageDetail";
import { useUpdateMypagePassword } from "../../../hooks/Mypage/useUpdateMypagePassword";
import { zodEditProfile } from "../../../utils/zod/zodValidation";

const EditProfileGuest: React.FC = () => {
  // 기본적인 React-hook-form 과 zod 를 연결하는 코드
  const {
    register, // 필드 등록
    handleSubmit, // 제출 핸들러
    setValue, // 필드 초기 값 설정
    watch, // 실시간 입력 데이터 확인
    reset, // 필드 초기화
    setError, // 에러 설정
    clearErrors, // 에러 클리어
    formState: { errors },
  } = useForm<EditProfile>({
    // resolver는 미리 만들어둔 스키마 zodEditProfile 이랑 연결
    resolver: zodResolver(zodEditProfile),
    // 입력받은 값이 바뀔 때 마다 유효성 검사 실행
    mode: "onChange",
    // 필드 기본 값
    defaultValues: {
      name: "",
      nickName: "",
      phone: "",
      email: "",
      emailDomain: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 서버에서 유저 프로필 정보 가져오기
  // 기본값으로 폼에 들어갈 데이터임
  const { data } = useMypageDetail();

  // 닉네임과 폰번호 초기값 저장용 => 나중에 비교해서 다를 경우 api 실행해야됨
  const originalValuesRef = useRef<{ nickName: string; phone: string }>({
    nickName: "",
    phone: "",
  });

  // 서버에서 가져온 데이터 기본값으로 세팅하기
  useEffect(() => {
    // 이메일이 정상적인 형태일때
    if (data && typeof data.email === "string") {
      // UI상 이메일과 도메인이 따로 분리 되어있는 형태라 이메일을 분리해줘야됨
      const [emailId, emailDomain] = data.email.split("@");

      // 서버에서 데이터 받아서 입력 해주는 마법같은 코드
      reset({
        name: data.name,
        nickName: data.nickName,
        phone: data.phoneNum,
        email: emailId,
        emailDomain: emailDomain,
      });

      // 초기값 닉네임 폰 번호 저장
      originalValuesRef.current = {
        nickName: data.nickName,
        phone: data.phoneNum,
      };
    }
    // 데이터나 reset이 바뀔때마다 실행
  }, [data, reset]);

  // 닉네임과 폰 번호 변경하는 기능 호출
  const { mutate: updateProfile } = useUpdateMypageDetail();

  // 비밀번호 변경하는 기능 호출
  const { mutate: updatePassword } = useUpdateMypagePassword();

  // SubmitHandler 는 type Helper 로 폼에서 제출하는 데이터를 검사하는 함수
  // React-Hook-Form 이 typeScript 에서 타입을 검사할때 쓰라고 만든 규칙
  const onSubmit: SubmitHandler<EditProfile> = async (formData) => {
    try {
      // api 요청을 담을 배열
      const promises = [];

      // 닉네임/폰번호 변경 여부 확인
      const updateData: UpdateProfileRequest = {
        newNickname:
          formData.nickName !== originalValuesRef.current.nickName
            ? formData.nickName
            : "", // 닉네임이 변경되지 않으면 빈 문자열
        newPhone:
          formData.phone !== originalValuesRef.current.phone
            ? formData.phone
            : "", // 폰번호가 변경되지 않으면 빈 문자열
      };

      // 닉네임이나 폰 번호가 하나라도 변경되었으면 API 호출
      if (updateData.newNickname || updateData.newPhone) {
        promises.push(
          new Promise<void>((resolve, reject) => {
            updateProfile(updateData, {
              onSuccess: () => resolve(),
              onError: (err) => reject(err),
            });
          })
        );
      }

      // 비밀번호 변경 여부 체크
      if (formData.password?.trim()) {
        promises.push(
          new Promise<void>((resolve, reject) => {
            updatePassword(
              { newPassword: formData.password },
              {
                onSuccess: () => resolve(),
                onError: (err) => reject(err),
              }
            );
          })
        );
      }

      // 변경사항 없으면 알림
      if (promises.length === 0) {
        alert("변경할 내용이 없습니다.");
        return;
      }

      // 모든 요청 실행
      await Promise.all(promises);
      alert("정보가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("정보 변경 중 오류 발생:", error);
      alert("정보 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="px-[2rem] min-h-screen">
      <PageHeader>내 정보 수정</PageHeader>

      <div className="py-[1.6rem]">
        <ColorTag>게스트</ColorTag>
      </div>

      <Form
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        watch={watch}
        onSubmit={onSubmit}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
      />
    </div>
  );
};

export default EditProfileGuest;
