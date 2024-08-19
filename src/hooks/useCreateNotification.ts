import { CreateNotificationSchema } from '@/schema/create-notification.schema';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export const createNotificationApi = async (
  payload: CreateNotificationSchema
) => {
  return await fetch('/api/notifications', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const useCreateNotification = (
  options?: UseMutationOptions<any, CreateNotificationSchema, any>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateNotificationSchema) => {
      const response = await createNotificationApi(payload);

      if (!response.ok) {
        const result = await response.json();
        toast.error(JSON.stringify(result.error));
        throw new Error('Something went wrong!');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Notification created!');
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
    onError: () => {
      toast.error('Something went wrong!');
    },
    ...options,
  });
};
