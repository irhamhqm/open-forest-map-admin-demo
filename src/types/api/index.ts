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

export interface FireEventPayload {
  type: string;
  properties: {
    temporal: {
      datetime: number;
    };
    data: {
      name: string;
      value: number;
      size: number;
    };
  };
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][];
    pilot: string;
  };
}

export interface FireEventResponse {
  data: {
    name: string;
    size: number;
    value: number;
  };
  meta: unknown;
  status: boolean;
}

export interface SoilTypePayload {
  type: string;
  properties: {
    temporal: {
      datetime: number;
    };
    data: {
      name: string;
      description: string;
    };
  };
  geometry: {
    type: string;
    coordinates: SilvanusCoord[][];
    pilot: string;
  };
}

export interface SoilTypeResponse {
  data: {
    description: string;
    name: string;
  };
  meta: unknown;
  status: true;
}
