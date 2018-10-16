import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from '@lookup/classes/';

export interface ILookupSystemLimit {
  uid: string;
  companyUid: string;
  company: ILookupCompany | null;
  categoryType: string;
  category: ICommonSystem | null;
  days: number;
}