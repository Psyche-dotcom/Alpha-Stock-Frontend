import { routes } from "../api-routes";
import useFetchItem from "../useFetchItem";
import axios from "axios";

export const useGetCompanies = ({ enabled = true }) => {
  const { isFetched, isLoading, error, data, refetch, isFetching, setFilter } =
    useFetchItem({
      queryKey: ["companies"],
      queryFn: () => {
        return axios.get(routes.getCompanies());
      },
      enabled,
      retry: 2,
      staleTime: 1000 * 60 * 60 * 12,
      cacheTime: 1000 * 60 * 60 * 12,
    });

  return {
    companiesIsLoading: isLoading,
    companiesData: data?.data || [],
    companiesRefetch: refetch,
    companiesFilter: setFilter,
  };
};
