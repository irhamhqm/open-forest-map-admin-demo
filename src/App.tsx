import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
// import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import SideDrawer from "./components/SideDrawer";
import Drawing from "./components/Drawing";
import { Close, Menu } from "@mui/icons-material";
import { useGetLocationServiceById } from "./hooks/api";
import GeoJsonLayer from "./components/geojson";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [coord, setCoord] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const serviceById = useGetLocationServiceById({ id: selectedLocation });

  useEffect(() => {
    console.log(coord);
  }, [coord]);

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {serviceById.data && <GeoJsonLayer data={serviceById.data} />}
        {activeTab === 0 && (
          <FeatureGroup>
            <Drawing
              onCreate={setCoord}
              activeTab={activeTab}
            />
          </FeatureGroup>
        )}
        {/* <GeoJSON data={serviceById.data?.geometry}></GeoJSON> */}
      </MapContainer>
      <button
        className="bg-white p-2 rounded-full fixed z-[1002] top-4 right-4"
        onClick={() => setDrawerOpen((prev) => !prev)}
      >
        {drawerOpen ? <Close /> : <Menu />}
      </button>
      {drawerOpen && (
        <SideDrawer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSelectedLocation={setSelectedLocation}
          loading={serviceById.isLoading}
        />
      )}
    </>
  );
}

export default App;
