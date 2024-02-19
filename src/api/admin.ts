import axios from "axios";
import {
  FireEvent,
  FireEventResponse,
  SoilType,
  SoilTypeResponse,
} from "../types/api/admin";

const baseUrl = import.meta.env.VITE_API_ADMIN_URL;

export const addFireEvents: (
  payload: FireEvent
) => Promise<FireEventResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/fire_events`, payload);
  return res.data;
};

export const addSoilType: (
  payload: SoilType
) => Promise<SoilTypeResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/soil_type`, payload);
  return res.data;
};
