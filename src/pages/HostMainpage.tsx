import React from "react";
import HostHeader from "../components/HostMainPage/HostHeader";
import HostFooter from "../components/HostMainPage/HostFooter";
import HostReserveList from "../components/HostMainPage/HostReserveList";
import HelloProfile from "../components/HostMainPage/HelloProfile";
import Banner from "../components/HostMainPage/Banner";

const HostMainPage: React.FC = () => {
  return (
    <div>
      <HostHeader /> {/* 배너부분  */}
      <HelloProfile /> {/* 환영문구  */} 
      <Banner />
      <HostReserveList />
    </div>
  );
};

export default HostMainPage;

