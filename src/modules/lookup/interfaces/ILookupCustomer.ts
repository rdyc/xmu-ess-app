import { ILookupCompany } from '@lookup/interfaces';

export interface ILookupCustomer {
  uid:        string;
  companyUid: string | null;
  company:    ILookupCompany | null;
  name:       string;
  npwp:       string | null;
  address:    string | null;
  phone:      string | null;
  fax:        string | null;
  email:      string | null;
}