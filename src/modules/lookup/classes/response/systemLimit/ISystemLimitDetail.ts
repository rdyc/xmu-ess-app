import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ISystemLimitDetail {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  categoryType: string;
  category?: ICommonSystem;
  days: number;
  changes?: IBaseChanges;
}