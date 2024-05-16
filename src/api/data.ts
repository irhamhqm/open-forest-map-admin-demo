import {
  FireEventDetail,
  FireEventList,
  ProgramDetail,
  ProgramList,
  RegulationDetail,
  RegulationList,
  SoilTypeDetail,
  SoilTypeList,
} from "../types/api/data";
import axiosAuthInstance from "../util/axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getFireEventList: () => Promise<FireEventList> = async () => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_fire_events`
  );

  return response.data;
};

export const getFireEventDetail: (
  payload: string
) => Promise<FireEventDetail> = async (payload) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_fire_events/${payload}`
  );

  return response.data;
};

export const deleteFireEvent: (payload: string) => Promise<unknown> = async (
  payload
) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().delete(
    `${baseUrl}/api/admin/delete_fire_events/${payload}`
  );

  return response.data;
};

export const getSoilTypeList: () => Promise<SoilTypeList> = async () => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_soil_types`
  );

  return response.data;
};

export const getSoilTypeDetail: (
  payload: string
) => Promise<SoilTypeDetail> = async (payload) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_soil_types/${payload}`
  );

  return response.data;
};

export const deleteSoilType: (payload: string) => Promise<unknown> = async (
  payload
) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().delete(
    `${baseUrl}/api/admin/delete_soil_types/${payload}`
  );

  return response.data;
};

export const getProgram: () => Promise<ProgramList> = async () => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_programs`
  );

  return response.data;
};

export const getProgramDetail: (
  payload: string
) => Promise<ProgramDetail> = async (payload) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_programs/${payload}`
  );

  return response.data;
};

export const deleteProgram: (payload: string) => Promise<unknown> = async (
  payload
) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().delete(
    `${baseUrl}/api/admin/delete_programs/${payload}`
  );

  return response.data;
};

export const getRegulation: () => Promise<RegulationList> = async () => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_regulations`
  );

  return response.data;
};

export const getRegulationDetail: (
  payload: string
) => Promise<RegulationDetail> = async (payload) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().get(
    `${baseUrl}/api/admin/get_regulations/${payload}`
  );

  return response.data;
};

export const deleteRegulation: (payload: string) => Promise<unknown> = async (
  payload
) => {
  // const { level, parent_code } = payload;
  const response = await axiosAuthInstance().delete(
    `${baseUrl}/api/admin/delete_regulations/${payload}`
  );

  return response.data;
};
