import { myPageMenuList } from "../../constants/mypage/mypage-menulist";
import { rightArrow } from "../../assets/theme";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useLogOut } from "../../hooks/Login/useLogOut";
import { ToolTip } from "../../components/tooltip/Tooltip";

interface Props {
  userEmail?: string;
}

const MypageMenuList: React.FC<Props> = ({ userEmail }) => {
  const { mutate: logout } = useLogOut();

  return (
    <div className="pt-[3rem]">
      <div className="pb-[2rem] text-13-SemiBold text-cr-600">서비스 관리</div>
      <ul className="flex flex-col gap-[1.6rem] ">
        {myPageMenuList.map((menu) => {
          return (
            <Link
              to={menu.link}
              key={menu.id}
              className="flex justify-between items-center h-[4rem]"
            >
              <div className="text-18-SemiBold cursor-pointer">{menu.menu}</div>

              <div className="w-[2.3rem] h-[2.3rem] flex justify-center items-center cursor-pointer">
                <img src={rightArrow} alt="" />
              </div>
            </Link>
          );
        })}

        {userEmail ? (
          <button
            onClick={() => logout()}
            className="flex justify-between items-center text-18-SemiBold cursor-pointer"
          >
            로그아웃
            <ToolTip text="게스트 계정으로 전환할 수 있어요" />
            <div className="w-[2.3rem] h-[2.3rem] flex justify-center items-center cursor-pointer">
              <img src={rightArrow} alt="" />
            </div>
          </button>
        ) : (
          <Link
            to={PATHS.LOGIN}
            className="flex justify-between items-center text-18-SemiBold cursor-pointer"
          >
            로그인
            <ToolTip text="게스트 계정으로 전환할 수 있어요" />
            <div className="w-[2.3rem] h-[2.3rem] flex justify-center items-center cursor-pointer">
              <img src={rightArrow} alt="" />
            </div>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default MypageMenuList;
