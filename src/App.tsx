import { MapContainer, TileLayer } from "react-leaflet";
// import { CssBaseline } from "@mui/material";
import React from "react";
import SideDrawer from "./components/SideDrawer";
import Drawing from "./components/Drawing";

function App() {
  // const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <>
      {/* <CssBaseline /> */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <Drawing />
      </MapContainer>
      <React.Fragment key={"right"}>
        <SideDrawer
        // open={drawerOpen}
        // onClose={() => setDrawerOpen(false)}
        />
      </React.Fragment>
    </>
  );
}

export default App;
