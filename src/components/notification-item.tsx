import {
  NotificationPlaceholder,
  NotificationType,
  NotificationTypeName,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Notification } from '@prisma/client';
import dayjs from 'dayjs';
import { RocketIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export const NotificationItem = ({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: (notification: Notification) => Promise<void>;
}) => {
  const isPlatformUpdate =
    notification.type === NotificationType.PlatformUpdate;

  const leadingIcon = useMemo(() => {
    if (isPlatformUpdate) {
      return (
        <div className="bg-slate-100 h-10 w-10 rounded-full grid place-items-center">
          <RocketIcon className="w-5 aspect-square text-sky-600" />
        </div>
      );
    }

    return (
      <Avatar>
        <AvatarImage src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/mock/assets/images/avatar/avatar-2.webp" />
        <AvatarFallback>PN</AvatarFallback>
      </Avatar>
    );
  }, [isPlatformUpdate]);

  const title = () => {
    return (
      <div className="text-sm flex gap-1">
        <span className="font-bold">
          {isPlatformUpdate ? 'New features' : notification.content}
        </span>
        <span className="text-muted-foreground">
          {
            NotificationPlaceholder[
              notification.type as keyof typeof NotificationPlaceholder
            ]
          }
        </span>
      </div>
    );
  };

  const tagColor = () => {
    switch (notification.type) {
      case NotificationType.PlatformUpdate:
        return 'text-yellow-500 border-yellow-300';
      case NotificationType.CommentTag:
        return 'text-blue-500 border-blue-300';
      case NotificationType.AccessGranted:
        return 'text-green-500 border-green-300';
      case NotificationType.JoinWorkspace:
        return 'text-red-500 border-red-300';
    }
  };

  const tagName = () => {
    return NotificationTypeName[
      notification.type as keyof typeof NotificationTypeName
    ];
  };

  return (
    <div
      onClick={() => onClick(notification)}
      key={notification.id}
      className="flex gap-3 items-center p-4 hover:bg-neutral-100 rounded-lg relative"
    >
      {!notification.isRead && (
        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></div>
      )}
      {leadingIcon}
      <div className="grid gap-1">
        {title()}
        <div className="text-xs">
          <span className="text-muted-foreground">
            {dayjs(notification.createdAt).fromNow()}
          </span>{' '}
          -{' '}
          <Badge variant="outline" className={cn('text-[12px]', tagColor())}>
            {tagName()}
          </Badge>
        </div>
      </div>
    </div>
  );
};
