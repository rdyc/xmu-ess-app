import { ModuleDefinition } from '@layout/helper/redirector';

import { INotificationDetail } from './INotificationDetail';

export interface INotification {
  name: string;
  moduleUid: ModuleDefinition;
  details: INotificationDetail[];
}