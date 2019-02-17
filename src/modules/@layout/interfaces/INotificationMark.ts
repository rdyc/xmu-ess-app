import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';

export interface INotificationMark {
  moduleUid: ModuleDefinition;
  detailType: NotificationType;
  itemUid: string | string[];
}