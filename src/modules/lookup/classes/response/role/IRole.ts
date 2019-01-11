import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface IRole {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  gradeType: string;
  grade?: ICommonSystem;
  name: string;
  description?: string;
  isActive: boolean;
  changes?: IBaseChanges;
}