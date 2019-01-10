import { NotificationType } from '@layout/helper/redirector';

import { INotificationDetailItem } from './INotificationDetailItem';

export interface INotificationDetail {
  type: NotificationType;
  items: INotificationDetailItem[];
  total: number;
}