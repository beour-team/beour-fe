import { Route, Routes } from "react-router-dom";
import { PATHS } from "./routes/paths";
import Layout from "./layouts/webApp-layout/Layout";
import Contents from "./layouts/contents-layout/Contents";
import GuestMainPage from "./pages/guest-main/main-guest/GuestMainPage";
import GuestSearchPage from "./pages/guest-main/search-guest/GuestSearchPage";
import GuestResultPage from "./pages/guest-main/result-guest/GuestResultPage";
import GuestFilterPage from "./pages/guest-main/filter/GuestFilterPage";
import HostMainpage from "./pages/host-main/HostMainpage";
import HostSpaceRegister from "./pages/host-spaceregister/HostSpaceRegister";
import HostSpaceRegisterInfo from "./pages/host-spaceregister/HostSpaceRegisterInfo";
import MypageHost from "./pages/mypage/host/MypageHost";
import GuestMapPage from "./pages/map/GuestMapPage";
import EditProfileHost from "./pages/editprofile/host/EditProfileHost";
import SpaceList from "./pages/spacelist/SpaceList";
import WishSpace from "./pages/wishspace/WishSpace";
import GuestReservePage from "./pages/guest-reservation/GuestReservePage";
import LoginPage from "./pages/login/LoginPage";
import SpacePage from "./pages/space/SpacePage";
import SpaceReservePage from "./pages/space/SpaceReservePage";
import ReserveCompletePage from "./pages/space/ReserveCompletedPage";
import GuestReserveDetailPage from "./pages/guest-reservation/GuestReserveDetailPage";
import { Toaster } from "react-hot-toast";
import SpaceMapPage from "./pages/guest-reservation/SpaceMapPage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUp from "./pages/signup/SignUp";
import SIgnUpComplete from "./pages/signup/SIgnUpComplete";
import AuthLayout from "./routes/AuthLayout";
import AuthAfterLayout from "./routes/AuthAfterLayout";
import MypageGuest from "./pages/mypage/guest/MypageGuest";
import EditProfileGuest from "./pages/editprofile/guest/EditProfileGuest";
import HostCalendar from "./pages/host-calendar/HostCalendar";
import HostReview from "./pages/review/host/HostReview";
import GuestReview from "./pages/review/guest/GuestReview";
// react query 사용을 위한 전역 설정
// yarn add @tanstack/react-query axios
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" reverseOrder={false} />
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
              <Route path={PATHS.HOME} element={<GuestMainPage />} />
            </Route>

            {/* 엑세스 토큰이 있을 경우 이동 가능한 페이지 */}
            <Route element={<AuthLayout />}>
              {/* 호스트 페이지 */}
              <Route path={PATHS.HOST.MYPAGE} element={<MypageHost />} />
              <Route
                path={PATHS.HOST.EDIT_PROFILE}
                element={<EditProfileHost />}
              />
              <Route path={PATHS.HOST.SPACE_LIST} element={<SpaceList />} />
              <Route path={PATHS.HOST.REVIEW} element={<HostReview />} />
              <Route path={PATHS.HOST.MAIN} element={<HostMainpage />} />
              <Route
                path={PATHS.HOST.SPACE_REGISTER}
                element={<HostSpaceRegister />}
              />
              <Route
                path={PATHS.HOST.SPACE_REGISTER_INFO}
                element={<HostSpaceRegisterInfo />}
              />
              <Route path={PATHS.HOST.CALENDAR} element={<HostCalendar />} />
              <Route path={`${PATHS.SPACE}/:spaceId`} element={<SpacePage />} />

              {/* 게스트 페이지 랜더링 */}
              <Route path={PATHS.GUEST.WISH_SPACE} element={<WishSpace />} />
              <Route path={PATHS.GUEST.MAIN} element={<GuestMainPage />} />
              <Route path={PATHS.GUEST.MYPAGE} element={<MypageGuest />} />
              <Route path={PATHS.GUEST.REVIEW} element={<GuestReview />} />
              <Route
                path={PATHS.GUEST.EDIT_PROFILE}
                element={<EditProfileGuest />}
              />
              <Route path={PATHS.GUEST.SEARCH} element={<GuestSearchPage />} />
              <Route path={PATHS.GUEST.RESULT} element={<GuestResultPage />} />
              <Route path={PATHS.GUEST.FILTER} element={<GuestFilterPage />} />
              <Route path={PATHS.GUEST.MAP} element={<GuestMapPage />} />
              <Route
                path={PATHS.GUEST.RESERVATIONS}
                element={<GuestReservePage />}
              />
              <Route
                path={`${PATHS.GUEST.RESERVATIONS}/:id`}
                element={<GuestReserveDetailPage />}
              />
              <Route
                path={PATHS.GUEST.SPACERESERVE}
                element={<SpaceReservePage />}
              />
              <Route
                path={PATHS.GUEST.RESERVECOMPLETED}
                element={<ReserveCompletePage />}
              />
              <Route
                path={`${PATHS.GUEST.MAP}/:id`}
                element={<SpaceMapPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
