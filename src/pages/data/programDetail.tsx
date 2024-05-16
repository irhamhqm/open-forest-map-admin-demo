import { useParams } from "react-router-dom";
import DataNavbar from "../../components/DataNavbar";
import { useGetProgramDetail } from "../../hooks/api/data";
// import { MapContainer, TileLayer } from "react-leaflet";
// import { useRef } from "react";
// import { Map } from "leaflet";
// import GeoJsonLayer from "../../components/GeoJsonLayer";
// import { GeoJSONGeometry, parse } from "wellknown";

export default function ProgramDetailPage() {
  const { id = "" } = useParams();
  // const mapRef = useRef<Map | null>(null);
  const { data, isLoading, isError } = useGetProgramDetail(id);

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <div style={{ padding: "2rem" }}>
      <DataNavbar />
      <div>
        <div>Programme ID: {data?.program_id}</div>
        <div>Programme Name: {data?.program_name}</div>
        <div>Programme Description: {data?.program_description}</div>
        <div>Programme Size: {data?.program_size}</div>
        <div>Programme Budget: {data?.program_budget}</div>
        <div>Programme Start Date: {data?.temporal.from_date}</div>
        <div>Programme End Date: {data?.temporal.to_date}</div>
        <div>
          Programme File:{" "}
          {data?.program_file_path && (
            <a
              className="text-blue-700"
              download
              href={data?.program_file_path}
              target="_blank"
            >
              Download
            </a>
          )}
        </div>
        <div>
          Programme English File:{" "}
          {data?.program_engfile_path && (
            <a
              className="text-blue-700"
              download
              href={data?.program_engfile_path}
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
