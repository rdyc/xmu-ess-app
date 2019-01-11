import { ILookupCompany } from '@lookup/classes';

export interface ILookupCustomer {
  uid:        string;
  companyUid: string;
  company?:    ILookupCompany;
  name:       string;
  npwp?:       string;
  address?:    string;
  phone?:      string;
  fax?:        string;
  email?:      string;
}