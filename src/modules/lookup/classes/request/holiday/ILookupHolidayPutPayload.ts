import { IBasePayload } from '@generic/interfaces';

export interface ILookupHolidayPutPayload extends IBasePayload {
  description: string;
  date: string;
}