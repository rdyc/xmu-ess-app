import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ILookupHoliday {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  description?: string;
  date: string;
  changes?: IBaseChanges;
}