import { ICompanyList } from '@lookup/classes/response';

export interface ILookupHolidayList {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  description: string | null;
  date: string | null;
}