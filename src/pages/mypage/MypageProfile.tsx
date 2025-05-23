import { myPageSpace } from "../../constants/mypage/mypage-space";

const MypageProfile = () => {
  return (
    <div className="flex flex-col gap-[2.6rem] mt-[2rem]">
      <div className="flex gap-[1.2rem] w-full h-[6.2rem] ">
        <img className="min-w-[6.2rem] h-[6.2rem] bg-[#A6A7A8] rounded-full"></img>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-[0.8rem] items-center">
              <p className="text-24-Bold">유딘딘</p>
              <span className="px-[0.4rem] bg-[#A6A7A8] py-[0.2rem] rounded-[0.5rem] text-[#868686]">
                호스트
              </span>
            </div>
            <div>
              <button className="text-13-Medium text-[#868686]">
                내 정보 수정 &gt;
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-14-Medium">rkddbwls07@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="flex w-full h-[9rem] bg-[#F5F6F8] rounded-[1.2rem]">
        {myPageSpace.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex gap-[1rem] flex-col w-full items-center justify-center"
            >
              <img
                src={menu.icon}
                className="bg-[#CFD4D8] w-[2.6rem] h-[2.6rem] rounded-full"
              />
              <p className="text-14-Medium">{menu.menu}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MypageProfile;
