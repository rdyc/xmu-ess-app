import { ICompanyList } from '@lookup/classes/response';

export interface ICustomerList {
  uid: string;
  companyUid: string;
  company?: ICompanyList;
  name: string;
  npwp?: string;
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  contactPerson?: string;
  contactPersonAdditional?: string;
  contactTitle?: string;
  contactTitleAdditional?: string;
}
