import { IBasePayload } from '@generic/interfaces';

export interface ILookupHolidayPostPayload extends IBasePayload {
  description: string;
  date: string;
}