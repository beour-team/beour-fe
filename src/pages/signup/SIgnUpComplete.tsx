import { Link } from "react-router-dom";
import { complete } from "../../assets/theme";
import PageHeader from "../../components/header/PageHeader";
import Title from "../../components/title/Title";
import { PATHS } from "./../../routes/paths";

const SIgnUpComplete = () => {
  return (
    <div className="h-screen w-full px-[2rem] flex flex-col pb-[2.5rem]">
      <PageHeader>회원가입</PageHeader>
      <div className="flex flex-col justify-between h-full pt-[2rem]">
        <div>
          <Title>
            가입을
            <br />
            축하합니다!
          </Title>
          <p className="text-16-Medium text-cr-600 pt-[1rem] leading-[2.4rem]">
            Be:our와 함께 다양한 공간을 경험하고
            <br />
            성장해보세요!
          </p>
        </div>
        <img src={complete} alt="축하 아이콘" />
        <Link
          to={PATHS.HOME}
          className="rounded-[1rem] bg-cr-black text-cr-white h-[5rem] text-16-Medium justify-center items-center flex"
        >
          메인화면 가기
        </Link>
      </div>
    </div>
  );
};

export default SIgnUpComplete;
