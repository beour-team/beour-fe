import { Route, Routes } from "react-router-dom";
import { PATHS } from "./routes/paths";
import Layout from "./layouts/webApp-layout/Layout";
import Contents from "./layouts/contents-layout/Contents";
<<<<<<< HEAD
import GuestMainPage from "./pages/guest-main/GuestMainPage";
import GuestSearchPage from "./pages/guest-main/GuestSearchPage";
import GuestResultPage from "./pages/guest-main/GuestResultPage";
import GuestFilterPage from "./pages/guest-main/GuestFilterPage";
import HostMainpage from "./pages/host-main/HostMainpage";
=======
import GuestMainPage from "./pages/guest-main/main-guest/GuestMainPage";
import GuestSearchPage from "./pages/guest-main/search-guest/GuestSearchPage";
import GuestResultPage from "./pages/guest-main/result-guest/GuestResultPage";
import GuestFilterPage from "./pages/guest-main/filter/GuestFilterPage";
import Login from "./pages/login/Login";
import HostMainpage from "./pages/host-main/HostMainpage";
import SignUp from "./pages/signup/SignUp";
>>>>>>> 6ae2602b88f386c64e751234ef7118336ed4722c
import HostSpaceRegister from "./pages/HostSpaceRegister";
import HostSpaceRegisterInfo from "./pages/HostSpaceRegisterInfo";
import MypageHost from "./pages/mypage/host/MypageHost";
import GuestMapPage from "./pages/map/GuestMapPage";
import EditProfileHost from "./pages/editprofile/host/EditProfileHost";
import SpaceList from "./pages/spacelist/SpaceList";
import Review from "./pages/review/host/Review";
import WishSpace from "./pages/wishspace/WishSpace";
<<<<<<< HEAD
import SignUp from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";
=======
import GuestReservePage from "./pages/guest-reservation/GuestReservePage";
>>>>>>> 6ae2602b88f386c64e751234ef7118336ed4722c

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
<<<<<<< HEAD
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypagehost" element={<MypageHost />} />
            <Route path="/editprofilehost" element={<EditProfileHost />} />
            <Route path="/spacelist" element={<SpaceList />} />
            <Route path="/reviewhost" element={<Review />} />
            <Route path="/wishspace" element={<WishSpace />} />
            <Route path="/" element={<Home />} />
            <Route path="/hostmain" element={<HostMainpage />} />
            <Route path="/hostspaceregister" element={<HostSpaceRegister />} />
            <Route
              path="/hostspaceregisterinfo"
              element={<HostSpaceRegisterInfo />}
            />
            <Route path="/guest" element={<GuestMainPage />} />
            <Route path="/search" element={<GuestSearchPage />} />
            <Route path="/spaces" element={<GuestResultPage />} />
            <Route path="/filter" element={<GuestFilterPage />} />
            <Route path="/nearby" element={<GuestMapPage />} />
=======
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.SIGNUP} element={<SignUp />} />
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
            <Route path={PATHS.GUEST.WISH_SPACE} element={<WishSpace />} />
            <Route path={PATHS.GUEST.MAIN} element={<GuestMainPage />} />
            <Route path={PATHS.GUEST.SEARCH} element={<GuestSearchPage />} />
            <Route path={PATHS.GUEST.RESULT} element={<GuestResultPage />} />
            <Route path={PATHS.GUEST.FILTER} element={<GuestFilterPage />} />
            <Route path={PATHS.GUEST.MAP} element={<GuestMapPage />} />
            <Route
              path={PATHS.GUEST.RESERVATIONS}
              element={<GuestReservePage />}
            />
>>>>>>> 6ae2602b88f386c64e751234ef7118336ed4722c
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
