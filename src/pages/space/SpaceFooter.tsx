// react-hot-toast 라이브러리 설치 필요
// npm install react-hot-toast로 설치해주세요
import { inquiry, warning } from "../../assets/theme";
import { toast } from "react-hot-toast";
import { PATHS } from "../../routes/paths";
import { useNavigate } from "react-router-dom";

interface SpaceFooterProps {
  space: {
    name: string;
    maxCapacity: number;
    contact: string; //백엔드 필요?
    pricePerHour: number;
  };
}

const SpaceFooter = ({ space }: SpaceFooterProps) => {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-around mb-[1rem] mt-[2rem] rounded-t-[1rem]">
      <div
        className="text-center cursor-pointer ml-[1rem]"
        onClick={() =>
          toast("채팅 기능은 준비 중이에요", {
            icon: <img src={warning} alt="경고" />,
            style: {
              borderRadius: "10px",
              background: "#2A2C32",
              color: "#FFFFFF",
              width: "35.4rem",
              height: "4rem",
              fontSize: "1.4rem",
              marginBottom: "7rem",
            },
            duration: 1000, //1초후 자동 사라짐
          })
        }
      >
        <img src={inquiry} alt="문의" className="w-[2.4rem] mx-auto" />
        <div className="text-[1.3rem] text-[#3D3D3D] mt-[0.4rem]">문의하기</div>
      </div>
      <button
        onClick={() =>
          nav(PATHS.GUEST.SPACERESERVE, {
            state: {
              name: space.name,
              maxCapacity: space.maxCapacity,
              contact: space.contact,
              pricePerHour: space.pricePerHour,
            },
          })
        }
        className="bg-black text-white text-16-Medium px-[13rem] py-[1.8rem] rounded-[1rem]"
      >
        예약하기
      </button>
    </div>
  );
};

export default SpaceFooter;
