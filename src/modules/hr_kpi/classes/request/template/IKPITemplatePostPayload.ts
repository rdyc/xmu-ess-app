import { IKPITemplatePostItemPayload } from './IKPITemplatePostItemPayload';

export interface IKPITemplatePostPayload {
  companyUid: string;
  positionUid: string;
  name: string;
  note?: string;
  items: IKPITemplatePostItemPayload[];
}