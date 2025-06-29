import { Route, Routes } from "react-router-dom";
import { PATHS } from "./routes/paths";
import Layout from "./layouts/webApp-layout/Layout";
import Contents from "./layouts/contents-layout/Contents";
import GuestMainPage from "./pages/guest-main/main-guest/GuestMainPage";
import GuestSearchPage from "./pages/guest-main/search-guest/GuestSearchPage";
import GuestResultPage from "./pages/guest-main/result-guest/GuestResultPage";
import GuestFilterPage from "./pages/guest-main/filter/GuestFilterPage";
import HostMainpage from "./pages/host-main/HostMainpage";
import HostSpaceRegister from "./pages/HostSpaceRegister";
import HostSpaceRegisterInfo from "./pages/HostSpaceRegisterInfo";
import MypageHost from "./pages/mypage/host/MypageHost";
import GuestMapPage from "./pages/map/GuestMapPage";
import EditProfileHost from "./pages/editprofile/host/EditProfileHost";
import SpaceList from "./pages/spacelist/SpaceList";
import Review from "./pages/review/host/Review";
import WishSpace from "./pages/wishspace/WishSpace";
import GuestReservePage from "./pages/guest-reservation/GuestReservePage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUp from "./pages/signup/SignUp";
import SIgnUpComplete from "./pages/signup/SIgnUpComplete";
import AuthLayout from "./routes/AuthLayout";
import AuthAfterLayout from "./routes/AuthAfterLayout";
import MypageGuest from "./pages/mypage/guest/MypageGuest";

// 테스트용 으로 적어둔거에요!!
function Home() {
  return <h1 className="text-2xl font-bold">홈 화면</h1>;
}

function App() {
  return (
    <>
      <Routes>
        {/* 웹앱 사이즈의 레이아웃입니다 */}
        <Route element={<Layout />}>
          {/* 컨텐츠를 담을 레이아웃입니다 */}
          <Route element={<Contents />}>
            {/* 엑세스 토큰이 없을 경우 이동 가능한 페이지 */}
            <Route element={<AuthAfterLayout />}>
              <Route path={PATHS.LOGIN} element={<LoginPage />} />
              <Route path={PATHS.SIGNUP} element={<SignUp />} />
              <Route path={PATHS.SIGNUPFORM} element={<SignUpPage />} />
              <Route path={PATHS.SIGNUPCOMPLETE} element={<SIgnUpComplete />} />
            </Route>

            {/* 엑세스 토큰이 있을 경우 이동 가능한 페이지 */}
            <Route element={<AuthLayout />}>
              {/* 호스트 페이지 */}
              <Route path={PATHS.HOME} element={<Home />} />
              <Route path={PATHS.HOST.MYPAGE} element={<MypageHost />} />
              <Route
                path={PATHS.HOST.EDIT_PROFILE}
                element={<EditProfileHost />}
              />
              <Route path={PATHS.HOST.SPACE_LIST} element={<SpaceList />} />
              <Route path={PATHS.HOST.REVIEW} element={<Review />} />
              <Route path={PATHS.HOST.MAIN} element={<HostMainpage />} />
              <Route
                path={PATHS.HOST.SPACE_REGISTER}
                element={<HostSpaceRegister />}
              />
              <Route
                path={PATHS.HOST.SPACE_REGISTER_INFO}
                element={<HostSpaceRegisterInfo />}
              />

              {/* 게스트 페이지 랜더링 */}
              <Route path={PATHS.GUEST.WISH_SPACE} element={<WishSpace />} />
              <Route path={PATHS.GUEST.MAIN} element={<GuestMainPage />} />
              <Route path={PATHS.GUEST.MYPAGE} element={<MypageGuest />} />
              <Route path={PATHS.GUEST.SEARCH} element={<GuestSearchPage />} />
              <Route path={PATHS.GUEST.RESULT} element={<GuestResultPage />} />
              <Route path={PATHS.GUEST.FILTER} element={<GuestFilterPage />} />
              <Route path={PATHS.GUEST.MAP} element={<GuestMapPage />} />
              <Route
                path={PATHS.GUEST.RESERVATIONS}
                element={<GuestReservePage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
