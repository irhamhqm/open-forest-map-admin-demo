import axios from "axios";
import { LocationService, LocationServiceDetail } from "../types";
import { parseToGeojson } from "../util/";

const baseUrl = import.meta.env.VITE_API_URL;

export interface GetLocationServicesByLevelPayload {
  parent_id?: number;
  level: number;
}

export interface GetLocationServicesByLevelResponse {
  data: Array<LocationService>;
  meta: null;
  status: boolean;
}

export const getLocationServicesByLevel: (
  payload: GetLocationServicesByLevelPayload
) => Promise<GetLocationServicesByLevelResponse> = async (payload) => {
  const { level, parent_id } = payload;
  const response = await axios.get(
    `${baseUrl}/api/location_services/hierarchy`,
    {
      params: {
        level,
        parent_id,
      },
    }
  );

  return response.data;
};

export interface GetLocationServiceByIdPayload {
  id: string;
}

export interface GetLocationServiceByIdResponse {
  data: LocationServiceDetail | undefined;
  meta: null;
  status: true;
}

export const getLocationServiceById: (
  payload: GetLocationServiceByIdPayload
) => Promise<GetLocationServiceByIdResponse> = async (payload) => {
  const response = await axios.get(
    `${baseUrl}/api/location_services/${payload.id}`
  );

  const parsedGeoJSON = parseToGeojson(response.data.data);

  return {
    data: parsedGeoJSON,
    status: response.data.status,
    meta: response.data.meta,
  };
};
