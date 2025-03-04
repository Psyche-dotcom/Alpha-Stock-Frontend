import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutateItem({
  mutationFn,
  onSuccess,
  queryKeys,
  onError,
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => mutationFn(payload),
    onSuccess: (res) => {
      onSuccess?.(res);
      queryKeys?.map((query) =>
        queryClient.invalidateQueries({ queryKey: [query] })
      );
    },
    onError: onError,
  });

  return mutation;
}
