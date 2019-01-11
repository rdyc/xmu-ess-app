import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface IDiemList {
  uid: string; 
  companyUid: string;
  company?: ICompanyList;
  currencyUid: string; 
  currency?: string;  // ICurrencyList;   
  projectType: string;
  project?: ICommonSystem;
  destinationType: string;
  destination?: ICommonSystem;
  value: number;
}