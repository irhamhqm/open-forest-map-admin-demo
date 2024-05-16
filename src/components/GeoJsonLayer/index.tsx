// import { useEffect } from "react";
import { StyleFunction } from "leaflet";
import {
  GeoJSON,
  //  useMap
} from "react-leaflet";
// import { LocationServiceDetail } from "../../types";
import { GeoJSONFeature } from "wellknown";
// import * as L from "leaflet";

export default function GeoJsonLayer({
  data,
  style,
}: {
  data: GeoJSONFeature;
  style?: unknown;
}) {
  // const map = useMap();

  // useEffect(() => {
  //   map.panTo(
  //     new L.LatLng(
  //       data.geometry.coordinates[0][
  //         Math.floor(data.geometry.coordinates[0].length / 2)
  //       ][0],
  //       data.geometry.coordinates[0][
  //         Math.floor(data.geometry.coordinates[0].length / 2)
  //       ][1]
  //     )
  //   );
  // }, [data.geometry.coordinates, map]);

  return (
    <GeoJSON
      data={data}
      style={style as StyleFunction}
    />
  );
}
