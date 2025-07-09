import { Link } from "react-router-dom";
import {
  MYPAGESPACEGUEST,
  MYPAGESPACEHOST,
} from "../../constants/mypage/mypage-space";
import {
  guestProfileOff,
  guestProfileOn,
  profileOff,
  profileOn,
} from "../../assets/theme";
interface Props {
  userName: string;
  userEmail?: string;
}

const MypageProfile: React.FC<Props> = ({ userName, userEmail }) => {
  // 로컬스토리지에서 role 가져오기
  const role = localStorage.getItem("role");

  return (
    <div className="flex flex-col gap-[2.6rem] mt-[2rem]">
      <div className="flex gap-[1.2rem] w-full h-[6.2rem] items-center">
        {role === "HOST" ? (
          <img
            className="min-w-[6.2rem] h-[6.2rem] rounded-full"
            src={userEmail ? profileOn : profileOff}
            alt="프로필 이미지"
          />
        ) : (
          <img
            className="min-w-[6.2rem] h-[6.2rem] rounded-full"
            src={userEmail ? guestProfileOn : guestProfileOff}
            alt="프로필 이미지"
          />
        )}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="text-24-Bold pt-[0.4rem]">{userName}</p>
            <div>
              {userEmail && (
                <Link
                  to={"/editprofilehost"}
                  className="text-13-Medium text-cr-500"
                >
                  내 정보 수정 &gt;
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {userEmail && (
              <p className="text-14-Medium pt-[0.8rem]">{userEmail}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full h-[9rem] bg-cr-100 rounded-[1.2rem] overflow-hidden">
        {role === "HOST"
          ? MYPAGESPACEHOST.map((menu, index) => {
              const isLast = index === MYPAGESPACEHOST.length - 1;
              return (
                <div key={menu.id} className="flex w-full h-full">
                  <Link
                    to={menu.link}
                    className="flex gap-[1rem] flex-col w-full items-center justify-center cursor-pointer"
                  >
                    <div className="h-[3.7rem] flex items-center">
                      <img src={menu.icon} className="w-auto h-auto" />
                    </div>
                    <p className="text-14-SemiBold">{menu.menu}</p>
                  </Link>

                  {!isLast && (
                    <div className="w-[1px] h-[3.2rem] self-center bg-cr-400" />
                  )}
                </div>
              );
            })
          : MYPAGESPACEGUEST.map((menu, index) => {
              const isLast = index === MYPAGESPACEGUEST.length - 1;
              return (
                <div key={menu.id} className="flex w-full h-full">
                  <Link
                    to={menu.link}
                    className="flex gap-[1rem] flex-col w-full items-center justify-center cursor-pointer"
                  >
                    <div className="h-[3.7rem] flex items-center">
                      <img src={menu.icon} className="w-auto h-auto" />
                    </div>
                    <p className="text-14-SemiBold">{menu.menu}</p>
                  </Link>

                  {!isLast && (
                    <div className="w-[1px] h-[3.2rem] self-center bg-cr-400" />
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default MypageProfile;
