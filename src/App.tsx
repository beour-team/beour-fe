import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/webApp-layout/Layout";
import Contents from "./layouts/contents-layout/Contents";
import GuestMainPage from "./pages/guest-main/GuestMainPage";
import GuestSearchPage from "./pages/guest-main/GuestSearchPage";
import GuestResultPage from "./pages/guest-main/GuestResultPage";
import GuestFilterPage from "./pages/guest-main/GuestFilterPage";
import HostMainpage from "./pages/host-main/HostMainpage";
import HostSpaceRegister from "./pages/HostSpaceRegister";
import HostSpaceRegisterInfo from "./pages/HostSpaceRegisterInfo";
import MypageHost from "./pages/mypage/host/MypageHost";
import GuestMapPage from "./pages/map/GuestMapPage";
import EditProfileHost from "./pages/editprofile/host/EditProfileHost";
import SpaceList from "./pages/spacelist/SpaceList";
import Review from "./pages/review/host/Review";
import WishSpace from "./pages/wishspace/WishSpace";
import SignUp from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";

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
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
