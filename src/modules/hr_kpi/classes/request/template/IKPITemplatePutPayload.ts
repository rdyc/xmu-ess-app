import { IKPITemplatePostItemPayload } from './IKPITemplatePostItemPayload';

export interface IKPITemplatePutPayload {
  companyUid: string;
  positionUid: string;
  items: IKPITemplatePostItemPayload[];
}