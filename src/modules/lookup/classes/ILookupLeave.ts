import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from '@lookup/classes';

export interface ILookupLeave {
  uid: string;
  companyUid: string;
  company:    ILookupCompany | null;
  categoryType: string;
  category: ICommonSystem | null;
  year: number;
  name: string;
  allocation: number;
  isWithinHoliday: boolean | null;
}