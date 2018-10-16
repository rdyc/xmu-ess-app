import { ICommonSystem } from '@common/classes';

export interface ILookupLeave {
  uid: string;
  categoryType: string;
  category: ICommonSystem | null;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean | null;
}