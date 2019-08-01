import { ICompanyList } from './response';

export interface ILookupPosition {
    uid: string;
    name: string;
    description?: string;
    inactiveDate?: string;
    isExpired: boolean;
    companyUid: string;
    company: ICompanyList;
}