import React from "react";
import HostHeader from "../../components/HostMainPage/HostHeader";
import HostFooter from "../../components/HostMainPage/HostFooter";
import HostReserveList from "../../components/HostMainPage/HostReserveList";
import HelloProfile from "../../components/GuestMainPage/HelloProfile";
import Banner from "../../components/HostMainPage/Banner";

const HostMainPage: React.FC = () => {
  return (
    <div>
      <HostHeader /> {/* 배너부분  */}
      <div className="px-[2rem] overflow-x-hidden">
      <HelloProfile /> {/* 환영문구  */} 
      </div>
      <Banner /> {/* 광고배너  */} 
      <HostReserveList /> {/* 예약내역  */} 
      <HostFooter /> {/* 푸터 */}
    </div>
  );
};

export default HostMainPage;

