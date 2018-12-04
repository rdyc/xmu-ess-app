import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ILookupLeave {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  categoryType: string;
  category: ICommonSystem | null;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
  changes: IBaseChanges | null;
}