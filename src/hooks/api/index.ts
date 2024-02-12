import { useQuery } from "@tanstack/react-query";
import {
  GetLocationServiceByIdPayload,
  GetLocationServicesByLevelPayload,
  getLocationServiceById,
  getLocationServicesByLevel,
} from "../../api";

export const useGetLocationServicesByLevel = (
  payload: GetLocationServicesByLevelPayload
) => {
  const { parent_id, level } = payload;
  return useQuery({
    queryKey: ["location_services_by_level", parent_id, level],
    queryFn: () => getLocationServicesByLevel(payload),
    select: ({ data }) => data,
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
  });
};
