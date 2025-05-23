import { myPageMenuList } from "../../constants/mypage/mypage-menulist";
import { rightArrow } from "../../assets/theme";

const MypageMenuList = () => {
  return (
    <ul className="flex flex-col gap-[3.7rem] pt-[3rem]">
      {myPageMenuList.map((menu) => {
        return (
          <li key={menu.id} className="flex justify-between items-center">
            <div className="flex gap-[1.6rem] items-center">
              <img
                className="w-[2.3rem] h-[2.3rem] rounded-full bg-[#CFD4D8]"
                src={menu.icon}
              />
              <div className="text-18-SemiBold">{menu.menu}</div>
            </div>

            <div className="w-[2.3rem] h-[2.3rem] flex justify-center items-center">
              <img src={rightArrow} alt="" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MypageMenuList;
