import { ICompanyList } from '@lookup/classes/response';

export interface ILookupHolidayList {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  description?: string;
  date?: string;
}