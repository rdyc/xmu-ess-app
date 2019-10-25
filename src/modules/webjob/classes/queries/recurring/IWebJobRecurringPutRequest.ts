import { IBaseCommand } from '@generic/interfaces';
import { IWebJobRecurringPutPayload } from '@webjob/classes/request';

export interface IWebJobRecurringPutRequest extends IBaseCommand<IWebJobRecurringPutPayload> {
  recurringUid: string;
}