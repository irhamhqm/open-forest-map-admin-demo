import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import SideDrawer from "./components/SideDrawer";
import Drawing from "./components/Drawing";
import { Close, Menu } from "@mui/icons-material";
import { useGetLocationServiceById } from "./hooks/api";
import GeoJsonLayer from "./components/GeoJsonLayer";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [drawnObj, setDrawnObj] = useState({ type: "", coordinates: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showGeo, setShowGeo] = useState(false);

  const serviceById = useGetLocationServiceById({ id: selectedLocation });

  // const partialFormattedSilvanusGeoJson = useMemo(() => {
  //   console.log(serviceById.data);

  //   let val = {};
  //   if (serviceById.data?.geometry) {
  //     val = {
  //       geometry: serviceById.data.geometry,
  //       type: serviceById.data.type,
  //     };
  //   }
  //   // if (drawnObj.coordinates) {
  //   //   val = {
  //   //     coordinates: parseStringToSilvanusCoord(drawnObj.coordinates),
  //   //     type: drawnObj.type,
  //   //   };
  //   //   console.log(parseStringToSilvanusCoord(drawnObj.coordinates));
  //   // }
  //   // return sivalnusCoordToSilvanusGeo(val);
  //   return val;
  // }, [serviceById.data?.geometry, drawnObj.coordinates, drawnObj.type]);

  useMemo(() => {
    console.log(serviceById.data);

    // console.log(selectedLocation, {
    //   type: "Polygon",
    //   geometry: serviceById?.data?.geometry,
    // });
  }, [selectedLocation, serviceById.data]);

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
          partialGeoJson={{}}
        />
      )}
    </>
  );
}

export default App;
