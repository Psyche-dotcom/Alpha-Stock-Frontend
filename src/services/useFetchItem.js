import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useFetchItem({
  initialPage,
  initialPageSize,
  queryFn,
  queryKey,
  retry,
  enabled,
  initialFilter,
  isPaginated,
}) {
  const [pageNumber, setPageNumber] = useState(initialPage || 1);
  const [pageSize, setPageSize] = useState(initialPageSize || 10);
  const [filter, setFilter] = useState(initialFilter ?? {});

  const params = isPaginated ? { pageNumber, pageSize, ...filter } : filter;

  const query = useQuery({
    queryKey: [...queryKey, params, retry],
    queryFn: () => queryFn(params),
    retry: retry || false,
    enabled,
    keepPreviousData: isPaginated ? true : false,
  });

  return {
    ...query,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    setFilter,
  };
}
