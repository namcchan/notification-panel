import { Notification } from '@prisma/client';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useNotificationQuery = (
  options?: Omit<UseQueryOptions<unknown, unknown, Notification[]>, 'queryFn'>
) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await fetch('/api/notifications');
      const result = await response.json();
      return result['data'];
    },
    ...options,
  });
};
