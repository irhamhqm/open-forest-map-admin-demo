import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteFireEvent,
  deleteProgram,
  deleteRegulation,
  deleteSoilType,
  getFireEventDetail,
  getFireEventList,
  getProgram,
  getProgramDetail,
  getRegulation,
  getRegulationDetail,
  getSoilTypeDetail,
  getSoilTypeList,
} from "../../api/data";

export function useGetFireEventList() {
  return useQuery({
    queryKey: ["fire_event_list"],
    queryFn: () => getFireEventList(),
    select: ({ data }) => data,
    gcTime: 0,
  });
}

export function useGetFireEventDetail(payload: string) {
  return useQuery({
    queryKey: ["fire_event_detail", payload],
    queryFn: () => getFireEventDetail(payload),
    select: ({ data }) => data,
  });
}

export function useDeleteFireEvent() {
  return useMutation({
    mutationKey: ["delete_fire_event"],
    mutationFn: (payload: string) => deleteFireEvent(payload),
  });
}

export function useGetSoilTypeList() {
  return useQuery({
    queryKey: ["soil_type_list"],
    queryFn: () => getSoilTypeList(),
    select: ({ data }) => data,
    gcTime: 0,
  });
}

export function useGetSoilTypeDetail(payload: string) {
  return useQuery({
    queryKey: ["soil_type_detail", payload],
    queryFn: () => getSoilTypeDetail(payload),
    select: ({ data }) => data,
  });
}

export function useDeleteSoilType() {
  return useMutation({
    mutationKey: ["delete_soil_type"],
    mutationFn: (payload: string) => deleteSoilType(payload),
  });
}

export function useGetRegulationList() {
  return useQuery({
    queryKey: ["regulation_list"],
    queryFn: () => getRegulation(),
    select: ({ data }) => data,
    gcTime: 0,
  });
}

export function useGetRegulationDetail(payload: string) {
  return useQuery({
    queryKey: ["regulation_detail", payload],
    queryFn: () => getRegulationDetail(payload),
    select: ({ data }) => data,
  });
}

export function useDeleteRegulation() {
  return useMutation({
    mutationKey: ["delete_regulation"],
    mutationFn: (payload: string) => deleteRegulation(payload),
  });
}

export function useGetProgramList() {
  return useQuery({
    queryKey: ["program_list"],
    queryFn: () => getProgram(),
    select: ({ data }) => data,
    gcTime: 0,
  });
}

export function useGetProgramDetail(payload: string) {
  return useQuery({
    queryKey: ["program_detail", payload],
    queryFn: () => getProgramDetail(payload),
    select: ({ data }) => data,
  });
}

export function useDeleteProgram() {
  return useMutation({
    mutationKey: ["delete_program"],
    mutationFn: (payload: string) => deleteProgram(payload),
  });
}
