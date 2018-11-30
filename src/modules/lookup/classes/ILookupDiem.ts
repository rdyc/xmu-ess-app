import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from './ILookupCompany';
import { ICurrencyList } from './response';

export interface ILookupDiem {
uid: string; 
companyUid: string | null;
company: ILookupCompany | null ;
currencyUid: string; 
currency: ICurrencyList | null;  
projectType: string | null;
project: ICommonSystem | null;
destinationType: string;
destination?: ICommonSystem | null;
value: number;
}