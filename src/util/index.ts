import { LocationServiceDetail } from "../types";

const parseGeom = (geom: string) => {
  const arr = geom.substring(9, geom.length - 2).split(",");
  const res = arr.map((val) => {
    const temp = val.split(" ");
    return [Number(temp[0]), Number(temp[1])];
  });
  return res;
};

type Raw = {
  geometry: {
    coordinates: [
      {
        geom: string;
        regional_area_id: number;
        regional_entity_id: number;
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
  type: string;
};

export const parseToGeojson = (payload: Raw | undefined) => {
  if (payload) {
    const res = payload.geometry.coordinates.map((geom) => {
      return parseGeom(geom.geom);
    });
    console.log({
      ...payload,
      geometry: { ...payload.geometry, coordinates: res },
    });
    return {
      ...payload,
      geometry: { ...payload.geometry, coordinates: res },
    } as LocationServiceDetail;
  }
  // return null;
};
