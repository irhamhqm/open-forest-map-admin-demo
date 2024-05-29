import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import Drawing from "../../components/Drawing";
import { useGetLocationServiceById } from "../../hooks/api";
import GeoJsonLayer from "../../components/GeoJsonLayer";
import { parseToSilvanusCoord, sivalnusCoordToSilvanusGeo } from "../../util";
import { LatLng, Map } from "leaflet";
import store from "store2";
import { useGetPilotDetails } from "../../hooks/api/pilot";
import { GeoJSONGeometry, parse } from "wellknown";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import ReportBugButton from './components/ReportBugButton';
import Sidebar from "./components/SidebarMenu";
import Header from "./components/Header";

const admin_role = import.meta.env.VITE_NIMDA_ELOR.toLowerCase();
const sa_admin_role = import.meta.env.VITE_NIMDA_AS_ELOR.toLowerCase();

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [drawnObj, setDrawnObj] = useState<{
    type: string;
    coordinates: LatLng | LatLng[] | LatLng[][] | LatLng[][][];
  }>({ type: "", coordinates: [] });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showGeo, setShowGeo] = useState(false);
  const [isAnAdmin, setIsAnAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enableDrawingTools, setEnableDrawingTools] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const userData = store.get("user_data");
  const navigate = useNavigate();

  const location = useLocation();
  const serviceById = useGetLocationServiceById({ id: selectedLocation });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // CEK APAKAH USER SUDAH LOGIN
  useEffect(() => {
    if(!location?.state?.signedUp) {
      navigate('/signin')
    }
  }, [location?.state?.signedUp]);

  const partialFormattedSilvanusGeoJson = useMemo(() => {
    // let val = { coordinates: [[{ lat: 0, lon: 0 }]], type: "" };

    if (drawnObj.coordinates) {
      // val = {
      //   coordinates: parseToSilvanusCoord(drawnObj.coordinates),
      //   type: drawnObj.type,
      // };
      // console.log(val);

      return sivalnusCoordToSilvanusGeo({
        coordinates: parseToSilvanusCoord(drawnObj.coordinates),
        type: drawnObj.type,
      });
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
  // if (pilotData) {
  //   console.log({
  //     type: "Feature",
  //     geometry: parse(pilotData?.pilot_geom),
  //   });
  // }

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
    const currentRole = store.get("user_data")?.user_role?.toLowerCase();

    if (currentRole === admin_role || currentRole === sa_admin_role) {
      setIsAnAdmin(true);
    } else {
      setIsAnAdmin(false);
    }
  }, [location?.state?.signedUp]);

  useEffect(() => {
    if (activeTab !== 0) {
      setShowGeo(false);
    } else if (activeTab === 0) {
      setShowGeo(true);
      setDrawnObj({ type: "", coordinates: [] });
    }
  }, [activeTab]);

  console.log('serviceById.data: ', serviceById.data)

  return (
    <>
      {isAnAdmin ? (
        <>
          <div className="h-screen flex">
            <Sidebar 
              isOpen={isSidebarOpen} 
              toggleSidebar={toggleSidebar}
              setEnableDrawingTools={setEnableDrawingTools}
              setSelectedLocation={setSelectedLocation}
              setShowGeo={setShowGeo}
            />
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-96' : 'ml-16'}`}>
              <Header pilotData={pilotData} setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
              <div className="w-full">
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={10}
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
                  {serviceById.data && showGeo && (
                    <GeoJsonLayer 
                      data={serviceById.data}
                      style={{
                        color: "orange",
                      }}
                    />
                  )}
                  {enableDrawingTools && (
                    <FeatureGroup>
                      <Drawing
                        onCreate={(val) => setDrawnObj(val)}
                        activeTab={activeTab}
                      />
                    </FeatureGroup>
                  )}
                </MapContainer>
          
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
              <ReportBugButton/>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex-col flex justify-center items-center mt-[-60px]">
          <img src={"/silvanus_icon.jpg"} />
          <Alert
            variant="filled"
            severity="error"
            className="w-1/8 rounded-lg mt-[-60px]"
          >
            Sorry, you are a client. <br />
            You have no right for accessing this page.
            <br />
            Please use OFM Client Version.
          </Alert>
        </div>
      )}
    </>
  );
}

export default App;
