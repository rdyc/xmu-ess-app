import { IBaseCommand } from '@generic/interfaces';
import { ILookupHolidayPostPayload } from '@lookup/classes/request';

export interface ILookupHolidayPostRequest extends IBaseCommand<ILookupHolidayPostPayload> {
  companyUid: string;
}