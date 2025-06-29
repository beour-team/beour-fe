// 더 늦어지기 수정했는데 안맞는 부분있으면 꼭 말해주세요
// 제가 이해되는 것만 고쳐서 혹시 본인 부분 useNavigate( () => nav()) 안고쳐진부분있으면 수정해주세용!

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUPFORM: "/signup/form",
  SIGNUPCOMPLETE: "/signup/complete",

  HOST: {
    MAIN: "/hostmain",
    SPACE_REGISTER: "/hostspaceregister",
    SPACE_REGISTER_INFO: "/hostspaceregisterinfo",
    MYPAGE: "/mypagehost",
    EDIT_PROFILE: "/editprofilehost",
    REVIEW: "/reviewhost",
    SPACE_LIST: "/spacelist",
  },

  GUEST: {
    MAIN: "/guest",
    SEARCH: "/search",
    RESULT: "/space/search",
    FILTER: "/filter",
    MAP: "/nearby",
    MYPAGE: "/mypageguest",
    EDIT_PROFILE: "/editprofileguest",
    RESERVATIONS: "/reservations",
    WISH_SPACE: "/wishspace",
    REVIEW: "/reviewguest", //임의로 적어둔거라 맞춰서 수정해주세요!
  },
};
