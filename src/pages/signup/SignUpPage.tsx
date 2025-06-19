import PageHeader from "../../components/header/PageHeader";
import Title from "../../components/title/Title";
import SignUpForm from "./signup-components/signupform/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <div className="h-screen w-full px-[2rem] flex flex-col  pb-[2.5rem]">
      <PageHeader>회원가입</PageHeader>

      <div className="pt-[1.6rem] pb-[2.8rem]">
        <Title>
          서비스 이용을 위해
          <br />
          로그인 해주세요
        </Title>
      </div>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
