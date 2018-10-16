import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface IHoliday {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  description: string | null;
  date: string | null;
  changes: IBaseChanges | null;
}