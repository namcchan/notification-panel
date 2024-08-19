import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useReadNotification = (
  options?: UseMutationOptions<unknown, unknown, { id: string }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      return await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
    ...options,
  });
};
