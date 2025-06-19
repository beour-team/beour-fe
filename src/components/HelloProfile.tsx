// 게스트/호스트님 안녕하세요!
import { guestLogo, hostLogo } from "../assets/theme";

interface HelloProfileProps {
  userType: "guest" | "host";
}

const HelloProfile = ({ userType }: HelloProfileProps) => {
  const isHost = userType === "host";

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-24-Bold leading-[3rem] pb-[0.7rem]">
          {isHost ? "호스트님" : "게스트님"}
        </div>
        <div className="text-24-Bold mb-[1rem]">안녕하세요!</div>
      </div>
      <img
        src={isHost ? hostLogo : guestLogo}
        alt={isHost ? "호스트 로고" : "게스트 로고"}
        className="w-[7.3rem] h-[9.5rem]"
      />
    </div>
  );
};

export default HelloProfile;
