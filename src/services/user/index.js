import { routes } from "../api-routes";
import { ErrorHandler } from "../errorHandler";
import httpService from "../httpService";
import useFetchItem from "../useFetchItem";

export const useGetUsers = ({ enabled = false }) => {
  const { isLoading, error, data, refetch, setFilter, filter } = useFetchItem({
    queryKey: ["fetchUsers"],
    queryFn: ({ page_number, per_page_size, params }) =>
      httpService.getData(
        routes.getAllUsers(page_number, per_page_size, params)
      ),
    enabled,
    retry: 1,
  });

  return {
    getUsersIsLoading: isLoading,
    getUsersData: data?.data || [],
    getUsersFilter: filter,
    getUsersError: ErrorHandler(error),
    refetchUsers: refetch,
    setUsersFilter: setFilter,
  };
};
