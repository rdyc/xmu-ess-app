export interface ISettingPutPayload {
  companyUid: string;
  templateUid: string;
  class: string;
  to: string[];
  cc: string[];
  subject: string;
}