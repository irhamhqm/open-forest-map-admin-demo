export interface LocationService {
  child_count: number;
  engtype: string;
  entity_code: string;
  level: number;
  name: string;
  parent_code: string;
}

export interface LocationServiceDetail {
  geometry: {
    coordinates: number[][][];
    type: string;
  };
  properties: {
    centroids: [];
    child_count: number;
    engtype: string;
    entity_code: string;
    level: number;
    name: string;
    parent_code?: number;
    polygon_count: number;
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
}

export type SilvanusCoord = { lat: number; lon: number };

export type PartialSilvanusGeoJson = {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][];
    pilot?: string;
  };
};
