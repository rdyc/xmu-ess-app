import { IBaseChanges } from '@generic/interfaces';
import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface ISystemLimit {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  categoryType:  string;
  category: ICommonSystem | null;
  days: number;
  changes: IBaseChanges | null;
}