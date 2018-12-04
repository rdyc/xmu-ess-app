import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';
import { ICurrencyList } from '../currency/ICurrencyList';

export interface IDiem {
  uid: string; 
  companyUid: string;
  company: ICompanyList | null;
  currencyUid: string;
  currency: ICurrencyList | null;   
  projectType: string;
  project: ICommonSystem | null;
  destinationType: string;
  destination?: ICommonSystem | null;
  value: number;
  changes: IBaseChanges | null;
}