import { AllFeaturesResponse } from "../types/api/feature";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAllFeatures: () => Promise<AllFeaturesResponse> =  async () => {
    const response = await axios.get(`${baseUrl}/api/features`);
  
    return response.data;
  };