type TabType = "guest" | "host";

interface LoginTabProps {
  setActiveTab: (tab: TabType) => void;
  activeTab: TabType;
}

const LoginTab: React.FC<LoginTabProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="h-[4.8rem] w-full bg-cr-200 flex items-center justify-between rounded-full mt-[3rem]">
      <div
        onClick={() => {
          setActiveTab("guest");
        }}
        className={`text-14-Medium font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full ml-[0.8rem] cursor-pointer ${
          activeTab === "guest"
            ? "bg-cr-900 text-cr-white"
            : "bg-none text-cr-600"
        }`}
      >
        대여자
      </div>

      <div
        onClick={() => {
          setActiveTab("host");
        }}
        className={`text-14-Medium font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full mr-[0.8rem] cursor-pointer ${
          activeTab === "host"
            ? "bg-cr-900 text-cr-white"
            : "bg-none text-cr-600"
        }`}
      >
        호스트
      </div>
    </div>
  );
};

export default LoginTab;
