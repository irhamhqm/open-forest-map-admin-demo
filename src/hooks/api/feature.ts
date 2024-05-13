import { useQuery } from "@tanstack/react-query";
import { getAllFeatures } from "../../api/feature";

export const useGetAllFeatures = () => {
    return useQuery({
      queryKey:["useGetAllFeatures"],
      queryFn: () => getAllFeatures(),
      select: (response) => response,
    });
  };