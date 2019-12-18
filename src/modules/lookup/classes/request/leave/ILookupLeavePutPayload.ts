import { IBasePayload } from '@generic/interfaces';
import { ILeaveItems } from './ILeaveItems';

export interface ILookupLeavePutPayload extends IBasePayload {
  categoryType: string;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
  items: ILeaveItems[];
}