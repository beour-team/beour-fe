import { Link } from "react-router-dom";
import { people, rightArrow, spot, star } from "../../assets/theme";
import PageHeader from "../../components/header/PageHeader";
import { SPACELIST } from "../../constants/space/spacelist";

const SpaceList = () => {
  return (
    <div className=" px-[2rem] min-h-screen">
      <PageHeader>내 공간</PageHeader>
      <div className="w-full text-13-Medium text-[#656565]">
        총 {SPACELIST.length}개
      </div>
      {SPACELIST.map((space) => (
        <div className="w-full flex gap-[1.2rem] border-b border-[#ECECEC] pb-[2.7rem]">
          <div className="h-[8.2rem] min-w-[8.2rem] rounded-[1.2rem] bg-[#E9EBEE]"></div>
          <div className="w-full">
            <h2 className="text-18-SemiBold">{space.name}</h2>
            <div className="flex gap-[1.2rem]">
              <div className="flex items-center text-13-Medium gap-[0.6rem]">
                <img className="h-[1.5rem]" src={spot} alt="위치 아이콘" />
                삼성동
              </div>
              <div className="flex items-center text-13-Medium gap-[0.6rem]">
                <img
                  className="h-[1.2rem] w-[1.2rem]"
                  src={people}
                  alt="인원 아이콘"
                />
                최대 3인
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[1.7rem] h-[1.7rem] flex items-center justify-center mr-[0.4rem]">
                <img src={star} alt="리뷰 별점 아이콘" />
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-13-SemiBold text-[#313131] pt-[0.1rem]">
                  4.2
                  <span className="text-13-Medium text-[#7E7E7E]">(103)</span>
                </p>
                <Link
                  to={"/"}
                  className="underline text-13-Medium text-[#868686] flex gap-[0.4rem]"
                >
                  공간 수정 <img src={rightArrow} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpaceList;
