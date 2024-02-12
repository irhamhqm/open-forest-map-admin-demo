import axios from "axios";
import { LocationService } from "../types";

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
  data: {
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
  meta: null;
  status: true;
}

export const getLocationServiceById: (
  payload: GetLocationServiceByIdPayload
) => Promise<GetLocationServiceByIdResponse> = async (payload) => {
  const response = await axios.get(
    `${baseUrl}/api/location_services/${payload.id}`
  );

  return response.data;
};
