interface ReviewTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ReviewTabBar = ({ activeTab, onTabChange }: ReviewTabBarProps) => {
  return (
    <div className="h-[4.8rem] w-full bg-[#E9E9E9] flex items-center justify-between rounded-full">
      <div
        onClick={() => onTabChange("guest")}
        className={`text-[1.4rem] font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full ml-[0.8rem] cursor-pointer ${
          activeTab === "guest" ? "bg-[#3C3C3C] text-white" : "text-black"
        }`}
      >
        답글 작성하기
      </div>
      <div
        onClick={() => onTabChange("host")}
        className={`text-[1.4rem] font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full mr-[0.8rem] cursor-pointer ${
          activeTab === "host" ? "bg-[#3C3C3C] text-white" : "text-black"
        }`}
      >
        작성한 답글
      </div>
    </div>
  );
};

export default ReviewTabBar;
