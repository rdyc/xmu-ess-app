import { IBasePayload } from '@generic/interfaces';

export interface ILookupLeavePutPayload extends IBasePayload {
  categoryType: string;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
}