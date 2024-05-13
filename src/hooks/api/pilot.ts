import { useQuery } from "@tanstack/react-query";
import { getAllPilots } from "../../api/pilot";

export const useGetAllPilots = () => {
    return useQuery({
      queryKey:["useGetAllPilots"],
      queryFn: () => getAllPilots(),
      select: (response) => response,
    });
  };