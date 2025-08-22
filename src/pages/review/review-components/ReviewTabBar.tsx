interface ReviewTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ReviewTabBar = ({ activeTab, onTabChange }: ReviewTabBarProps) => {
  return (
    <div className="h-[4.8rem] w-full bg-cr-200 flex items-center justify-between rounded-full relative">
      {/* 슬라이딩 배경 */}
      <div
        className={`absolute top-[0.5rem] h-[3.8rem] w-[calc(50%-0.8rem)] bg-cr-white rounded-full transition-transform duration-300 ease-in-out ${
          activeTab === "guest"
            ? "translate-x-[0.8rem]"
            : "translate-x-[calc(100%+0.8rem)]"
        }`}
      />

      <div
        onClick={() => onTabChange("guest")}
        className={`text-14-Medium font-medium h-[3.8rem] flex items-center w-full justify-center rounded-full ml-[0.8rem] cursor-pointer relative z-10 transition-colors duration-200 delay-50 ${
          activeTab === "guest" ? "text-cr-500" : "text-cr-600"
        }`}
      >
        답글 작성
      </div>
      <div
        onClick={() => onTabChange("host")}
        className={`text-14-Medium font-medium h-[3.8rem] flex items-center w-full justify-center rounded-full mr-[0.8rem] cursor-pointer relative z-10 transition-colors duration-200 delay-50 ${
          activeTab === "host" ? "text-cr-500" : "text-cr-600"
        }`}
      >
        작성한 답글
      </div>
    </div>
  );
};

export default ReviewTabBar;
