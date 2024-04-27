import {
  SilvanusCoord,
  PartialSilvanusGeoJson,
  LocationServiceDetail,
} from "../types";

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

const parseGeom = (payload: string) => {
  const arr = payload.substring(9, payload.length - 2).split(",");

  const res = arr.map((val) => {
    const temp = val.split(" ");
    return [Number(temp[0]), Number(temp[1])];
  });
  return res;
};

export const parseToGeojson = (payload: Raw | undefined) => {
  if (payload) {
    const res = payload.geometry.wkt.map((geom) => {
      return parseGeom(geom);
    });

    return {
      ...payload,
      geometry: { type: "Polygon", coordinates: res },
    } as LocationServiceDetail;
  }
};

export const sivalnusCoordToSilvanusGeo = ({
  coordinates,
  type,
}: {
  coordinates: SilvanusCoord[][];
  type: string;
}): PartialSilvanusGeoJson => {
  return {
    type: "Feature",
    geometry: {
      type,
      coordinates,
    },
  };
};

export const parseJsonToSilvanusCoord = (payload: number[][][]) => {
  const res = [
    payload[0].map((value) => {
      return { lat: Number(value[0]), lon: Number(value[1]) };
    }),
  ];
  return res;
};

// pass LatLng as string, easier to work with because the data returned from leaflet-geom
// can vary
export const parseStringToSilvanusCoord = (payload: string) => {
  console.log(payload);

  const arr = payload.split("),");
  const res = arr.map((str) => {
    const temp = str.match(/LatLng\((.*)/);
    return temp ? temp[1].replace(")", "") : "";
  });

  return [res.map((val) => ({ lat: Number(val[0]), lon: Number(val[1]) }))];
};
