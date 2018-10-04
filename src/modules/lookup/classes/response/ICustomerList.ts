import { ICompanyList } from '@lookup/classes/response';

export interface ICustomerList {
  uid: string;
  companyUid: string | null;
  company: ICompanyList | null;
  name: string;
  npwp: string | null;
  address: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  contactPerson: string | null;
  contactPersonAdditional: string | null;
  contactTitle: string | null;
  contactTitleAdditional: string | null;
}
