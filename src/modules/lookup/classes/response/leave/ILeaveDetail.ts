import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ILeaveDetail {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  categoryType: string;
  category: ICommonSystem | null;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean | null;
  changes: IBaseChanges | null;
}