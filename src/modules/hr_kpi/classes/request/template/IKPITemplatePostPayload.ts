import { IKPITemplatePostItemPayload } from './IKPITemplatePostItemPayload';

export interface IKPITemplatePostPayload {
  companyUid: string;
  positionUid: string;
  items: IKPITemplatePostItemPayload[];
}