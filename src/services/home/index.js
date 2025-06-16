import { routes } from "../api-routes";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";

export const useGetCompanies = ({ enabled = true }) => {
  const { isFetched, isLoading, error, data, refetch, isFetching, setFilter } =
    useFetchItem({
      queryKey: ["companies"],
      queryFn: (symbol) => {
        return httpService.getData(routes.getCompanies(symbol));
      },
      enabled,
      retry: 2,
      staleTime: 1000 * 60 * 60 * 12,
      cacheTime: 1000 * 60 * 60 * 12,
    });

  return {
    companiesIsLoading: isLoading,
    companiesData: data?.data?.result || [],
    companiesRefetch: refetch,
    companiesFilter: setFilter,
  };
};
