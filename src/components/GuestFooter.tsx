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
} from "../assets/theme";

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
    path: "/guestpage",
    icon: guest,
    clickIcon: guest_click,
  },
];

const GuestFooter = () => {
  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent z-50 flex justify-center">
      <div
        className="
      w-full max-w-[41rem] min-w-[32rem] mx-auto h-[7rem] flex justify-around items-center bg-white rounded-t-[1rem]"
      >
        {footerItems.map((item) => {
          const isClick = currentPath === item.path;
          const iconSrc = isClick ? item.clickIcon : item.icon;

          return (
            <div
              key={item.path}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                nav(item.path);
              }}
            >
              <img
                src={iconSrc}
                alt={item.label}
                className="w-[2.6rem] h-[2.6rem] mb-2"
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
