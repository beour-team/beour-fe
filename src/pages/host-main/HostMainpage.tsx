import React from "react";
import HostHeader from "./HostHeader";
import HostFooter from "../../components/footer/HostFooter";
import HostReserveList from "../../components/HostMainPage/HostReserveList";
import HelloProfile from "../../components/HelloProfile";
import Banner from "../../components/HostMainPage/Banner";

const HostMainPage: React.FC = () => {
  return (
    <div>
      <div className="px-[2rem] overflow-x-hidden">
        <HostHeader /> {/* 배너부분  */}
        <HelloProfile userType="host" /> {/* 환영문구  */}
        <Banner /> {/* 광고배너  */}
      </div>
      <HostReserveList /> {/* 예약내역  */}
      <HostFooter /> {/* 푸터 */}
    </div>
  );
};

export default HostMainPage;
