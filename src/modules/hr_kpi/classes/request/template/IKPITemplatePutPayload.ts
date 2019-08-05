import { IKPITemplatePostItemPayload } from './IKPITemplatePostItemPayload';

export interface IKPITemplatePutPayload {
  companyUid: string;
  positionUid: string;
  name: string;
  items: IKPITemplatePostItemPayload[];
}