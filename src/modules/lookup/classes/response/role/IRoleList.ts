import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface IRoleList {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  gradeType: string | null;
  grade: ICommonSystem | null;
  name: string;
  description: string | null;
}