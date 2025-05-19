import SignUpForm from "./SignUpForm";

const SignUp: React.FC = () => {
  return (
    <div className="h-screen w-full px-[2rem] flex flex-col justify-between pt-[7.6rem] pb-[2.5rem]">
      <div className="h-full flex justify-between flex-col">
        <div className=" pb-[2.4rem]">
          <h2 className="text-[2.4rem] font-bold">
            서비스 이용을 위해
            <br />
            로그인 해주세요
          </h2>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
