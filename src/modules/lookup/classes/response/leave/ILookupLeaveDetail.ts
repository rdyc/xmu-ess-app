import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ILookupLeaveDetail {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  categoryType: string;
  category?: ICommonSystem;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
  changes?: IBaseChanges;
}