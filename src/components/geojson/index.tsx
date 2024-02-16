// import { useEffect } from "react";
import {
  GeoJSON,
  // useMap
} from "react-leaflet";
// import * as L from "leaflet";

export default function GeoJsonLayer({
  data,
}: {
  data: {
    geometry: {
      coordinates: number[][][];
      type: string;
    };
    properties: {
      meta: {
        code: string;
      };
      name: string;
      parent_id: number;
      regional_entity_id: number;
      type: string;
    };
    type:
      | "Point"
      | "MultiPoint"
      | "LineString"
      | "MultiLineString"
      | "Polygon"
      | "MultiPolygon"
      | "GeometryCollection"
      | "Feature"
      | "FeatureCollection";
  };
}) {
  // const map = useMap();

  // useEffect(() => {
  //   map.panTo(
  //     new L.LatLng(
  //       data.geometry.coordinates[0][0][0],
  //       data.geometry.coordinates[0][0][1]
  //     )
  //   );
  // }, [data.geometry.coordinates, map]);

  return <GeoJSON data={data} />;
}
