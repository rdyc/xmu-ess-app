import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface ISystemLimitList {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  categoryType: string;
  category?: ICommonSystem;
  days: number;
}