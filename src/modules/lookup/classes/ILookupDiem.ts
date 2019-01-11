import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from './ILookupCompany';
import { ICurrencyList } from './response';

export interface ILookupDiem {
  uid: string; 
  companyUid: string;
  company?: ILookupCompany ;
  currencyUid: string; 
  currency?: ICurrencyList;  
  projectType: string;
  project?: ICommonSystem;
  destinationType: string;
  destination?: ICommonSystem;
  value: number;
}