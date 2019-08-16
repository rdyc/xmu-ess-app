import { IBaseChanges } from '@generic/interfaces';
import { ILookupCompany } from '@lookup/classes';

export interface ISetting {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  class: string;
  to: string[];
  cc: string[];
  subject: string;
  changes: IBaseChanges;
}