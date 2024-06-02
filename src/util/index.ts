import { LatLng } from "leaflet";
import {
  SilvanusCoord,
  PartialSilvanusGeoJson,
  LocationServiceDetail,
} from "../types";
import { GeoJSONPolygon, parse } from "wellknown";

type Raw = {
  geometry: {
    wkt: [string];
    type: string;
  };
  properties: {
    centroid: {
      lat: number;
      lon: number;
    };
    child_count: number;
    engtype: string;
    entity_code: string;
    level: number;
    name: string;
    parent_code?: number;
    polygon_count: number;
  };
  type: string;
};

// const parseGeom = (payload: string) => {
//   const arr = payload.substring(9, payload.length - 2).split(",");

//   const res = arr.map((val) => {
//     const temp = val.split(" ");
//     return [Number(temp[0]), Number(temp[1])];
//   });
//   return res;
// };

export const parseToGeojson = (payload: Raw | undefined) => {
  if (payload) {
    const res = payload.geometry.wkt.map((geom) => {
      const val = parse(geom) as GeoJSONPolygon;
      return val.coordinates;
    });

    return {
      ...payload,
      geometry: { type: "Polygon", coordinates: res.flat() },
    } as LocationServiceDetail;
  }
};

export const sivalnusCoordToSilvanusGeo = ({
  coordinates,
  type,
  area,
}: {
  coordinates: SilvanusCoord[][] | SilvanusCoord[] | SilvanusCoord;
  type: string;
  area: string;
}): PartialSilvanusGeoJson => {
  return {
    type: "Feature",
    geometry: {
      type,
      coordinates,
    },
    area: area,
  };
};

// export const parseJsonToSilvanusCoord = (payload: number[][][]) => {
//   const res = [
//     payload[0].map((value) => {
//       return { lat: Number(value[0]), lon: Number(value[1]) };
//     }),
//   ];
//   return res;
// };

// pass LatLng as string, easier to work with because the data returned from leaflet-geom
// can vary
export const parseToSilvanusCoord = (
  payload: LatLng | LatLng[] | LatLng[][] | LatLng[][][]
) => {
  if (Array.isArray(payload) && Array.isArray(payload[0])) {
    const res = payload[0].map((val) => {
      if (val instanceof LatLng) {
        return { lat: val.lat, lon: val.lng };
      }
      return { lat: 0, lon: 0 };
    });
    res.push(res[0]);
    if (Object.values(res).length !== res.length) return [];
    return res;
  }
  if (payload instanceof LatLng) {
    return [{ lat: payload.lat, lon: payload.lng }];
  }

  return [{ lat: 0, lon: 0 }];
  // const arr = payload.split("),");
  // const res = arr.map((str) => {
  //   const temp = str.match(/LatLng\((.*)/);
  //   return temp ? temp[1].replace(")", "") : "";
  // });
  // return [res.map((val) => ({ lat: Number(val[0]), lon: Number(val[1]) }))];
};
