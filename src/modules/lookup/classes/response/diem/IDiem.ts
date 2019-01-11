import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';
import { ICurrencyList } from '../currency/ICurrencyList';

export interface IDiem {
  uid: string; 
  companyUid: string;
  company?: ICompanyList;
  currencyUid: string;
  currency?: ICurrencyList;   
  projectType: string;
  project?: ICommonSystem;
  destinationType: string;
  destination?: ICommonSystem;
  value: number;
  changes?: IBaseChanges;
}