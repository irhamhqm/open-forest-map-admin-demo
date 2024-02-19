import { LocationServiceDetail } from "../types";

type Raw = {
  // old method
  geometry: {
    coordinates: [
      {
        geom: string;
        regional_entity_id: number;
        regional_area_id: number;
      }
    ];
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
  // new method
  // geometry: {
  //   coordinates: [
  //     [
  //       {
  //         lat: string;
  //         lon: string;
  //       }
  //     ]
  //   ];
  //   type: string;
  // };
  // properties: {
  //   child_count: number | null;
  //   engtype: string;
  //   entity_code: string;
  //   level: number;
  //   name: number;
  //   parent_code: number | null;
  // };
  type: string;
};

// const parseGeom = (payload: { lat: string; lon: string }[][]): number[][][] => {
const parseGeom = (payload: string) => {
  // old method with old data type
  const arr = payload.substring(9, payload.length - 2).split(",");
  const res = arr.map((val) => {
    const temp = val.split(" ");
    return [Number(temp[0]), Number(temp[1])];
  });
  return res;

  // new method
  // const res = payload[0].map((val: { lat: string; lon: string }) => {
  //   return [Number(val.lat), Number(val.lon)];
  // });
  // return [res];
};

export const parseToGeojson = (payload: Raw | undefined) => {
  if (payload) {
    // old method with old data type
    const res = payload.geometry.coordinates.map((geom) => {
      return parseGeom(geom.geom);
    });
    // new method
    // const res = parseGeom(payload.geometry.coordinates);
    return {
      ...payload,
      geometry: { ...payload.geometry, coordinates: res },
    } as LocationServiceDetail;
  }
  // return null;
};
