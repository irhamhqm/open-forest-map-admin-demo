export interface LocationService {
  child_count: number;
  level: number;
  meta: {
    code: string;
    country_aff: string;
    iso: string;
    iso_aff: string;
    shape_area: number;
    shape_len: number;
  };
  name: number;
  parent_id?: number;
  regional_entity_id: number;
  type: string;
}

export interface LocationServiceDetail {
  geometry: {
    coordinates: number[][][];
    type: string;
  };
  // old method
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
  // properties: {
  //   child_count: number | null;
  //   engtype: string;
  //   entity_code: string;
  //   level: number;
  //   name: number;
  //   parent_code: number | null;
  // };
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
}
