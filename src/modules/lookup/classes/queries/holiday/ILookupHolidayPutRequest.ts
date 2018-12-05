import { IBaseCommand } from '@generic/interfaces';
import { ILookupHolidayPutPayload } from '@lookup/classes/request';

export interface ILookupHolidayPutRequest extends IBaseCommand<ILookupHolidayPutPayload> {
  companyUid: string;
  holidayUid: string;
}