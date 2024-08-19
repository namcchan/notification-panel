import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReadAllNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return fetch(`/api/notifications`, {
        method: 'PUT',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });
};
