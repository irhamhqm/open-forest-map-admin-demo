import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import SideDrawer from "./components/SideDrawer";
import Drawing from "./components/Drawing";
import { Close, Menu } from "@mui/icons-material";
import { useGetLocationServiceById } from "./hooks/api";
import GeoJsonLayer from "./components/GeoJsonLayer";
import { parseStringToSilvanusCoord, sivalnusCoordToSilvanusGeo } from "./util";
import { Map } from "leaflet";
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import store from 'store2'


function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [drawnObj, setDrawnObj] = useState({ type: "", coordinates: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showGeo, setShowGeo] = useState(false);
  const mapRef = useRef<Map | null>(null);

  const location = useLocation();

  const serviceById = useGetLocationServiceById({ id: selectedLocation });

  const partialFormattedSilvanusGeoJson = useMemo(() => {
    let val = { coordinates: [[{ lat: 0, lon: 0 }]], type: "" };

    if (drawnObj.coordinates) {
      val = {
        coordinates: parseStringToSilvanusCoord(drawnObj.coordinates),
        type: drawnObj.type,
      };
      return sivalnusCoordToSilvanusGeo(val);
    }

    return null;
  }, [drawnObj.coordinates, drawnObj.type]);

  useEffect(() => {
    if (serviceById.data?.properties.centroid) {
      mapRef.current?.panTo([
        serviceById.data?.properties.centroid.lat,
        serviceById.data?.properties.centroid.lon,
      ]);
    }
  }, [serviceById.data?.properties.centroid]);

  useEffect(() => {
    if (activeTab === 0) {
      setShowGeo(false);
    } else if (activeTab === 1) {
      setShowGeo(true);
      setDrawnObj({ type: "", coordinates: "" });
    }
  }, [activeTab]);

  return (
    <>
      <div>
        {location?.state?.signedUp && (
          <Alert severity="success">Hello, {store.get("user_data").user_display_name}</Alert>
        )}
      </div>
      <div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100vh" }}
          ref={mapRef}
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
      </div>    
    </>
  );
}

export default App;
