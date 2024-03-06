import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFireEvent,
  addPolicies,
  addPrograms,
  addSoilType,
  getLocationServiceById,
  getLocationServicesByLevel,
} from "../../api/";
import {
  FireEventPayload,
  GetLocationServiceByIdPayload,
  GetLocationServicesByLevelPayload,
  SoilTypePayload,
} from "../../types/api";

export const useGetLocationServicesLevel0 = () => {
  return useQuery({
    queryKey: ["location_services__level_0"],
    queryFn: () => getLocationServicesByLevel({ level: 0 }),
    select: ({ data }) => data,
  });
};

export const useGetLocationServicesByLevel = (
  payload: GetLocationServicesByLevelPayload
) => {
  const { parent_code, level } = payload;
  return useQuery({
    queryKey: ["location_services_by_level", parent_code, level],
    queryFn: () => getLocationServicesByLevel(payload),
    select: ({ data }) => data,
    enabled: Boolean(parent_code) && Boolean(level),
  });
};

export const useGetLocationServiceById = (
  payload: GetLocationServiceByIdPayload
) => {
  return useQuery({
    queryKey: ["location_service_by_id", payload.id],
    queryFn: () => getLocationServiceById(payload),
    enabled: Boolean(payload.id),
    select: ({ data }) => data,
    gcTime: 0,
  });
};

export const usePostFireEvent = () => {
  return useMutation({
    mutationKey: ["fire_event"],
    mutationFn: (payload: FireEventPayload) => addFireEvent(payload),
  });
};

export const usePostSoilType = () => {
  return useMutation({
    mutationKey: ["soil_type"],
    mutationFn: (payload: SoilTypePayload) => addSoilType(payload),
  });
};

export const usePostPrograms = () => {
  return useMutation({
    mutationKey: ["programs"],
    mutationFn: (payload: FormData) => addPrograms(payload),
  });
};

export const usePostPolicies = () => {
  return useMutation({
    mutationKey: ["policies"],
    mutationFn: (payload: FormData) => addPolicies(payload),
  });
};
