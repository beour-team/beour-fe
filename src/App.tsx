import { Route, Routes } from "react-router-dom";

// 테스트용 으로 적어둔거에요!!
function Home() {
  return <h1 className="text-2xl font-bold">홈 화면</h1>;
}

function Login() {
  return (
    <h1 className="text-2xl text-gray-500 border border-black">로그인 화면</h1>
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* 아래 두개 지우셔도 무방합니다 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

// 폴더 구조는 필요할까봐 다 넣어놨습니다.
// 불필요하다 싶은건 말씀해주세요
