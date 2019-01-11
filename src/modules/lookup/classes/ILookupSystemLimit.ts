import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from '@lookup/classes/';

export interface ILookupSystemLimit {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  categoryType: string;
  category?: ICommonSystem;
  days: number;
}