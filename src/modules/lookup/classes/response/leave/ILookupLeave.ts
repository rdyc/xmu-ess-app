import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';
import { ILeaveItem } from './ILeaveItem';

export interface ILookupLeave {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  categoryType: string;
  category?: ICommonSystem;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
  changes?: IBaseChanges;
  dates: ILeaveItem[];
}