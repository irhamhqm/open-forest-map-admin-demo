import axios from "axios";
import {
  SignInPayload,
  SignInResponse,
  IsMeResponse,
  SignUpPayload,
  SignUpResponse,
} from "../types/api/auth";
import store from "store2";

const baseUrl = import.meta.env.VITE_API_URL;

export const signIn: (
  payload: SignInPayload
) => Promise<SignInResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/auth/login`, payload);

  return res.data;
};

export const signUp: (
  payload: SignUpPayload
) => Promise<SignUpResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/auth/register`, payload);

  return res.data;
};

export const getIsMe: () => Promise<IsMeResponse> = async () => {
  const token = store.get("token");

  const response = await axios.get(`${baseUrl}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
