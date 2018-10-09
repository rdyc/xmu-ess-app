import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';

export interface IPosition {
  uid:                string;
  companyUid:         string;
  company:            ILookupCompany;
  name:               string;
  description?:       string | null;
  isAllowMultiple:    boolean;
  inactiveDate:       string | null;
  isExpired:          boolean;
  changes:            IBaseChanges | null;
}