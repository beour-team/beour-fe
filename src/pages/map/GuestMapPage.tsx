import GuestFooter from "../../components/GuestFooter";
import MapView from "../../components/GuestMapPage/MapView";

const GuestMapPage = () => {
  return (
    <div className="">
      <div className="w-full h-screen">
        <MapView />
      </div>
      <GuestFooter />
    </div>
  );
};
export default GuestMapPage;
