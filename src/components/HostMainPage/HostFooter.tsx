import { useNavigate } from "react-router-dom";

const footerItems = [
  { label: "홈", path: "/hostmain" },
  { label: "예약 캘린더", path: "/hostreservation" },
  { label: "채팅", path: "/hostchat" },
  { label: "마이페이지", path: "/hostpage" },
];

const HostFooter = () => {
  const nav = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent z-50">
      <div
        className="
      h-[9vh] mt-[0.5vh] px-[2vw]
      flex justify-around items-center py-3 bg-white
      "
      >
        {footerItems.map((item) => (
          <div
            key={item.path}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              nav(item.path);
            }}
          >
            <div className="w-[2rem] h-[2rem] bg-[#eaeaea] rounded-full mb-3"></div>
            <span className="text-[1.2rem]">{item.label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default HostFooter;