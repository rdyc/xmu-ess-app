import { ILookupCompany } from '@lookup/classes';

export interface IPositionList {
  uid:                string;
  companyUid:         string;
  company:            ILookupCompany;
  name:               string;
  description?:       string | null;
  isAllowMultiple:    boolean;
  inactiveDate:       string | null;
  isExpired:          boolean;
}