'use client';

import { Notification } from '@prisma/client';
import { useNotificationQuery } from '@/hooks/useNotificationQuery';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BellIcon, CheckCheckIcon } from 'lucide-react';
import { NotificationItem } from './notification-item';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useReadNotification } from '@/hooks/useReadNotification';
import { NotificationRedirect, NotificationType } from '@/lib/constants';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useReadAllNotification } from '@/hooks/useReadAllNotification';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

dayjs.extend(relativeTime);

export const NotificationSheet = () => {
  const { data } = useNotificationQuery();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const readNotification = useReadNotification();
  const readAllNotification = useReadAllNotification();

  const totalUnread = data?.filter(
    (notification) => !notification.isRead
  ).length;
  console.log('🚀 ~ NotificationSheet ~ totalUnread:', totalUnread);

  const onNotificationClick = async (notification: Notification) => {
    try {
      await readNotification.mutateAsync({ id: notification.id });
      if (notification.type === NotificationType.PlatformUpdate) {
        alert(notification.content);
        return;
      }
      router.push(
        NotificationRedirect[
          notification.type as keyof typeof NotificationRedirect
        ]
      );
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full relative">
          {!!totalUnread && (
            <Badge
              className="absolute -top-1 -right-1 p-0 px-1"
              variant="destructive"
            >
              {totalUnread}
            </Badge>
          )}

          <BellIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-4 pb-4 border-b border-dashed border-neutral-100">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => readAllNotification.mutateAsync()}
                    className="rounded-full w-8 h-8"
                    variant="ghost"
                    size="icon"
                  >
                    <CheckCheckIcon className=" w-5 h-5 text-emerald-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mark all as read</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[89vh]">
          <div className="grid pb-4 divide-y divide-neutral-100 divide-dashed divide cursor-pointer">
            {data?.map((notification) => (
              <NotificationItem
                notification={notification}
                key={notification.id}
                onClick={onNotificationClick}
              />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
