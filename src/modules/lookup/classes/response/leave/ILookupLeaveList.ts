import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface ILookupLeaveList {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  categoryType: string;
  category?: ICommonSystem;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
}