import { AllPilotsResponse, PilotDetailsResponse } from "../types/api/pilot";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAllPilots: () => Promise<AllPilotsResponse> = async () => {
  const response = await axios.get(`${baseUrl}/api/location/pilot`);

  return response.data;
};

export const getPilotDetails: (
  payload: string | null
) => Promise<PilotDetailsResponse> = async (payload) => {
  const response = await axios.get(`${baseUrl}/api/location/pilot/${payload}`);

  return response.data;
};
