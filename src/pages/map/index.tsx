import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Drawing from "../../components/Drawing";
import { useGetLocationServiceById } from "../../hooks/api";
import GeoJsonLayer from "../../components/GeoJsonLayer";
import {
  parseStringToSilvanusCoord,
  sivalnusCoordToSilvanusGeo,
} from "../../util";
import { Map } from "leaflet";
// import { useLocation } from "react-router-dom";
import store from "store2";
import { useGetPilotDetails } from "../../hooks/api/pilot";
import { GeoJSONGeometry, parse } from "wellknown";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [drawnObj, setDrawnObj] = useState({ type: "", coordinates: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showGeo, setShowGeo] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const userData = store.get("user_data");

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

  // useEffect(() => {
  //   if (userData.user_id) {
  //     console.log(userData.pilot_id);
  //   }
  // }, [userData.user_id, userData.pilot_id]);

  const { data: pilotData, isLoading: pilotLoading } = useGetPilotDetails(
    userData?.pilot_id
  );
  if (pilotData) {
    console.log({
      type: "Feature",
      geometry: parse(pilotData?.pilot_geom),
    });
  }

  useEffect(() => {
    if (pilotData?.centroid) {
      mapRef.current?.panTo([pilotData.centroid.lat, pilotData.centroid.lon]);
    }
  }, [pilotData?.centroid]);

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
      <div className="flex w-full p-4 h-16 bg-white">
        <div>
          Hello, {store.get("user_data").user_display_name},{" Pilot "}
          {pilotData?.pilot_name}
        </div>
        <button className="ml-auto border border-solid border-gray-600 p-1">
          View Data
        </button>
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="ml-2 border border-solid border-gray-600 p-1"
        >
          {drawerOpen ? "Close" : "Input Data"}
        </button>
      </div>
      <div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "calc(100vh - 4rem)" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pilotData && !pilotLoading && (
            <GeoJsonLayer
              data={{
                type: "Feature",
                geometry: parse(pilotData.pilot_geom) as GeoJSONGeometry,
              }}
              style={{
                color: "yellow",
              }}
            />
          )}
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
        {/* <button
          className="bg-white p-2 rounded-full fixed z-[1002] top-4 right-4"
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          {drawerOpen ? <Close /> : <Menu />}
        </button> */}
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
