import { GeoJSONPolygon } from "wellknown";

export interface LocationService {
  child_count: number;
  engtype: string;
  entity_code: string;
  level: number;
  name: string;
  parent_code: string;
}

export interface LocationServiceDetail {
  geometry: GeoJSONPolygon;
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
  type: "Feature";
}

export type SilvanusCoord = { lat: number; lon: number };

export type PartialSilvanusGeoJson = {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][];
  };
};
