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
import axiosAuthInstance from "../util/axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getLocationServicesByLevel: (
  payload: GetLocationServicesByLevelPayload
) => Promise<GetLocationServicesByLevelResponse> = async (payload) => {
  const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/location/administrative`,
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
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/location/administrative/${payload.id}`
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
  const res = await axiosAuthInstance().post(
    `${baseUrl}/api/admin/add_fire_events`,
    payload
  );
  return res.data;
};

export const addSoilType: (
  payload: SoilTypePayload
) => Promise<SoilTypeResponse> = async (payload) => {
  const res = await axiosAuthInstance().post(
    `${baseUrl}/api/admin/add_soil_types`,
    payload
  );
  return res.data;
};

export const addPolicies: (payload: FormData) => Promise<unknown> = async (
  payload
) => {
  const res = await axiosAuthInstance().post(
    `${baseUrl}/api/admin/add_regulations`,
    payload
  );
  return res.data;
};

export const addPrograms: (payload: FormData) => Promise<unknown> = async (
  payload
) => {
  const res = await axiosAuthInstance().post(
    `${baseUrl}/api/admin/add_programs`,
    payload
  );
  return res.data;
};
