interface ReviewTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ReviewTabBar = ({ activeTab, onTabChange }: ReviewTabBarProps) => {
  return (
    <div className="h-[4.8rem] w-full bg-cr-200 flex items-center justify-between rounded-full">
      <div
        onClick={() => onTabChange("guest")}
        className={`text-14-Medium h-[3.8rem] flex items-center w-[17rem] justify-center rounded-full ml-[0.8rem] cursor-pointer ${
          activeTab === "guest" ? "bg-cr-white text-cr-500" : "text-cr-black"
        }`}
      >
        답글 작성하기
      </div>
      <div
        onClick={() => onTabChange("host")}
        className={`text-14-Medium h-[3.8rem] flex items-center w-[17rem] justify-center rounded-full mr-[0.8rem] cursor-pointer ${
          activeTab === "host" ? "bg-cr-white text-cr-500" : "text-cr-black"
        }`}
      >
        작성한 답글
      </div>
    </div>
  );
};

export default ReviewTabBar;
