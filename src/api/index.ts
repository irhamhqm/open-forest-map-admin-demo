import axios from "axios";
import {
  FireEventPayload,
  FireEventResponse,
  GetLocationServiceByIdPayload,
  GetLocationServiceByIdResponse,
  GetLocationServicesByLevelPayload,
  GetLocationServicesByLevelResponse,
  SoilTypePayload,
  SoilTypeResponse,
} from "../types/api";
import { parseToGeojson } from "../util";

const baseUrl = import.meta.env.VITE_API_URL;

export const getLocationServicesByLevel: (
  payload: GetLocationServicesByLevelPayload
) => Promise<GetLocationServicesByLevelResponse> = async (payload) => {
  const { level, parent_code } = payload;
  const response = await axios.get(
    `${baseUrl}/api/location_services/hierarchy`,
    {
      params: {
        level,
        parent_code,
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

export const addFireEvent: (
  payload: FireEventPayload
) => Promise<FireEventResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/fire_events`, payload);
  return res.data;
};

export const addSoilType: (
  payload: SoilTypePayload
) => Promise<SoilTypeResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/soil_types`, payload);
  return res.data;
};

export const addPolicies: (payload: FormData) => Promise<unknown> = async (
  payload
) => {
  const res = await axios.post(`${baseUrl}/api/policies`, payload);
  return res.data;
};

export const addPrograms: (payload: FormData) => Promise<unknown> = async (
  payload
) => {
  const res = await axios.post(`${baseUrl}/api/programs`, payload);
  return res.data;
};
