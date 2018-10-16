import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface IDiemList {
uid: string; 
companyUid: string | null;
company: ICompanyList | null;
currencyUid: string; 
currency: string;  // ICurrencyList | null;   
projectType: string | null;
project: ICommonSystem | null;
destinationType: string;
destination?: ICommonSystem | null;
value: number;
}