import { useParams } from "react-router-dom";
import DataNavbar from "../../components/DataNavbar";
import { useGetSoilTypeDetail } from "../../hooks/api/data";
import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import { Map } from "leaflet";
import GeoJsonLayer from "../../components/GeoJsonLayer";
import { GeoJSONGeometry, parse } from "wellknown";

export default function SoilTypeDetailPage() {
  const { id = "" } = useParams();
  const mapRef = useRef<Map | null>(null);
  const { data, isLoading, isError } = useGetSoilTypeDetail(id);

  if (isLoading || isError) return <img src={"/spinner.svg"} />;

  return (
    <div style={{ padding: "2rem" }}>
      <DataNavbar />
      <div>
        <div>Soil Type ID: {data?.soil_type_id}</div>
        <div>Soil Type: {data?.soil_type}</div>
        <div>Soil Texture: {data?.soil_texture}</div>
        <div>Data Acquisition Date: {data?.temporal.acquired_date}</div>
      </div>
      Location{" : "}
      {data?.spatial.entity_name && <span>{data.spatial.entity_name}</span>}
      {data?.spatial.pilot_name && <span>{data.spatial.pilot_name}</span>}
      {data?.spatial.geom && (
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
      )}
    </div>
  );
}
