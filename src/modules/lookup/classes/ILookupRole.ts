import { ICommonSystem } from '@common/classes';
import { ICompanyList } from '@lookup/classes/response';

export interface ILookupRole {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  gradeType?: string;
  grade?: ICommonSystem;
  name: string;
  description?: string;
}