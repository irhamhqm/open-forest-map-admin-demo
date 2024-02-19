import axios from "axios";
import {
  GetLocationServiceByIdPayload,
  GetLocationServiceByIdResponse,
  GetLocationServicesByLevelPayload,
  GetLocationServicesByLevelResponse,
} from "../types/api";
import { parseToGeojson } from "../util";

const baseUrl = import.meta.env.VITE_API_URL;

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
