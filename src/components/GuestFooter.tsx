// import { useNavigate } from "react-router-dom";

const footerItems = [
  { label: "홈", path: "/space" }, //엔드포인트 백엔드 api랑 맞추기
  { label: "내 주변", path: "/nearby" },
  { label: "나의 예약", path: "/reservations" },
  { label: "마이페이지", path: "/guestpage" },
];

const GuestFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent z-50">
      <div
        className="
      max-w-full
      sm:max-w-[580px]
      md:max-w-[780px]
      lg:max-w-[1150px]
      xl:max-w-[1250px]
      mx-auto
      h-[7vh]
      flex justify-around items-center py-3 bg-white
      "
      >
        {footerItems.map((item) => (
          <div
            key={item.path}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              // 페이지 이동 로직 (useNavigate 사용)
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

export default GuestFooter;
