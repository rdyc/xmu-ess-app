import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';

export interface IPositionDetail {
  uid:                string;
  companyUid:         string;
  company?:            ILookupCompany;
  name:               string;
  description?:       string;
  isAllowMultiple:    boolean;
  inactiveDate?:      string;
  isExpired:          boolean;
  changes?:            IBaseChanges;
}