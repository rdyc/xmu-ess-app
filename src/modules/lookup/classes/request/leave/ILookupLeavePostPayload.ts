import { IBasePayload } from '@generic/interfaces';

export interface ILookupLeavePostPayload extends IBasePayload {
  categoryType: string;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
}