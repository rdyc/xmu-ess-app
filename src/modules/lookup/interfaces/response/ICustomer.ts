import { IBaseChanges } from '@generic/interfaces';
import { ICompanyList } from '@lookup/interfaces/response';

export interface ICustomer {
  uid: string;
  companyUid: string;
  company: ICompanyList | null;
  name: string;
  npwp: string | null;
  address: string | null;
  addressAdditional: string | null;
  phone: string | null;
  phoneAdditional: string | null;
  mobile: string | null;
  mobileAdditional: string | null;
  fax: string | null;
  email: string | null;
  contactPerson: string | null;
  contactPersonAdditional: string | null;
  contactTitle: string | null;
  contactTitleAdditional: string | null;
  isActive: boolean;
  changes: IBaseChanges | null;
}