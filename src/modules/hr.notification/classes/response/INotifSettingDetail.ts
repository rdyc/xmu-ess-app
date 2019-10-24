import { IBaseChanges } from '@generic/interfaces';
import { INotifTemplate } from '@hr.notification/classes/response';
import { ILookupCompany } from '@lookup/classes';

export interface INotifSettingDetail {
  uid: string;
  companyUid: string;
  company?: ILookupCompany;
  class: string;
  to: string[];
  cc: string[];
  subject: string;
  templateUid: string;
  template: INotifTemplate;
  changes: IBaseChanges;
}