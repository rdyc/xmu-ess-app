import { ModuleDefinitionType } from '@layout/types';

import { INotificationDetail } from './INotificationDetail';

export interface INotification {
  name: string;
  moduleUid: ModuleDefinitionType;
  details: INotificationDetail[];
}