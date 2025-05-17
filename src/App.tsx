import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/webApp-layout/Layout";
import Contents from "./layouts/contents-layout/Contents";
import Login from "./pages/login/Login";

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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
