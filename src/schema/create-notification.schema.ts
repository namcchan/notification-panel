import { z } from 'zod';

export const createNotificationSchema = z.object({
  type: z.string().min(1, 'This field is required'),
  content: z.string().min(1, 'This field is required'),
});

export type CreateNotificationSchema = z.infer<typeof createNotificationSchema>;
