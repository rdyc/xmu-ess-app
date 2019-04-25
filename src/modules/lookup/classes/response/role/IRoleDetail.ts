import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';
import { IRoleMenu } from './IRoleMenu';

export interface IRoleDetail {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  gradeType?: string;
  grade?: ICommonSystem;
  name: string;
  description?: string;
  menus?: IRoleMenu[];
  isActive: boolean;
  changes?: IBaseChanges;
}