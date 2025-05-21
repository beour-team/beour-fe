import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/webApp-layout/Layout";
import Contents from "./layouts/contents-layout/Contents";
import GuestMainPage from "./pages/GuestMainPage";
import GuestSearchPage from "./pages/GuestSearchPage";

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
            <Route path="/" element={<Home />} />
            <Route path="/guest" element={<GuestMainPage />} />{" "}
            {/* 게스트 메인화면 엔드포인트 뭔가요 */}
            <Route path="/search" element={<GuestSearchPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
