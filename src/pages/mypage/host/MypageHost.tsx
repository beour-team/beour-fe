import MypageHeader from "../../../components/header/MypageHeader";
import { useMypage } from "../../../hooks/Mypage/useMypage";
import MypageMenuList from "../MypageMenuList";
import MypageProfile from "../MypageProfile";

const MypageHost: React.FC = () => {
  const { data, isLoading, error } = useMypage();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  console.log("유저 정보 : ", data);

  return (
    <div className="px-[2rem] w-full min-h-screen">
      <MypageHeader>마이페이지</MypageHeader>

      <MypageProfile
        userName={data?.userName ?? "로그인 부탁드립니다."}
        userEmail={data?.userEmail}
      />

      <MypageMenuList />
    </div>
  );
};

export default MypageHost;
