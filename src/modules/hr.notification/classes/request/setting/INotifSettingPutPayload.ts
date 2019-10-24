export interface INotifSettingPutPayload {
  companyUid: string;
  templateUid: string;
  class: string;
  to: string[];
  cc: string[];
  subject: string;
}