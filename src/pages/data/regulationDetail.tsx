import { useParams } from "react-router-dom";
import DataNavbar from "../../components/DataNavbar";
import { useGetRegulationDetail } from "../../hooks/api/data";
// import { MapContainer, TileLayer } from "react-leaflet";
// import { useRef } from "react";
// import { Map } from "leaflet";
// import GeoJsonLayer from "../../components/GeoJsonLayer";
// import { GeoJSONGeometry, parse } from "wellknown";

export default function RegulationDetailpage() {
  const { id = "" } = useParams();
  // const mapRef = useRef<Map | null>(null);
  const { data, isLoading, isError } = useGetRegulationDetail(id);

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <div style={{ padding: "2rem" }}>
      <DataNavbar />
      <div>
        <div>Regulation ID: {data?.regulation_id}</div>
        <div>Regulation Name: {data?.regulation_name}</div>
        <div>Regulation Description: {data?.regulation_description}</div>
        {/* <div>Regulation Size: {data?.program_size}</div> */}
        {/* <div>Regulation Budget: {data?.program_budget}</div> */}
        <div>Regulation Start Date: {data?.temporal.acquired_date}</div>
        {/* <div>Regulation End Date: {data?.temporal.to_date}</div> */}
        <div>
          Regulation File:{" "}
          {data?.regulation_file_path && (
            <a
              className="text-blue-700"
              download
              href={data?.regulation_file_path}
              target="_blank"
            >
              Download
            </a>
          )}
        </div>
        <div>
          Regulation English File:{" "}
          {data?.regulation_engfile_path && (
            <a
              className="text-blue-700"
              download
              href={data?.regulation_engfile_path}
              target="_blank"
            >
              Download
            </a>
          )}
        </div>
      </div>
      Location{" : "}
      {data?.spatial.entity_name && <span>{data.spatial.entity_name}</span>}
      {data?.spatial.pilot_name && <span>{data.spatial.pilot_name}</span>}
      {/* {data?.spatial.geom && (
        <div className="w-[700px] h-[500px]">
          <MapContainer
            // center={[data?.spatial., -0.09]}
            center={[data.centroid.lat, data.centroid.lon]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJsonLayer
              data={{
                type: "Feature",
                geometry: parse(data.spatial.geom) as GeoJSONGeometry,
              }}
              style={{
                color: "yellow",
              }}
            />
          </MapContainer>
        </div>
      )} */}
    </div>
  );
}
