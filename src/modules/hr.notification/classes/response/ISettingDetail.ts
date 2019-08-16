import { IBaseChanges } from '@generic/interfaces';
import { ITemplate } from '@hr.notification/classes/response';
import { ILookupCompany } from '@lookup/classes';

export interface ISettingDetail {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  class: string;
  to: string[];
  cc: string[];
  subject: string;
  templateUid: string;
  template: ITemplate;
  changes: IBaseChanges;
}