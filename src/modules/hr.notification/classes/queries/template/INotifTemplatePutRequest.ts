import { IBaseCommand } from '@generic/interfaces';
import { INotifTemplatePutPayload } from '@hr.notification/classes/request/template';

export interface INotifTemplatePutRequest extends IBaseCommand<INotifTemplatePutPayload> {
  templateUid: string;
}