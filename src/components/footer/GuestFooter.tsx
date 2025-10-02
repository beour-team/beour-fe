import { useNavigate, useLocation } from "react-router-dom";
import {
  home,
  home_click,
  nearby,
  nearby_click,
  reservations,
  reservations_click,
  guest,
  guest_click,
} from "../../assets/theme";

const footerItems = [
  { label: "홈", path: "/guest", icon: home, clickIcon: home_click },
  {
    label: "내 주변",
    path: "/nearby",
    icon: nearby,
    clickIcon: nearby_click,
  },
  {
    label: "나의 예약",
    path: "/reservations",
    icon: reservations,
    clickIcon: reservations_click,
  },
  {
    label: "마이페이지",
    path: "/mypageguest",
    icon: guest,
    clickIcon: guest_click,
  },
];

const GuestFooter = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <footer className="relative w-full bg-transparent flex justify-center ">
      <div
        className="
      fixed bottom-0 left-50% w-full max-w-[43rem] min-w-[32rem] mx-auto h-[5.7rem] flex justify-around items-center bg-white z-10"
        style={{
          boxShadow: "0 -5px 14.6px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        {footerItems.map((item) => {
          const isClick = currentPath === item.path;
          const iconSrc = isClick ? item.clickIcon : item.icon;

          return (
            <div
              key={item.path}
              className="flex flex-col items-center cursor-pointer w-[5.2rem]"
              onClick={() => {
                nav(item.path);
              }}
            >
              <img
                src={iconSrc}
                alt={item.label}
                className="w-[2.4rem] h-[2.4rem] mb-2"
              />

              <span
                className={`text-[1.2rem] ${
                  isClick ? "text-black font-semibold" : "text-[#999]"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default GuestFooter;
