import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface IRole {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  gradeType: string | null;
  grade: ICommonSystem | null;
  name: string;
  description: string | null;
  isActive: boolean;
  changes: IBaseChanges | null;
}