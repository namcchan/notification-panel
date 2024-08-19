export enum NotificationType {
  PlatformUpdate = 'PLATFORM_UPDATE',
  CommentTag = 'COMMENT_TAG',
  AccessGranted = 'ACCESS_GRANTED',
  JoinWorkspace = 'JOIN_WORKSPACE',
}

export const NotificationTypeName = {
  [NotificationType.PlatformUpdate]: 'Platform Update',
  [NotificationType.CommentTag]: 'Comment Tag',
  [NotificationType.AccessGranted]: 'Access Granted',
  [NotificationType.JoinWorkspace]: 'Join Workspace',
};

export const NotificationRedirect = {
  [NotificationType.PlatformUpdate]: '/',
  [NotificationType.CommentTag]: '/comments',
  [NotificationType.AccessGranted]: '/chats',
  [NotificationType.JoinWorkspace]: '/workspace',
};

export const NotificationColor = {
  [NotificationType.PlatformUpdate]: 'yellow',
  [NotificationType.CommentTag]: 'blue',
  [NotificationType.AccessGranted]: 'green',
  [NotificationType.JoinWorkspace]: 'red',
};

export const NotificationPlaceholder = {
  [NotificationType.PlatformUpdate]: '- see what’s new',
  [NotificationType.CommentTag]: 'tagged you in a comment',
  [NotificationType.AccessGranted]: 'shared a chat with you',
  [NotificationType.JoinWorkspace]: 'joined your workspace',
};
