import { useQuery } from "@tanstack/react-query";
import { getAllPilots, getPilotDetails } from "../../api/pilot";

export const useGetAllPilots = () => {
  return useQuery({
    queryKey: ["useGetAllPilots"],
    queryFn: () => getAllPilots(),
    select: (response) => response,
  });
};

export const useGetPilotDetails = (payload: string | null) => {
  return useQuery({
    queryKey: ["pilotDetails", payload],
    queryFn: () => getPilotDetails(payload),
    select: ({ data }) => data,
    enabled: Boolean(payload),
  });
};
