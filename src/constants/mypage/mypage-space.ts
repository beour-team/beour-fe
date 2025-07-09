import { chat, gift, store, wishSpot } from "../../assets/theme";
import { PATHS } from "../../routes/paths";

export const MYPAGESPACEHOST = [
  {
    id: 1,
    menu: "내 공간",
    icon: store,
    link: PATHS.HOST.SPACE_LIST,
  },
  {
    id: 2,
    menu: "리뷰 관리",
    icon: chat,
    link: "",
  },
  {
    id: 3,
    menu: "이벤트",
    icon: gift,
    link: "",
  },
];

export const MYPAGESPACEGUEST = [
  {
    id: 1,
    menu: "찜 공간",
    icon: wishSpot,
    link: PATHS.GUEST.WISH_SPACE,
  },
  {
    id: 2,
    menu: "나의 리뷰",
    icon: chat,
    link: "",
  },
  {
    id: 3,
    menu: "이벤트",
    icon: gift,
    link: "",
  },
];
