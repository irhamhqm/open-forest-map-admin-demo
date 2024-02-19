import { useQuery } from "@tanstack/react-query";
import { getLocationServiceById, getLocationServicesByLevel } from "../../api/";
import {
  GetLocationServiceByIdPayload,
  GetLocationServicesByLevelPayload,
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
  const { parent_id, level } = payload;
  return useQuery({
    queryKey: ["location_services_by_level", parent_id, level],
    queryFn: () => getLocationServicesByLevel(payload),
    select: ({ data }) => data,
    enabled: Boolean(parent_id) && Boolean(level),
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
