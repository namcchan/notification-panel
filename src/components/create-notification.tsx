'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import {
  createNotificationSchema,
  CreateNotificationSchema,
} from '@/schema/create-notification.schema';
import { NotificationType, NotificationTypeName } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { useCreateNotification } from '@/hooks/useCreateNotification';

export const CreateNotification = () => {
  const [open, setOpen] = useState(false);

  const createNotification = useCreateNotification();

  const form = useForm<CreateNotificationSchema>({
    defaultValues: {
      type: '',
      content: '',
    },
    resolver: zodResolver(createNotificationSchema),
    mode: 'onSubmit',
  });

  const type = form.watch('type');

  const handleSubmit = async (payload: CreateNotificationSchema) => {
    try {
      await createNotification.mutateAsync(payload);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Notification</Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>New Notification</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <Separator />
            <div className="grid gap-4 my-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Notification type{' '}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(NotificationType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {NotificationTypeName[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {type === NotificationType.PlatformUpdate
                        ? 'Release number'
                        : 'Person name'}{' '}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter content..." />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
