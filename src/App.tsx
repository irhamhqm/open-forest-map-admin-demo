import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import SideDrawer from "./components/SideDrawer";
import Drawing from "./components/Drawing";
import { Close, Menu } from "@mui/icons-material";
import { useGetLocationServiceById } from "./hooks/api";
import GeoJsonLayer from "./components/GeoJsonLayer";
import {
  parseJsonToSilvanusCoord,
  parseStringToSilvanusCoord,
  sivalnusCoordToSilvanusGeo,
} from "./util";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [drawnObj, setDrawnObj] = useState({ type: "", coordinates: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showGeo, setShowGeo] = useState(false);

  const serviceById = useGetLocationServiceById({ id: selectedLocation });

  const partialFormattedSilvanusGeoJson = useMemo(() => {
    let val = { coordinates: [[{ lat: 0, lon: 0 }]], type: "" };
    if (serviceById.data?.geometry) {
      val = {
        coordinates: parseJsonToSilvanusCoord(
          serviceById.data.geometry.coordinates
        ),
        type: "Polygon",
      };
    }
    if (drawnObj.coordinates) {
      val = {
        coordinates: parseStringToSilvanusCoord(drawnObj.coordinates),
        type: drawnObj.type,
      };
    }
    return sivalnusCoordToSilvanusGeo(val);
  }, [serviceById.data?.geometry, drawnObj.coordinates, drawnObj.type]);

  useEffect(() => {
    if (activeTab === 0) {
      setShowGeo(false);
    } else if (activeTab === 1) {
      setShowGeo(true);
      setDrawnObj({ type: "", coordinates: "" });
    }
  }, [activeTab]);

  useEffect(() => {
    // parseStringToSilvanusCoord(coord);
    // if (serviceById.data) {
    // }
  }, [drawnObj, serviceById]);

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
        {serviceById.data && showGeo && drawerOpen && (
          <GeoJsonLayer data={serviceById.data} />
        )}
        {activeTab === 0 && (
          <FeatureGroup>
            <Drawing
              onCreate={(val) => setDrawnObj(val)}
              activeTab={activeTab}
            />
          </FeatureGroup>
        )}
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
          partialGeoJson={partialFormattedSilvanusGeoJson}
        />
      )}
    </>
  );
}

export default App;
