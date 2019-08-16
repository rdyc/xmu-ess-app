import { IBaseCommand } from '@generic/interfaces';
import { IPeriodPutPayload } from '@hr.notification/classes/request/period';

export interface IPeriodPutRequest extends IBaseCommand<IPeriodPutPayload> {
  periodUid: string;
}