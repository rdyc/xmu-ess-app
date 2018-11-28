import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ILookupHoliday {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  description: string | null;
  date: string;
  changes: IBaseChanges | null;
}