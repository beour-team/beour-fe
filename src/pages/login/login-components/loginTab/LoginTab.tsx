type TabType = "guest" | "host";

interface LoginTabProps {
  setActiveTab: (tab: TabType) => void;
  activeTab: TabType;
}

const LoginTab: React.FC<LoginTabProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="h-[4.8rem] w-full bg-cr-200 flex items-center justify-between rounded-full mt-[3rem] relative">
      {/* 슬라이딩 배경 */}
      <div
        className={`absolute top-[0.5rem] h-[3.8rem] w-[calc(50%-0.8rem)] bg-cr-900 rounded-full transition-transform duration-300 ease-in-out ${
          activeTab === "guest"
            ? "translate-x-[0.8rem]"
            : "translate-x-[calc(100%+0.8rem)]"
        }`}
      />

      <div
        onClick={() => {
          setActiveTab("guest");
        }}
        className={`text-14-Medium font-medium h-[3.8rem] flex items-center w-full justify-center rounded-full ml-[0.8rem] cursor-pointer relative z-10 transition-colors duration-200 delay-50 ${
          activeTab === "guest" ? "text-cr-white" : "text-cr-600"
        }`}
      >
        게스트
      </div>

      <div
        onClick={() => {
          setActiveTab("host");
        }}
        className={`text-14-Medium font-medium h-[3.8rem] flex items-center w-full justify-center rounded-full mr-[0.8rem] cursor-pointer relative z-10 transition-colors duration-200 delay-50 ${
          activeTab === "host" ? "text-cr-white" : "text-cr-600"
        }`}
      >
        호스트
      </div>
    </div>
  );
};

export default LoginTab;
