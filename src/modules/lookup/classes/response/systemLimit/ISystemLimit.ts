import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ISystemLimit {
  uid: string;
  companyUid: string;
  company: ICompanyList;
  categoryType:  string;
  category: ICommonSystem | null;
  days: number;
  changes: IBaseChanges | null;
}