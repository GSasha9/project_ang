import { Injectable, signal } from '@angular/core';

import { NotificationType } from '../models/notification.model';

export type NotificationData = {
  text: string;
  type: NotificationType;
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notifications = signal<NotificationData[]>([]);

  show = (text: string, type: NotificationType = 'success', duration = 3000): void => {
    const newNotification: NotificationData = { text, type };
    this.notifications.set([...this.notifications(), newNotification]);

    setTimeout(() => {
      this.notifications.set(this.notifications().filter((n) => n !== newNotification));
    }, duration);
  };

  clear = (): void => {
    this.notifications.set([]);
  };
}
