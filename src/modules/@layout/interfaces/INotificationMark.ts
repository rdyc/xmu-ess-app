import { ModuleDefinitionType, NotificationType } from '@layout/types';

export interface INotificationMark {
  moduleUid: ModuleDefinitionType;
  detailType: NotificationType;
  itemUid: string | string[];
}