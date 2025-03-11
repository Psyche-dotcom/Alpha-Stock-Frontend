import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import useFetchItem from "../useFetchItem";
import httpService from "../httpService";
import useMutateItem from "../useMutateItem";

export const useGetAllSubPlan = ({ enabled = true }) => {
  const { isFetched, isLoading, error, data, refetch, isFetching, setFilter } =
    useFetchItem({
      queryKey: ["plan"],
      queryFn: () => {
        return httpService.getData(routes.retrievePlans());
      },
      enabled,
      retry: 2,
    });
  return {
    isPlanFetching: isFetching,
    isPlanLoading: isLoading,
    planData: data?.data || {},
    planError: ErrorHandler(error),
    refetchPlanData: refetch,
  };
};
