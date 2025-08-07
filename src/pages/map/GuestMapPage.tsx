import GuestFooter from "../../components/footer/GuestFooter";
import MapView from "./MapView";

const GuestMapPage = () => {
  return (
    <div>
      <div className="w-full h-screen">
        <MapView />
      </div>
      <GuestFooter />
    </div>
  );
};
export default GuestMapPage;
