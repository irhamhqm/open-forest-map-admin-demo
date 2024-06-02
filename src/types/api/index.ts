import { LocationService, LocationServiceDetail, SilvanusCoord } from "..";

export interface GetLocationServicesByLevelPayload {
  parent_code?: string;
  level: number;
}

export interface GetLocationServicesByLevelResponse {
  data: Array<LocationService>;
  meta: null;
  status: boolean;
}

export interface GetLocationServiceByIdPayload {
  id: string;
}

export interface GetLocationServiceByIdResponse {
  data: LocationServiceDetail | undefined;
  meta: null;
  status: true;
}

export type FireEventPayload = FEPayloadJSON | FEPayloadShp;

type FEPayloadJSON = {
  type: string;
  properties: {
    daterange: string;
    fire_intensity: string;
    fire_size: string;
    fire_cause: string;
    fire_type: string;
    // pilot_id: number;
  };
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][] | SilvanusCoord[] | SilvanusCoord;
    // pilot: string;
  };
};

type FEPayloadShp = FormData;

export interface FireEventResponse {
  data: unknown;
  meta: unknown;
  status: boolean;
}

export type SoilTypePayload = STPayloadJSON | STPayloadShp;

type STPayloadJSON = {
  // shapefile: File;
  properties: {
    soil_type: string;
    soil_texture: string;
    datetime: string;
    // pilot_id: number;
  };
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][] | SilvanusCoord[] | SilvanusCoord;
    // pilot: string;
  };
  type: string;
};

type STPayloadShp = FormData;

export interface SoilTypeResponse {
  data: unknown;
  meta: unknown;
  status: true;
}
