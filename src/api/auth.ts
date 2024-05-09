import axios from "axios";
import { SignInPayload, SignInResponse } from "../types/api/auth";

const baseUrl = import.meta.env.VITE_API_URL;

export const signIn: (payload: SignInPayload) => Promise<SignInResponse> = async (
    payload
  ) => {
    const res = await axios.post(`${baseUrl}/api/auth/login`, payload);
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    // } );
    
    return res.data;
  };