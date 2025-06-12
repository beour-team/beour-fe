import { useNavigate } from "react-router-dom";
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
  { label: "홈", path: "/hostmain", icon: home, clickIcon: home_click },
  {
    label: "예약 캘린더",
    path: "/calender",
    icon: reservations,
    clickIcon: reservations_click,
  },
  {
    label: "마이페이지",
    path: "/hostpage",
    icon: guest,
    clickIcon: guest_click,
  },
];

const HostFooter = () => {
  const nav = useNavigate();
  const currentPath = location.pathname;

  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[43rem]">
      <div
        className="
      h-[9vh] mt-[0.5vh] px-[2vw]
      flex justify-around items-center py-3 bg-white
      "
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
                className="w-[2rem] h-[2rem] mb-2"
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

export default HostFooter;