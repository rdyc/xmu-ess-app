import { ICommonSystem } from '@common/classes';
import { ILookupCompany } from './ILookupCompany';

export interface ILookupDiem {
uid: string; 
companyUid: string | null;
company: ILookupCompany | null ;
currencyUid: string; 
currency: string;  // belum ada
projectType: string | null;
project: ICommonSystem | null;
destinationType: string;
destination?: ICommonSystem | null;
value: number;
}