import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/classes/response';

export interface ICustomer {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  name: string;
  npwp?: string;
  address?: string;
  addressAdditional?: string;
  phone?: string;
  phoneAdditional?: string;
  mobile?: string;
  mobileAdditional?: string;
  fax?: string;
  email?: string;
  contactPerson?: string;
  contactPersonAdditional?: string;
  contactTitle?: string;
  contactTitleAdditional?: string;
  isActive: boolean;
  changes?: IBaseChanges;
}