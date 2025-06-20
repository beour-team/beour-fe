import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signupGuest,
  signupGuestClicked,
  signupHost,
} from "../../assets/theme";
import PageHeader from "../../components/header/PageHeader";
import Title from "../../components/title/Title";

type UserType = "GUEST" | "HOST" | null;

const SignUp = () => {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const navigate = useNavigate();

  const handleTypeSelect = (type: UserType) => {
    setSelectedType(type);
  };

  const handleSubmit = () => {
    if (selectedType) {
      navigate("/signup/form", { state: { userType: selectedType } });
    }
  };

  return (
    <div className="h-screen w-full px-[2rem] flex flex-col pb-[2.5rem]">
      <PageHeader>회원가입</PageHeader>

      <div className="h-full flex flex-col justify-between pt-[1.6rem]">
        <Title>
          가입할 사용자 유형을
          <br />
          선택해주세요.
        </Title>

        <div className="flex flex-col gap-[1.6rem]">
          <div
            onClick={() => handleTypeSelect("GUEST")}
            className={`flex gap-[1.6rem] rounded-[1rem] ${
              selectedType === "GUEST" ? "bg-cr-blue " : "bg-cr-200"
            } justify-between h-[14rem] px-[1rem] py-[1.6rem] items-center cursor-pointer`}
          >
            <div className="flex flex-col justify-between pl-[1rem] h-full">
              <div
                className={`text-20-SemiBold pt-[1rem] ${
                  selectedType === "GUEST" ? "text-cr-white" : ""
                }`}
              >
                게스트
              </div>
              <div
                className={`text-14-Medium pb-[1.4rem] ${
                  selectedType === "GUEST" ? "text-cr-white" : "text-cr-600"
                }`}
              >
                비어있는 공간을 대여할 수 있어요
              </div>
            </div>
            <img
              src={selectedType === "GUEST" ? signupGuestClicked : signupGuest}
              alt="게스트"
            />
          </div>
          <div
            onClick={() => handleTypeSelect("HOST")}
            className={`flex gap-[1.6rem] rounded-[1rem] ${
              selectedType === "HOST" ? "bg-cr-blue" : "bg-cr-200"
            } justify-between h-[14rem] px-[1rem] py-[1.6rem] items-center cursor-pointer`}
          >
            <div className="flex flex-col justify-between pl-[1rem] h-full">
              <div
                className={`text-20-SemiBold pt-[1rem] ${
                  selectedType === "HOST" ? "text-cr-white" : ""
                }`}
              >
                호스트
              </div>
              <div
                className={`text-14-Medium pb-[1.4rem] leading-[2.2rem] ${
                  selectedType === "HOST" ? "text-cr-white" : "text-cr-600"
                }`}
              >
                비어있는 공간을 등록하고
                <br />
                이용자들에게 대여해줄 수 있어요
              </div>
            </div>
            <img className="pr-[1rem]" src={signupHost} alt="호스트" />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className={`h-[5rem] w-full rounded-[1rem] text-16-Medium text-cr-white ${
            selectedType ? "bg-black" : "bg-cr-400"
          }`}
        >
          선택완료
        </button>
      </div>
    </div>
  );
};

export default SignUp;
