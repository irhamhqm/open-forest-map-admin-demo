import { AllPilotsResponse } from "../types/api/pilot";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAllPilots: () => Promise<AllPilotsResponse> =  async () => {
    const response = await axios.get(`${baseUrl}/api/location/pilot`);
  
    return response.data;
  };