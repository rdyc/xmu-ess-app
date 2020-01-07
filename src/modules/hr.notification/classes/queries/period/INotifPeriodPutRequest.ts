import { IBaseCommand } from '@generic/interfaces';
import { INotifPeriodPutPayload } from '@hr.notification/classes/request/period';

export interface INotifPeriodPutRequest extends IBaseCommand<INotifPeriodPutPayload> {
  periodUid: string;
}